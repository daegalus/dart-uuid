import 'dart:typed_data';

import 'package:test/test.dart';
import 'package:uuid/data.dart';
import 'package:uuid/uuid.dart';
import 'package:uuid/v7monotonic.dart';
import 'package:uuid/rng.dart';
import 'package:uuid/v7.dart';

/// Package RNG configuration wired to a seeded RNG.
GlobalOptions _seeded(int seed) => GlobalOptions(MathRNG(seed: seed));

/// An [RNG] that returns the same byte in all 16 positions. Fully deterministic
/// test input with no dependence on any particular seed's output.
class _ConstRNG implements RNG {
  const _ConstRNG(this.byte);
  final int byte;
  @override
  Uint8List generate() => Uint8List(16)..fillRange(0, 16, byte);
}

/// RNG configuration whose RNG fills every random byte with [byte].
GlobalOptions _fixed(int byte) => GlobalOptions(_ConstRNG(byte));

/// A [UuidV7State] that restores a fixed checkpoint and discards saves, so a
/// generator under test can start at any arbitrary `(millisec, counter)`.
/// (NB. [UuidV7Monotonic] calls [load] once, at construction.)
class _PreloadedState implements UuidV7State {
  const _PreloadedState(this._checkpoint);
  final UuidV7Checkpoint _checkpoint;
  @override
  UuidV7Checkpoint? load() => _checkpoint;
  @override
  void save(int millisec, int counter) {}
}

/// UUIDv7 version nibble (canonical position: first char of the 3rd group).
int _version(String id) => int.parse(id[14], radix: 16);

/// Top nibble of the 4th group, whose high 2 bits carry the variant.
int _variantNibble(String id) => int.parse(id[19], radix: 16);

/// The 48-bit `unix_ts_ms` field, RFC 9562 §5.7: a big-endian unsigned count
/// of milliseconds since the Unix Epoch (canonical position: the 1st and 2nd
/// groups, 32 + 16 bits). This is the *emitted* timestamp, so it may run ahead
/// of the wall clock after an overflow-borrow.
int _timestampMs(String id) =>
    // end is exclusive, so the hyphen at index 8 is skipped
    int.parse(id.substring(0, 8) + id.substring(9, 13), radix: 16);

bool _strictlyIncreasing(List<String> ids) {
  for (var i = 1; i < ids.length; i++) {
    if (!(ids[i].compareTo(ids[i - 1]) > 0)) return false;
  }
  return true;
}

List<String> _mint(UuidV7Monotonic g, int n) =>
    List.generate(n, (_) => g.generate());

void main() {
  group('[Format Tests]', () {
    test('every id is a well-formed v7 with correct variant', () {
      final g = UuidV7Monotonic(goptions: _seeded(1));
      for (final id in _mint(g, 50)) {
        expect(
          Uuid.isValidUUIDFormat(fromString: id),
          isTrue,
          reason: '$id is not a canonical 8-4-4-4-12 hex layout',
        );
        expect(_version(id), 7, reason: 'version nibble must be 7');
        // variant 10xx => nibble in 0x8..0xb
        expect(_variantNibble(id), inInclusiveRange(0x8, 0xb));
      }
    });

    test('the 16-bit counter lands in rand_a and the top of rand_b', () {
      // A golden test for the byte overlay: where the counter bits go,
      // and that the bits around them survive.
      //
      // Restoring (1000, 0x5A59) against a clock frozen at 1000 makes the first
      // mint pin at counter 0x5A5A == 0101 1010 0101 1010. The alternating
      // nibbles mean that every counter bit differs from its neighbors, so
      // an off-by-one shift or a swapped mask moves a 0 where a 1 belongs and
      // shows up in the golden string.
      //
      //   uuid byte 6 = 0111 0101   version 7, then counter bits 15-12 (0101)
      //   uuid byte 7 = 1010 0101   counter bits 11-4
      //   uuid byte 8 = 10 1010 xx  variant 10, counter bits 3-0, 2 random
      //
      // Since rand_a takes the top 12 counter bits (5a5), the two trailing bits
      // of byte 8 are the only RNG-decided bits in the counter region. Run both
      // RNG polarities (all 0s, all 1s) to nail those down. Also show that
      // the untouched tail (uuid bytes 9-15) passes through whole.
      String firstPinnedId(int rngByte) => UuidV7Monotonic(
            nowMs: () => 1000,
            goptions: _fixed(rngByte),
            state: const _PreloadedState((millisec: 1000, counter: 0x5A59)),
          ).generate();

      // Timestamp 1000 == 0x3e8. With an all-zero tail, byte 8 is 1010 1000.
      expect(firstPinnedId(0x00), '00000000-03e8-75a5-a800-000000000000');
      // With an all-ones tail, byte 8 is 1010 1011, with the same counter bits,
      // and the version and variant stamps still land on top of RNG all-1s.
      expect(firstPinnedId(0xFF), '00000000-03e8-75a5-abff-ffffffffffff');
    });
  });

  group('[Ordering Tests]', () {
    test('same-ms burst sorts in mint order', () {
      final g = UuidV7Monotonic(
        nowMs: () => 1000, // frozen clock → forces the same-ms path
        goptions: _seeded(2),
      );
      final ids = _mint(g, 500);
      expect(_strictlyIncreasing(ids), isTrue);
      final sorted = [...ids]..sort();
      expect(sorted, equals(ids), reason: 'sorted order == mint order');
    });

    test('advancing clock keeps ids increasing', () {
      var t = 1000;
      final g = UuidV7Monotonic(nowMs: () => t++, goptions: _seeded(3));
      expect(_strictlyIncreasing(_mint(g, 200)), isTrue);
    });

    test('a fresh tick seeds the counter below the overflow guard bit', () {
      // The fresh-tick seed is 15 bits, leaving the 16-bit counter's top bit
      // clear as an overflow guard. With an all-0xFF RNG a 16-bit read
      // would be 0xFFFF, while the guard makes the seed exactly 0x7FFF. Read
      // the counter's top 12 bits (rand_a, the three hex digits after the
      // version nibble).
      final g = UuidV7Monotonic(nowMs: () => 1000, goptions: _fixed(0xFF));
      // No restored state, so the first mint takes the fresh-tick branch.
      final randA = int.parse(g.generate().substring(15, 18), radix: 16);
      expect(randA & 0x800, 0, reason: 'guard bit must be clear');
      expect(randA, 0x7FF, reason: 'the seed is exactly the 15 low bits');
    });
  });

  group('[Clock Regression Tests]', () {
    test('small backward step within allowance is pinned (monotonic)', () {
      // Clock jumps back 5ms after the first mint — within the 10s allowance.
      final clock = [1000, 995, 996, 997, 998];
      var i = 0;
      final g = UuidV7Monotonic(
        nowMs: () => clock[i < clock.length ? i++ : clock.length - 1],
        goptions: _seeded(4),
      );
      expect(_strictlyIncreasing(_mint(g, 5)), isTrue);
    });

    test('large backward jump beyond allowance is honored (not stranded)', () {
      // First mint at a high time, then the clock resets far back (> allowance).
      var t = 10000000;
      final g = UuidV7Monotonic(
        nowMs: () => t,
        goptions: _seeded(5),
      );
      final first = g.generate();
      t = 5000; // jump back well beyond the allowance
      final second = g.generate();
      // Honored: the new id reflects the lower clock (sorts before the first),
      // proving the generator reset rather than pinning to the old timestamp.
      expect(second.compareTo(first) < 0, isTrue);
    });

    test('the allowance is exactly 10s, inclusive', () {
      // The run-ahead test in [Overflow Tests] draws its clock reading from
      // this boundary. A change to the allowance would alter the validity
      // of its assertions. Pin the library-private constant value: a step back
      // of exactly 10000ms is inside the allowance and pins to the emitted
      // timestamp, while 10001ms is outside and is honored.
      int secondTimestampAfterStepBack(int backMs) {
        var t = 20000; // only has to exceed the step backs below
        final g = UuidV7Monotonic(nowMs: () => t, goptions: _seeded(6));
        g.generate();
        t = 20000 - backMs;
        return _timestampMs(g.generate());
      }

      expect(secondTimestampAfterStepBack(10000), 20000,
          reason: '10000ms back is within the allowance: clock pinned');
      expect(secondTimestampAfterStepBack(10001), 9999,
          reason: '10001ms back exceeds the allowance: clock honored');
    });
  });

  group('[Overflow Tests]', () {
    test('counter overflow borrows the ms and never throws', () {
      // Restore the generator two pins short of the 2^16 ceiling. The first
      // mint pins to 65535 and the second exhausts the counter. The all-0xFF
      // RNG reseeds that borrow at the highest guarded value, 0x7FFF, which is
      // the worst case for reaching a second overflow in this burst.
      //
      // The preload is written against the ceiling, so it also pins the counter
      // width: a wider counter would not overflow here at all, a narrower one
      // would have overflowed already, and either moves the borrow off index 1.
      const overflowAt = 1;
      final g = UuidV7Monotonic(
        nowMs: () => 1000, // frozen => only a borrow can keep ids increasing
        goptions: _fixed(0xFF),
        state: const _PreloadedState((millisec: 1000, counter: 65534)),
      );
      final ids = _mint(g, 10);
      expect(_strictlyIncreasing(ids), isTrue);
      expect(ids.every((id) => _version(id) == 7), isTrue);
      // The clock never moves, so the emitted timestamp must step exactly at
      // the overflow. A generator that borrowed on every pin would also stay
      // ordered and stamp a valid version, but would leave the last id at 1010
      // (1000 start + 10 mints).
      expect(_timestampMs(ids[overflowAt - 1]), 1000);
      expect(_timestampMs(ids[overflowAt]), 1001, reason: 'borrowed one ms');
      expect(_timestampMs(ids.last), 1001, reason: 'borrowed exactly once');
    });

    test('borrow run-ahead is not misclassified as a backward jump', () {
      // An overflow borrow pushes the emitted timestamp 1ms past the clock.
      // Every mint after it must still pin, because the rollback magnitude is
      // read against _lastObserved (the last raw clock reading) rather than
      // _lastMs (which borrowed).
      //
      // Those two references differ by exactly the borrow depth, so they only
      // disagree about a clock reading whose distance from _lastObserved falls
      // within the depth of the generator's fixed 10s rollback allowance, that
      // is, in (10000 - depth, 10000] ms. Given a 1ms borrow that is a single
      // reading, 10000ms below the last observed one. Reading 10000 against
      // _lastObserved = 20000 gives 10000, inside the allowance, so the correct
      // implementation pins; incorrectly reading it against _lastMs = 20001
      // would give 10001, outside the allowance.
      //
      // The discrimination assumption only holds while the allowance is 10s;
      // see test 'the allowance is exactly 10s, inclusive'.
      //
      // An incorrect implementation honors the jump and emits at 10000, sorting
      // before the already-emitted 20001. Away from that boundary both take the
      // same branch: a nearer reading pins under either measurement, while a
      // further one is honored under either.
      //
      // Start the generator two pins short of the 2^16 ceiling. The first mint
      // pins to 65535 and the second exhausts the counter, borrowing from 20000
      // to 20001 ms. The all-0xFF RNG puts that reseed at the highest guarded
      // value, 0x7FFF: the guard bit caps the seed there, so even in this worst
      // case the ceiling is 32769 pins away. A second 1ms borrow (which would
      // move the emitted timestamp for reasons unrelated to the branch under
      // test) is therefore far out of reach across the 8 mints that follow. The
      // clock drops backward to the discriminating reading of 10000 from the
      // third mint on.
      var mints = 0;
      final g = UuidV7Monotonic(
        nowMs: () => mints++ < 2 ? 20000 : 10000,
        goptions: _fixed(0xFF),
        state: const _PreloadedState((millisec: 20000, counter: 65534)),
      );
      final ids = _mint(g, 10);
      expect(_strictlyIncreasing(ids), isTrue);
      // The borrow puts the generator in the run-ahead state, so assert it
      // happened where expected.
      expect(_timestampMs(ids[0]), 20000);
      expect(_timestampMs(ids[1]), 20001,
          reason: 'counter exhausted, borrowed');
      // Every mint after the borrow keeps the borrowed timestamp: shows the pin
      // branch was taken. The honor branch would reset to 10000.
      expect(_timestampMs(ids.last), 20001);
    });

    test('the guard bit guarantees 2^15 same-ms mints after a fresh tick', () {
      // The two tests above take the ceiling from a preloaded counter; this
      // one mints UUIDs up to it.
      //
      // The all-0xFF RNG seeds a fresh tick at the highest guarded value,
      // 0x7FFF (32767), the worst case for headroom. From there the 16-bit
      // counter has 65536 - 32767 = 32769 slots, the fresh-tick mint itself
      // plus 2^15 = 32768 pins. So indices 0..32768 all share the frozen
      // timestamp and index 32769 is the first to borrow.
      //
      // This fails if the counter width changes, if the pin step stops being
      // +1, or if the guard bit is dropped.
      final g = UuidV7Monotonic(nowMs: () => 1000, goptions: _fixed(0xFF));
      final ids = _mint(g, 32770);
      expect(_strictlyIncreasing(ids), isTrue);
      expect(_timestampMs(ids[32768]), 1000, reason: '2^15 pins still fit');
      expect(_timestampMs(ids[32769]), 1001, reason: 'the next one borrows');
    });
  });

  group('[Default RNG Tests]', () {
    // Every other test injects _seeded(n) or _fixed(n), which sets
    // goptions.rng, so the `goptions?.rng ?? V7State.random` fallback is never
    // taken. But a caller who passes no goptions at all runs exactly that
    // fallback. Exercise it with no injected RNG.
    test(
      'default construction (no injected RNG) mints valid, increasing ids',
      () {
        final g = UuidV7Monotonic(
          nowMs: () => 1000,
        ); // real V7State.random
        final ids = _mint(g, 50);
        expect(_strictlyIncreasing(ids), isTrue);
        expect(ids.every((id) => _version(id) == 7), isTrue);
      },
    );
  });

  group('[RandomBytes Contract Tests]', () {
    // The single-draw design seeds the fresh-tick counter from bytes 10–15 of
    // the 16-byte RNG draw, trusting that v7 consumes only randomBytes[0..9] (a
    // UUID's 10-byte tail). That keeps the seed disjoint from the random tail
    // that survives into the id. If another change ever widened the read, the
    // seed would correlate with the emitted tail, which would be a bug. Pin the
    // expected behavior so we'd find out.
    test('v7 reads only randomBytes[0..9]; bytes 10-15 never reach the id', () {
      const v7 = UuidV7();
      final base = List<int>.generate(
        16,
        (i) => i + 1,
      ); // ints from 1-16 -- distinct and nonzero
      final reference = v7.generate(options: V7Options(1000, base));
      // mutate random draw tail
      for (var i = 10; i < 16; i++) {
        final mutated = [...base]..[i] ^= 0xFF; // flip every bit of byte i
        // check assertion in every iteration
        expect(
          v7.generate(options: V7Options(1000, mutated)),
          equals(reference),
          reason:
              'mutating randomBytes[$i] changed the Uiidv7 -- mutation leaked '
              'into the tail, breaking the disjoint counter-seed assumption',
        );
      }
    });

    test('v7 does read randomBytes[0..9]', () {
      const v7 = UuidV7();
      final base = List<int>.generate(
        16,
        (i) => i + 1,
      ); // ints from 1-16 -- distinct and nonzero
      final reference = v7.generate(options: V7Options(1000, base));
      // randomBytes[1] is uuid byte 7: fully random, no version/variant stamp,
      // so flipping it must change the id (proves the differential test above
      // could actually observe a leak).
      final mutated = [...base]..[1] ^= 0xFF;
      expect(
        v7.generate(options: V7Options(1000, mutated)),
        isNot(equals(reference)),
      );
    });
  });

  group('[Cross-Restart State Tests]', () {
    test(
        'a new generator sharing state continues monotonically even with an '
        'earlier (within-allowance) clock', () {
      final state = InMemoryUuidV7State();
      final genA = UuidV7Monotonic(
        nowMs: () => 1000,
        goptions: _seeded(11),
        state: state,
      );
      final aIds = _mint(genA, 10);

      // "Restart": new generator, same persisted state, clock a few ms earlier.
      final genB = UuidV7Monotonic(
        nowMs: () => 996,
        goptions: _seeded(12),
        state: state, // loaded once in B's constructor
      );
      final firstB = genB.generate();
      expect(
        firstB.compareTo(aIds.last) > 0,
        isTrue,
        reason: 'B continues after A despite the earlier clock reading',
      );
    });
  });
}
