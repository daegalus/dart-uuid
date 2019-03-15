import 'dart:typed_data';
import 'package:test/test.dart';
import 'package:uuid_enhanced/uuid.dart';
import 'package:uuid_enhanced/uuid_util.dart';

void main() {
  final Uuid uuid = Uuid();
  const int TIME = 1321644961388;

  group('[Version 1 Tests]', () {
    test('IDs created at same mSec are different', () {
      final String uuid1 = uuid.v1(mSecs: TIME);
      final String uuid2 = uuid.v1(mSecs: TIME);
      expect(uuid1, isNot(equals(uuid2)));
    });

    test('Exception thrown when > 10K ids created in 1 ms', () {
      bool thrown = false;
      try {
        uuid.v1(mSecs: TIME, nSecs: 10000);
      } catch (e) {
        thrown = true;
      }
      expect(thrown, equals(true));
    });

    test('Clock regression by msec increments the clockseq - mSec', () {
      // @todo can be const
      final String uidt = uuid.v1(mSecs: TIME);
      final String uidtb = uuid.v1(mSecs: TIME - 1);

      expect(
          int.parse("0x${uidtb.split('-')[3]}") -
              int.parse("0x${uidt.split('-')[3]}"),
          anyOf(equals(1), equals(-16383)));
    });

    test('Clock regression by msec increments the clockseq - nSec', () {
      final String uidt = uuid.v1(mSecs: TIME, nSecs: 10);
      final String uidtb = uuid.v1(mSecs: TIME, nSecs: 9);

      expect(
          int.parse("0x${uidtb.split('-')[3]}") -
              int.parse("0x${uidt.split('-')[3]}"),
          equals(1));
    });

    test('Explicit options produce expected id', () {
      final String id = uuid.v1(
        mSecs: 1321651533573,
        nSecs: 5432,
        node: Uint8List.fromList(<int>[0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10]),
        clockSequence: 0x385c,
      );

      expect(id, equals('d9428888-f500-11e0-b85c-61cd3cbb3210'));
    });

    test('Ids spanning 1ms boundary are 100ns apart', () {
      final String u0 = uuid.v1(mSecs: TIME, nSecs: 9999);
      final String u1 = uuid.v1(mSecs: TIME + 1, nSecs: 0);

      final String before = u0.split('-')[0], after = u1.split('-')[0];
      final int dt = int.parse('0x$after') - int.parse('0x$before');

      expect(dt, equals(1));
    });
  });

  group('[Version 4 Tests]', () {
    test('Check if V4 is consistent using a static seed', () {
      final String u0 = uuid.v4(rng: UuidUtil.mathRNG(seed: 1));
      const String u1 = '09a91894-e93f-4141-a3ec-82eb32f2a3ef';
      expect(u0, equals(u1));
    });

    test('Return same output as entered for "random" option', () {
      final String u0 = uuid.v4(
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
      const String u1 = '109156be-c4fb-41ea-b1b4-efe1671c5836';
      expect(u0, equals(u1));
    });

    test('Make sure that really fast uuid.v4 doesn\'t produce duplicates', () {
      final List<String> list =
          List<String>.filled(1000, null).map((_) => uuid.v4()).toList();
      final Set<String> setList = list.toSet();
      expect(list.length, equals(setList.length));
    });
  });

  group('[Version 5 Tests]', () {
    test('Using URL namespace and custom name', () {
      final String u0 = uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com');
      final String u1 = uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com');

      expect(u0, equals(u1));
    });

    test('Using Random namespace and custom name', () {
      final String u0 = uuid.v5(null, 'www.google.com');
      final String u1 = uuid.v5(null, 'www.google.com');

      expect(u0, isNot(equals(u1)));
    });

    test('do not use randomNamespace', () {
      final String u0 = uuid.v5(null, 'www.google.com', randomNamespace: false);
      final String u1 = uuid.v5(null, 'www.google.com', randomNamespace: false);
      expect(u0, equals(u1));
    });
  });

  group('[Parse/Unparse Tests]', () {
    test('Parsing a short/cut-off UUID', () {
      const String id = '00112233445566778899aabbccddeeff';
      expect(uuid.unparse(uuid.parse(id.substring(0, 10))),
          equals('00112233-4400-0000-0000-000000000000'));
    });

    test('Parsing a dirty string with a UUID in it', () {
      const String id = '00112233445566778899aabbccddeeff';
      expect(uuid.unparse(uuid.parse('(this is the uuid -> $id$id')),
          equals('00112233-4455-6677-8899-aabbccddeeff'));
    });
  });
}
