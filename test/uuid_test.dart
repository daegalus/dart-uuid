import 'dart:typed_data';

import 'package:test/test.dart';
import 'package:uuid/uuid.dart';
import 'package:uuid/uuid_util.dart';

void main() {
  var uuid = Uuid();
  const TIME = 1321644961388;

  group('[Version 1 Tests]', () {
    test('IDs created at same mSec are different', () {
      expect(uuid.v1(options: {'mSecs': TIME}),
          isNot(equals(uuid.v1(options: {'mSecs': TIME}))));
    });

    test('Exception thrown when > 10K ids created in 1 ms', () {
      var thrown = false;
      try {
        uuid.v1(options: {'mSecs': TIME, 'nSecs': 10000});
      } catch (e) {
        thrown = true;
      }
      expect(thrown, equals(true));
    });

    test('Clock regression by msec increments the clockseq - mSec', () {
      var uidt = uuid.v1(options: {'mSecs': TIME});
      var uidtb = uuid.v1(options: {'mSecs': TIME - 1});

      expect(
          (int.parse("0x${uidtb.split('-')[3]}") -
              int.parse("0x${uidt.split('-')[3]}")),
          anyOf(equals(1), equals(-16383)));
    });

    test('Clock regression by msec increments the clockseq - nSec', () {
      var uidt = uuid.v1(options: {'mSecs': TIME, 'nSecs': 10});
      var uidtb = uuid.v1(options: {'mSecs': TIME, 'nSecs': 9});

      expect(
          (int.parse("0x${uidtb.split('-')[3]}") -
              int.parse("0x${uidt.split('-')[3]}")),
          equals(1));
    });

    test('Explicit options produce expected id', () {
      var id = uuid.v1(options: {
        'mSecs': 1321651533573,
        'nSecs': 5432,
        'clockSeq': 0x385c,
        'node': [0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10]
      });

      expect(id, equals('d9428888-122b-11e1-b85c-61cd3cbb3210'));
    });

    test('Ids spanning 1ms boundary are 100ns apart', () {
      var u0 = uuid.v1(options: {'mSecs': TIME, 'nSecs': 9999});
      var u1 = uuid.v1(options: {'mSecs': TIME + 1, 'nSecs': 0});

      var before = u0.split('-')[0], after = u1.split('-')[0];
      var dt = int.parse('0x$after') - int.parse('0x$before');

      expect(dt, equals(1));
    });

    test('Generate lots of codes to see if we get v1 collisions.', () {
      var uuids = <dynamic>{};
      var collisions = 0;
      for (var i = 0; i < 10000000; i++) {
        var code = uuid.v1();
        if (uuids.contains(code)) {
          collisions++;
          print('Collision of code: $code');
        } else {
          uuids.add(code);
        }
      }

      expect(collisions, equals(0));
      expect(uuids.length, equals(10000000));
    });

    test(
        'Generate lots of codes to check we don\'t generate variant 2 V1 codes.',
        () {
      for (var i = 0; i < 10000; i++) {
        var code = Uuid().v1();
        expect(code[19], isNot(equals('d')));
        expect(code[19], isNot(equals('c')));
      }
    });

    test('Using buffers', () {
      var buffer = Uint8List(16);
      var options = {'mSecs': TIME, 'nSecs': 0};

      var wihoutBuffer = uuid.v1(options: options);
      uuid.v1buffer(buffer, options: options);

      expect(Uuid.unparse(buffer), equals(wihoutBuffer));
    });

    test('Using Objects', () {
      var options = {'mSecs': TIME, 'nSecs': 0};

      var regular = uuid.v1(options: options);
      var obj = uuid.v1obj(options: options);

      expect(obj.uuid, equals(regular));
    });
  });

  group('[Version 4 Tests]', () {
    test('Check if V4 is consistent using a static seed', () {
      var u0 = uuid.v4(options: {
        'rng': UuidUtil.mathRNG,
        'namedArgs': Map.fromIterables([const Symbol('seed')], [1])
      });
      var u1 = 'a473ff7b-b3cd-4899-a04d-ea0fbd30a72e';
      expect(u0, equals(u1));
    });

    test('Consistency check with buffer', () {
      var buffer = Uint8List(16);
      uuid.v4buffer(buffer, options: {
        'rng': UuidUtil.mathRNG,
        'namedArgs': Map.fromIterables([const Symbol('seed')], [1])
      });

      var u1 = 'a473ff7b-b3cd-4899-a04d-ea0fbd30a72e';
      expect(Uuid.unparse(buffer), equals(u1));
    });

    test('Using Objects', () {
      var regular = uuid.v4(options: {
        'rng': UuidUtil.mathRNG,
        'namedArgs': Map.fromIterables([const Symbol('seed')], [1])
      });
      var obj = uuid.v4obj(options: {
        'rng': UuidUtil.mathRNG,
        'namedArgs': Map.fromIterables([const Symbol('seed')], [1])
      });

      expect(obj.uuid, equals(regular));
    });

    test('Return same output as entered for "random" option', () {
      var u0 = uuid.v4(options: {
        'random': [
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
        ]
      });
      var u1 = '109156be-c4fb-41ea-b1b4-efe1671c5836';
      expect(u0, equals(u1));
    });

    test('Make sure that really fast uuid.v4 doesn\'t produce duplicates', () {
      var list = List.filled(1000, null).map((something) => uuid.v4()).toList();
      var setList = list.toSet();
      expect(list.length, equals(setList.length));
    });

    test(
        'Another round of testing uuid.v4 to make sure it doesn\'t produce duplicates on high amounts of entries.',
        () {
      final numToGenerate = 3 * 1000 * 1000;
      final values = <String>{}; // set of strings
      var generator = Uuid();

      var numDuplicates = 0;
      for (var i = 0; i < numToGenerate; i++) {
        final uuid = generator.v4();

        if (!values.contains(uuid)) {
          values.add(uuid);
        } else {
          numDuplicates++;
        }
      }

      expect(numDuplicates, equals(0), reason: 'duplicate UUIDs generated');
    });
  });

  group('[Version 5 Tests]', () {
    test('Using URL namespace and custom name', () {
      var u0 = uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com');
      var u1 = uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com');

      expect(u0, equals(u1));
    });

    test('Using Random namespace and custom name', () {
      var u0 = uuid.v5(null, 'www.google.com');
      var u1 = uuid.v5(null, 'www.google.com');

      expect(u0, isNot(equals(u1)));
    });

    test('Using buffers', () {
      var buffer = Uint8List(16);
      var wihoutBuffer =
          uuid.v5(null, 'www.google.com', options: {'randomNamespace': false});
      uuid.v5buffer(null, 'www.google.com', buffer,
          options: {'randomNamespace': false});

      expect(Uuid.unparse(buffer), equals(wihoutBuffer));
    });

    test('Using Objects', () {
      var regular =
          uuid.v5(null, 'www.google.com', options: {'randomNamespace': false});
      var obj = uuid
          .v5obj(null, 'www.google.com', options: {'randomNamespace': false});

      expect(obj.uuid, equals(regular));
    });
  });

  group('[Parse/Unparse Tests]', () {
    test('Parsing a short/cut-off UUID', () {
      var id = '00112233445566778899aabbccddeeff';
      expect(() => Uuid.parse(id.substring(0, 10)),
          throwsA(isA<FormatException>()));
    });

    test('Parsing a dirty string with a UUID in it', () {
      var id = '00112233445566778899aabbccddeeff';
      expect(() => Uuid.unparse(Uuid.parse('(this is the uuid -> $id$id')),
          throwsA(isA<FormatException>()));
    });
  });
}
