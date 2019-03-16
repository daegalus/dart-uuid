import 'dart:typed_data';
import 'package:test/test.dart';
import 'package:uuid_enhanced/uuid.dart';
import 'package:uuid_enhanced/uuid_util.dart';

void main() {
  const int TIME = 1321644961388;

  group('[Version 1 Tests]', () {
    test('IDs created at same mSec are different', () {
      final Uuid uuid1 = Uuid.fromTime(mSecs: TIME);
      final Uuid uuid2 = Uuid.fromTime(mSecs: TIME);
      expect(uuid1, isNot(equals(uuid2)));
      expect(uuid1.toString(), isNot(equals(uuid2.toString())));
    });

    test('Exception thrown when > 10K ids created in 1 ms', () {
      bool thrown = false;
      try {
        Uuid.fromTime(mSecs: TIME, nSecs: 10000);
      } catch (e) {
        thrown = true;
      }
      expect(thrown, equals(true));
    });

    test('Clock regression by msec increments the clockseq - mSec', () {
      // @todo can be const
      final Uuid uidt = Uuid.fromTime(mSecs: TIME);
      final Uuid uidtb = Uuid.fromTime(mSecs: TIME - 1);

      expect(uidtb.clockSequence - uidt.clockSequence,
          anyOf(equals(1), equals(-16383)));
    });

    test('Clock regression by msec increments the clockseq - nSec', () {
      final Uuid uidt = Uuid.fromTime(mSecs: TIME, nSecs: 10);
      final Uuid uidtb = Uuid.fromTime(mSecs: TIME, nSecs: 9);

      expect(uidtb.clockSequence - uidt.clockSequence, equals(1));
    });

    test('Explicit options produce expected id', () {
      final Uuid id = Uuid.fromTime(
        mSecs: 1321651533573,
        nSecs: 5432,
        node: Uint8List.fromList(<int>[0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10]),
        clockSequence: 0x385c,
      );

      expect(id, Uuid.fromString('d9428888-f500-11e0-b85c-61cd3cbb3210'));
    });

    test('Ids spanning 1ms boundary are 100ns apart', () {
      final Uuid u0 = Uuid.fromTime(mSecs: TIME, nSecs: 9999);
      final Uuid u1 = Uuid.fromTime(mSecs: TIME + 1, nSecs: 0);
      final int dt = u1.millisecondsSinceEpoch - u0.millisecondsSinceEpoch;
      expect(dt, equals(1));
    });
  });

  group('[Version 4 Tests]', () {
    test('Check if V4 is consistent using a static seed', () {
      final Uuid u0 = Uuid.randomUuid(random: UuidUtil.mathRNG(seed: 1));
      final Uuid u1 = Uuid.fromString('09a91894-e93f-4141-a3ec-82eb32f2a3ef');
      expect(u0, equals(u1));
    });

    test('Return same output as entered for "random" option', () {
      final Uuid u0 = Uuid.randomUuid(
          random: Uint8List.fromList(<int>[
        0x10,
        0x91,
        0x56,
        0xbe,
        0xc4,
        0xfb,
        0xc1,
        0xea,
        0x71,
        0xb4,
        0xef,
        0xe1,
        0x67,
        0x1c,
        0x58,
        0x36
      ]));
      final Uuid u1 = Uuid.fromString('109156be-c4fb-41ea-b1b4-efe1671c5836');
      expect(u0, equals(u1));
    });

    test(
        "Make sure that really fast Uuid.randomUuid doesn't produce duplicates",
        () {
      final List<Uuid> list =
          List<Uuid>.filled(10000, null).map((_) => Uuid.randomUuid()).toList();
      final Set<Uuid> setList = list.toSet();
      expect(list.length, equals(setList.length));
    });
  });

  group('[Version 5 Tests]', () {
    test('Using URL namespace and custom name', () {
      final Uuid u0 =
          Uuid.fromName('www.google.com', namespace: Uuid.NAMESPACE_URL);
      final Uuid u1 =
          Uuid.fromName('www.google.com', namespace: Uuid.NAMESPACE_URL);

      expect(u0, equals(u1));
    });

    test('Using Random namespace and custom name', () {
      final Uuid u0 = Uuid.fromName('www.google.com');
      final Uuid u1 = Uuid.fromName('www.google.com');

      expect(u0, isNot(equals(u1)));
    });

    test('do not use randomNamespace', () {
      final Uuid u0 = Uuid.fromName('www.google.com', randomNamespace: false);
      final Uuid u1 = Uuid.fromName('www.google.com', randomNamespace: false);
      expect(u0, equals(u1));
    });
  });

  group('[Parse/Unparse Tests]', () {
    test('Parsing a short/cut-off UUID', () {
      const String id = '00112233445566778899aabbccddeeff';
      expect(Uuid.fromString(id.substring(0, 10)).toString(),
          equals('00112233-4400-0000-0000-000000000000'));
    });

    test('Parsing a dirty string with a UUID in it', () {
      const String id = '00112233445566778899aabbccddeeff';
      expect(Uuid.fromString('(this is the Uuid -> $id$id').toString(),
          equals('00112233-4455-6677-8899-aabbccddeeff'));
    });

    test('2 uuid with same values should be equal', () {
      const String uuid = '00112233445566778899aabbccddeeff';
      final Uuid u0 = Uuid.fromString(uuid);
      final Uuid u1 = Uuid.fromString(uuid);
      final List<Uuid> uuidList = <Uuid>[u0, u1];
      final Set<Uuid> uuidSet = uuidList.toSet();
      expect(u0 == u1, true);
      expect(uuidSet, hasLength(1));
      expect(u0.hashCode, equals(u1.hashCode));
    });
  });
}
