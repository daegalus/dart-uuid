import 'dart:typed_data';

import 'package:uuid/data.dart';

import 'v7.dart';

/// A persisted generator checkpoint: the `(millisec, counter)` carried by the
/// last-generated UUIDv7.
typedef UuidV7Checkpoint = ({int millisec, int counter});

/// Pluggable cross-restart state hook (RFC 9562 §6.3).
///
/// [UuidV7Monotonic] is monotonic within an instance. [load] runs at
/// construction and [save] runs with each new UUID generation, so the
/// [UuidV7Checkpoint] carries forward to a new generator built afterward with
/// the same [UuidV7State] instance.
///
/// Since [load] runs *only* at construction, a running generator never reads
/// state back. As a result: (1) no implementation of this hook can share state
/// among concurrently running generators; and (2) implementations MAY batch or
/// debounce writes, since an un-flushed write cannot regress monotonicity.
///
/// The default [InMemoryUuidV7State] keeps state in memory only. Persisting and
/// restoring the [UuidV7Checkpoint] across isolates or restarts is left to the
/// consumer. Extend with a durable persistence implementation that suits your
/// application if that would address a problem you have.
abstract class UuidV7State {
  /// Last persisted checkpoint, or null on first run.
  UuidV7Checkpoint? load();

  /// Record the checkpoint from the most recently generated UUIDv7.
  void save(int millisec, int counter);
}

/// In-memory [UuidV7State]: no system I/O and no state beyond this object's
/// lifetime (ends with the process and does not span isolates).
class InMemoryUuidV7State implements UuidV7State {
  UuidV7Checkpoint? _state;

  @override
  UuidV7Checkpoint? load() => _state;

  @override
  void save(int millisec, int counter) =>
      _state = (millisec: millisec, counter: counter);
}

/// Stateful, monotonic UUIDv7 generator (after RFC 9562 §6.2): a 16-bit
/// counter in the most-significant random bits (`rand_a` then `rand_b`) ahead
/// of a 58-bit random tail.
///
/// The counter increments on UUIDv7s generated in the same millisecond,
/// allowing UUIDs to increase in creation order. Unlike `Uuid().v7()`, which
/// fills everything after the millisecond timestamp with random, UUIDv7s from
/// this generator sort by creation order within a same-millisecond batch under,
/// for example, `ORDER BY id` (raw big-endian octet / canonical lowercase-hex
/// comparison).
///
/// The generator is not exported from `uuid.dart`; import this library.
///
/// ```dart
/// import 'package:uuid/v7monotonic.dart';
///
/// final generator = UuidV7Monotonic();
/// // sorts via the counter within the same millisecond
/// generator.generate(); // -> '019fcd85-9fb3-7488-a625-f7a830c2dcf7'
/// generator.generate(); // -> '019fcd85-9fb3-7488-a87c-0c31456d733b'
/// ```
///
/// Does not provide strict monotonicity *across* generators, which UUIDv7
/// cannot provide without shared generator state.
///
/// The embedded timestamp and counter reveal the creation time and order of a
/// UUIDv7 by design (RFC 9562 §8, Security Considerations). The counter
/// increments by exactly +1 between consecutive ids sharing a timestamp (RFC
/// 9562 §6.2 Method 1), so an observer holding one id knows both fields of the
/// next, leaving the 58-bit random tail as its only unpredictable part. Prefer
/// UUIDv4 if unguessability is vital for your use case.
///
/// UUIDs from one generator strictly increase in creation order as long as the
/// system clock does not move backward by more than 10 seconds. A backward move
/// larger than that (such as a manual clock change or a time sync on a device
/// with a very stale or dead clock) resets ordering to the new clock reading.
/// UUIDs stay unique across that reset.
///
/// A UUID's timestamp differs from the previously generated UUID's when the
/// clock has passed it, when the counter overflows within a millisecond, or
/// when the clock jumps backward by more than 10 seconds. Each such change (a
/// "tick") randomly seeds the counter's start. The top bit is an overflow
/// guard, so whatever the seed draw, a tick has at least 2^15 = 32,768
/// additional same-millisecond UUIDs before the counter rolls over. After that,
/// the generator borrows from the next millisecond to get a new tick. UUIDs
/// stay monotonic and unique at the cost of a timestamp that briefly leads the
/// wall clock.
///
/// The counter is per-instance, so running more isolates does not consume any
/// single counter faster. Regarding collision resistance across generator
/// instances, same-millisecond ids from two generators are separated by the
/// 15-bit counter seed plus the remaining 58-bit random tail.
///
/// https://www.rfc-editor.org/rfc/rfc9562.html
class UuidV7Monotonic {
  /// Counter step for a pin: a fixed +1, RFC 9562 §6.2 Method 1
  /// ("Fixed-Length Dedicated Counter Bits").
  static const int _pinStep = 1;

  /// Largest backward clock movement, in milliseconds, that is absorbed rather
  /// than obeyed.
  ///
  /// A backward step within the allowance (e.g. an NTP correction) is *pinned*:
  /// the generator keeps the last emitted timestamp and climbs the counter
  /// instead of minting an out-of-order id. A jump beyond it is *honored* by
  /// resetting to the clock, so the generator is not permanently stranded ahead
  /// of real time.
  static const int _rollbackAllowanceMs = 10000;

  /// Exclusive counter bound = `2^16`. The 16-bit counter spans `0 .. 65535`;
  /// reaching this value means the tick's counter must roll over.
  static const int _counterCeiling = 65536;

  final int Function() _nowMs;
  final UuidV7State _state;

  /// Source of the random bits. Null falls back to [V7State.random].
  final GlobalOptions? goptions;

  /// Last *emitted* timestamp. May run ahead of the wall clock after an
  /// overflow-borrow.
  int _lastMs;

  /// Last *accepted raw* `nowMs()` reading. The rollback allowance magnitude is
  /// measured against this, not [_lastMs], so benign borrow run-ahead (where
  /// `_lastMs > clock` legitimately) is not misread as a backward clock jump.
  /// Set to the last emitted timestamp from persisted state, when present, on
  /// load; see edge case caveat in the assignment at the end of the constructor
  /// body.
  int _lastObserved;

  int _counter;

  /// Build a stateful UUIDv7 generator that remains monotonic even within a
  /// single millisecond.
  ///
  /// [nowMs] supplies the clock (injectable for tests); defaults to
  /// `DateTime.timestamp().millisecondsSinceEpoch` (UTC).
  ///
  /// [goptions] supplies the random bits through [GlobalOptions.rng]. Defaults
  /// to [V7State.random].
  ///
  /// [state] is a cross-restart persistence hook (defaults to in-memory via
  /// [InMemoryUuidV7State]).
  UuidV7Monotonic({
    int Function()? nowMs,
    this.goptions,
    UuidV7State? state,
  })  : _nowMs = nowMs ?? (() => DateTime.timestamp().millisecondsSinceEpoch),
        _state = state ?? InMemoryUuidV7State(),
        _lastMs = -1,
        _lastObserved = -1,
        _counter = 0 {
    // Load persisted state once, after which in-memory fields are
    // authoritative.
    final seed = _state.load();
    if (seed != null) {
      _lastMs = seed.millisec;
      _counter = seed.counter;
    }
    // Seed _lastObserved from the (possibly restored) _lastMs. The checkpoint
    // persists only (millisec, counter), not the raw-clock history, so on a
    // restart we have no real observed reading and use the restored emitted
    // timestamp as a conservative proxy. The first post-restart mint then
    // measures backwards rollback against where the generator left off. A clock
    // reading earlier than that is pinned rather than honored (NB. up to
    // _rollbackAllowanceMs) to preserve generator monotonicity.
    //
    // Caveat (should be a rare edge case). _lastObserved is meant to track the
    // raw clock so that a borrow-ahead (where a same-ms counter overflow bumped
    // _lastMs past raw clock time) is not mistaken for the clock jumping
    // backwards. But the checkpoint persists no raw-clock history, so if the
    // generator was last running borrowed-ahead (_lastMs > the clock at save
    // time), the restored _lastMs carries that borrow-ahead and we seed
    // _lastObserved from it. For the first post-restart mint only, the rollback
    // magnitude is then measured against a borrowed (too-high) reference
    // instead of a true clock reading.
    //
    // Concretely: with _lastObserved seeded B ms ahead of real time (B for
    // borrow), a clock reading `now` is treated as a backward jump of
    // `(_lastObserved - now)`, inflated by B compared to the real jump
    // `(_lastObserved - now - B)`. At the threshold (_rollbackAllowanceMs), and
    // only at that threshold, a `now` whose true backward delta is just under
    // _rollbackAllowanceMs but whose inflated delta exceeds it gets reset to
    // `now` when it would otherwise have been pinned, with the consequence that
    // one id may sort out of order at the boundary. After the first mint,
    // _lastObserved is overwritten with a real raw clock reading and the
    // guarantee is restored. B is the borrow depth at save, and that is more
    // likely driven by a clock stall than by mint rate. (Could not exceed
    // 2,400 mints/ms when writing this implementation on a MacBook Pro M5.)
    // So the borrow depth is large only with a stuck clock. Eliminating it
    // entirely would require also persisting _lastObserved. Judge this not
    // worth the extra write for a boundary-only, self-correcting effect.
    //
    // On a start with no persisted state, this does nothing. (_lastMs is
    // still -1 and so is _lastObserved.)
    _lastObserved = _lastMs;
  }

  /// Generate the next monotonic UUIDv7 as a canonical lowercase-hex string.
  String generate() {
    // One RNG draw per mint. Passed to `UuidV7.generate` as randomBytes so we
    // own the whole post-timestamp tail. The draw is 16 bytes but a UUIDv7's
    // tail is only 10; the `v7` implementation copies only bytes 0-9
    // specifically of the passed randomBytes. Since the last 6 bytes never
    // reach the id, we spend two of them (10-11) as a 16-bit fresh-tick counter
    // seed. This keeps the seed independent of the random tail that does
    // survive. The current counter mark is then overlaid onto bytes 0-9 in
    // `_overlayCounter`.
    final rb = (goptions?.rng ?? V7State.random).generate();
    _advance(rb);
    // Delegate the 48-bit timestamp packing, version/variant stamping, and
    // formatting to UuidV7.
    return const UuidV7()
        .generate(options: V7Options(_lastMs, _overlayCounter(rb, _counter)));
  }

  /// Advance the clock and counter state for one mint, updating [_lastMs] and
  /// [_counter] and mirroring them to [_state]. A fresh tick seeds the counter
  /// from the spare tail of [rb] (random bytes 10–11; see [generate]).
  void _advance(Uint8List rb) {
    final now = _nowMs();
    // backwardMs is measured against _lastObserved (last real clock reading),
    // not _lastMs (the emitted timestamp), which a borrow can run ahead of the
    // clock. Compared against _rollbackAllowanceMs only when the clock is not
    // ahead of the last emitted timestamp _lastMs (i.e. the first branch
    // didn't fire).
    //
    // A worked run-ahead example: after a borrow, _lastMs = 1005,
    // _lastObserved = 1000, and the clock has since ticked to now = 1003:
    //
    //   now > _lastMs?   1003 > 1005 == false (already emitted 1005)
    //   backwardMs = (1000 - 1003) <= allowance,
    //   so pin and climb from emitted 1005
    //
    // The negative value just means the clock has passed its old reading but
    // not yet the emitted high-water mark.
    final backwardMs = _lastObserved - now;
    if (now > _lastMs) {
      // Wall clock at/ahead of the last emitted timestamp => new, later tick.
      _lastMs = now;
      _counter = _freshTick(rb);
    } else if (backwardMs <= _rollbackAllowanceMs) {
      // Three cases: (1) same ms, (2) NTP or other backwards jitter within
      // allowance, or (3) benign borrow run-ahead. All cases stay monotonic by
      // pinning to the emitted timestamp and climbing the counter by _pinStep.
      _counter += _pinStep;

      // On overflow, borrow the next millisecond, and restart the counter from
      // a fresh tick rather than a pin step. _lastMs may now lead the wall
      // clock; backwardMs is measured against _lastObserved, not _lastMs, so
      // any lead is not misread as a backward clock jump (see above).
      if (_counter >= _counterCeiling) {
        _lastMs += 1;
        _counter = _freshTick(rb);
      }
    } else {
      // Large backward jump (e.g. TZ-correlated re-sync) exceeding
      // _rollbackAllowanceMs. Honor it so we are not permanently stranded.
      // Reorder happens across the boundary, but this is a rare case; while the
      // reset replays already-used timestamps, uniqueness is preserved by the
      // random seed & tail.
      _lastMs = now;
      _counter = _freshTick(rb);
    }
    _lastObserved = now;
    _state.save(_lastMs, _counter);
  }

  /// Counter value for a fresh tick: a 15-bit random seed, with the 16-bit
  /// counter's top bit always 0 as an overflow guard. At least half the range
  /// therefore remains as burst headroom no matter where the seed lands.
  ///
  /// The seed is drawn from [rb]'s spare tail (bytes 10–11). The UUID never
  /// uses those bytes, keeping the seed independent of the random tail that
  /// does survive into the UUID.
  int _freshTick(Uint8List rb) {
    // Combine the two bytes into one 16-bit value. rb[10] goes first via
    // byte shift up into bits 8–15, which leaves bits 0–7 zeroed. The OR
    // drops rb[11] into that gap.
    final seed16 = (rb[10] << 8) | rb[11];

    // Mask off the high bit 15 (0x7FFF == 0111_1111_1111_1111) as the overflow
    // guard, so _counterCeiling is always at least 2^15 increments away.
    return seed16 & 0x7FFF;
  }

  /// Overlay the 16-bit [counter] onto [rb] in place and return it.
  /// [UuidV7.generate] copies [rb]'s first 10 bytes into uuid bytes 6–15, so
  /// `rb[i]` is uuid byte `6 + i`.
  ///
  /// The counter occupies, from MSB to LSB, the 12 bits of `rand_a` (uuid bits
  /// 52–63), then 4 bits of `rand_b` resuming at uuid bit 66 (skipping the
  /// variant at 64–65), where c0 is the least significant counter bit:
  ///
  /// ```text
  ///        rb[0]            rb[1]            rb[2]
  ///   uuid byte 6      uuid byte 7      uuid byte 8
  ///   ver | c15..c12   c11 ....... c4   var | c3..c0 | rand_b...
  ///   4     4          8                2     4        2
  /// ```
  ///
  /// The & masks below preserve every non-counter bit on [rb], including the
  /// random tail: `0xF0` keeps the version nibble and `0xC3` keeps the variant
  /// bits and the 2 random-tail bits at the end of byte 8. [UuidV7.generate]
  /// stamps version (byte 6 high nibble) and variant (byte 8 high 2 bits) after
  /// copying the bytes returned from this method.
  Uint8List _overlayCounter(Uint8List rb, int counter) {
    // uuid bits 52–55 take c15..c12. Shift the counter down 12 so its top
    // nibble sits in bits 3–0; `& 0x0F` is a no-op after shift given counter <
    // 2^16, kept to state the field width. `rb[0] & 0xF0` clears the low nibble
    // to write the counter while preserving the version nibble above it.
    rb[0] = (rb[0] & 0xF0) | ((counter >> 12) & 0x0F);

    // uuid bits 56–63 take c11..c4. Shift the counter down 4 to drop c3..c0,
    // leaving c15..c4; `& 0xFF` then trims c15..c12, which were written above.
    // (Storing into a Uint8List truncates to 8 bits anyway, but here too, mask
    // explicitly to state the field width.)
    rb[1] = (counter >> 4) & 0xFF;

    // uuid bits 66–69 take c3..c0, mid-byte. Byte 8 is `vv cccc tt`: variant,
    // counter nibble, random tail. Each operand fills one part and the OR
    // merges:
    //
    //   (counter & 0x0F) << 2   00 cccc 00   cap clears vv, shift clears tt
    //   rb[2] & 0xC3            vv 0000 tt   keeps variant & 2 random tail bits
    //                           -----------
    //                           vv cccc tt
    rb[2] = (rb[2] & 0xC3) | ((counter & 0x0F) << 2);
    return rb;
  }
}
