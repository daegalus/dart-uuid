// ignore_for_file: deprecated_member_use_from_same_package
// TODO: Remove this ignore when we remove the deprecated options.
import 'dart:typed_data';

import 'package:test/test.dart';
import 'package:uuid/data.dart';
import 'package:uuid/uuid.dart';
import 'package:uuid/rng.dart';
import 'package:uuid/v4.dart';

void main() {
  var uuid = const Uuid();
  const testTime = 1321644961388;

  group('[Version 1 Tests]', () {
    test('IDs created at same mSec are different', () {
      expect(uuid.v1(options: {'mSecs': testTime}),
          isNot(equals(uuid.v1(options: {'mSecs': testTime}))));
    });

    test('Exception thrown when > 10K ids created in 1 ms', () {
      var thrown = false;
      try {
        uuid.v1(options: {'mSecs': testTime, 'nSecs': 10000});
      } catch (e) {
        thrown = true;
      }
      expect(thrown, equals(true));
    });

    test('Clock regression by msec increments the clockseq - mSec', () {
      var uidt = uuid.v1(options: {'mSecs': testTime});
      var uidtb = uuid.v1(options: {'mSecs': testTime - 1});

      expect(
          (int.parse("0x${uidtb.split('-')[3]}") -
              int.parse("0x${uidt.split('-')[3]}")),
          anyOf(equals(1), equals(-16383)));
    });

    test('Clock regression by msec increments the clockseq - nSec', () {
      var uidt = uuid.v1(options: {'mSecs': testTime, 'nSecs': 10});
      var uidtb = uuid.v1(options: {'mSecs': testTime, 'nSecs': 9});

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
      var u0 = uuid.v1(options: {'mSecs': testTime, 'nSecs': 9999});
      var u1 = uuid.v1(options: {'mSecs': testTime + 1, 'nSecs': 0});

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
      var options = {'mSecs': testTime, 'nSecs': 0};

      var withoutBuffer = uuid.v1(options: options);
      uuid.v1buffer(buffer, options: options);

      expect(Uuid.unparse(buffer), equals(withoutBuffer));
    });

    test('Using Objects', () {
      var options = {'mSecs': testTime, 'nSecs': 0};

      var regular = uuid.v1(options: options);
      var obj = uuid.v1obj(options: options);

      expect(obj.uuid, equals(regular));
    });
  });

  group('[Version 4 Tests]', () {
    test('Check if V4 is consistent using a static seed', () {
      var u0 = uuid.v4(options: {
        'rng': MathRNG(seed: 1),
      });
      var u1 = 'a462502a-73af-4e41-bfc4-05957b7030dd';
      expect(u0, equals(u1));
    });

    test('Consistency check with buffer', () {
      var buffer = Uint8List(16);
      uuid.v4buffer(buffer, options: {
        'rng': MathRNG(seed: 1),
      });

      var u1 = 'a462502a-73af-4e41-bfc4-05957b7030dd';
      expect(Uuid.unparse(buffer), equals(u1));
    });

    test('Using Objects', () {
      var regular = uuid.v4(options: {
        'rng': MathRNG(seed: 1),
      });
      var obj = uuid.v4obj(options: {
        'rng': MathRNG(seed: 1),
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
      var generator = UuidV4();

      var numDuplicates = 0;
      for (var i = 0; i < numToGenerate; i++) {
        final uuid = generator.generate();

        if (!values.contains(uuid)) {
          values.add(uuid);
        } else {
          numDuplicates++;
        }
      }

      expect(numDuplicates, equals(0), reason: 'duplicate UUIDs generated');
    });

    test('Check if V4 supports Microsoft Guid', () {
      var guidString = '2400ee73-282c-4334-e153-08d8f922d1f9';

      var isValidDefault = Uuid.isValidUUID(fromString: guidString);
      expect(isValidDefault, false);

      var isValidRFC = Uuid.isValidUUID(
          fromString: guidString, validationMode: ValidationMode.strictRFC4122);
      expect(isValidRFC, false);

      var isValidNonStrict = Uuid.isValidUUID(
          fromString: guidString, validationMode: ValidationMode.nonStrict);
      expect(isValidNonStrict, true);
    });
  });

  group('[Version 5 Tests]', () {
    test('Using URL namespace and custom name', () {
      var u0 = uuid.v5(Namespace.url.value, 'www.google.com');
      var u1 = uuid.v5(Namespace.url.value, 'www.google.com');

      expect(u0, equals(u1));
    });

    test('Using Random namespace and custom name', () {
      var u0 = uuid.v5(null, 'www.google.com');
      var u1 = uuid.v5(null, 'www.google.com');

      expect(u0, isNot(equals(u1)));
    });

    test('Using buffers', () {
      var buffer = Uint8List(16);
      var withoutBuffer =
          uuid.v5(null, 'www.google.com', options: {'randomNamespace': false});
      uuid.v5buffer(null, 'www.google.com', buffer,
          options: {'randomNamespace': false});

      expect(Uuid.unparse(buffer), equals(withoutBuffer));
    });

    test('Using Objects', () {
      var regular =
          uuid.v5(null, 'www.google.com', options: {'randomNamespace': false});
      var obj = uuid
          .v5obj(null, 'www.google.com', options: {'randomNamespace': false});

      expect(obj.uuid, equals(regular));
    });
  });

  group('[Version 6 Tests]', () {
    test('IDs created at same mSec are different', () {
      expect(
          uuid.v6(config: V6Options(null, testTime, null, null, null)),
          isNot(equals(
              uuid.v6(config: V6Options(null, testTime, null, null, null)))));
    });

    test('Exception thrown when > 10K ids created in 1 ms', () {
      var thrown = false;
      try {
        uuid.v6(config: V6Options(null, testTime, 10000, null, null));
      } catch (e) {
        thrown = true;
      }
      expect(thrown, equals(true));
    });

    test('Clock regression by msec increments the clockseq - mSec', () {
      var uidt = uuid.v6(config: V6Options(null, testTime, null, null, null));
      var uidtb =
          uuid.v6(config: V6Options(null, testTime - 1, null, null, null));

      expect(
          (int.parse("0x${uidtb.split('-')[3]}") -
              int.parse("0x${uidt.split('-')[3]}")),
          anyOf(equals(1), equals(-16383)));
    });

    test('Clock regression by msec increments the clockseq - nSec', () {
      var uidt = uuid.v6(config: V6Options(null, testTime, 10, null, null));
      var uidtb = uuid.v6(config: V6Options(null, testTime, 9, null, null));

      expect(
          (int.parse("0x${uidtb.split('-')[3]}") -
              int.parse("0x${uidt.split('-')[3]}")),
          equals(1));
    });

    test('Explicit options produce expected id', () {
      var id = uuid.v6(
          config: V6Options(0x385c, 1321651533573, 5432,
              [0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10], null));

      expect(id, equals('1e1122bd-9428-6888-b85c-61cd3cbb3210'));
    });

    test('Ids spanning 1ms boundary are 100ns apart', () {
      var u0 = uuid.v6(config: V6Options(null, testTime, 9999, null, null));
      var u1 = uuid.v6(config: V6Options(null, testTime + 1, 0, null, null));

      var before = u0.split('-')[2], after = u1.split('-')[2];
      var dt = int.parse('0x$after') - int.parse('0x$before');

      expect(dt, equals(1));
    });

    test('Generate lots of codes to see if we get v6 collisions.', () {
      var uuids = <dynamic>{};
      var collisions = 0;
      for (var i = 0; i < 10000000; i++) {
        var code = uuid.v6();
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
        'Generate lots of codes to check we don\'t generate variant 2 V6 codes.',
        () {
      for (var i = 0; i < 10000; i++) {
        var code = Uuid().v6();
        expect(code[19], isNot(equals('d')));
        expect(code[19], isNot(equals('c')));
      }
    });

    test('Using buffers', () {
      var buffer = Uint8List(16);
      var options = V6Options(null, testTime, 0, null, null);

      var withoutBuffer = uuid.v6(config: options);
      uuid.v6buffer(buffer, config: options);

      expect(Uuid.unparse(buffer), equals(withoutBuffer));
    });

    test('Using Objects', () {
      var options = V6Options(null, testTime, 0, null, null);

      var regular = uuid.v6(config: options);
      var obj = uuid.v6obj(config: options);

      expect(obj.uuid, equals(regular));
    });
  });

  group('[Version 7 Tests]', () {
    test('IDs created at same mSec are different', () {
      expect(uuid.v7(config: V7Options(testTime, null)),
          isNot(equals(uuid.v7(config: V7Options(testTime, null)))));
    });

    test('Explicit options produce expected id', () {
      final rand = MathRNG(seed: 1).generate();
      var options = V7Options(1321651533573, rand);
      var id = uuid.v7(config: options);

      expect(id, equals('0133b891-f705-7462-902a-73af3e41ffc4'));
    });

    test('Generate lots of codes to see if we get v7 collisions.', () {
      var uuids = <dynamic>{};
      var collisions = 0;
      for (var i = 0; i < 10000000; i++) {
        var code = uuid.v7();
        if (uuids.contains(code)) {
          collisions++;
          //print('Collision of code: $code');
        } else {
          uuids.add(code);
        }
      }

      expect(collisions, equals(0));
      expect(uuids.length, equals(10000000));
    });

    test(
        'Generate lots of codes to check we don\'t generate variant 2 V7 codes.',
        () {
      for (var i = 0; i < 10000; i++) {
        var code = Uuid().v7();
        expect(code[19], isNot(equals('d')));
        expect(code[19], isNot(equals('c')));
      }
    });

    test('Using buffers', () {
      var buffer = Uint8List(16);
      final rand = MathRNG(seed: 1).generate();
      var options = V7Options(testTime, rand);

      var withoutBuffer = uuid.v7(config: options);
      uuid.v7buffer(buffer, config: options);

      expect(Uuid.unparse(buffer), equals(withoutBuffer));
    });

    test('Using Objects', () {
      final rand = MathRNG(seed: 1).generate();
      var options = V7Options(testTime, rand);

      var regular = uuid.v7(config: options);
      var obj = uuid.v7obj(config: options);

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

    const size = 64;
    final buffer = Uint8List(size);

    group('Buffer offset good:', () {
      for (final testCase in {
        'offset=0': 0,
        'offset=1': 1,
        'offset in the middle': 32,
        'offset 16 bytes before the end': size - 16,
      }.entries) {
        test(testCase.key, () {
          final v = Uuid.parse(Namespace.oid.value,
              buffer: buffer, offset: testCase.value);

          expect(Uuid.unparse(v, offset: testCase.value),
              equals(Namespace.oid.value));
        });
      }
    });

    group('Buffer offset bad:', () {
      for (final testCase in {
        'offset 15 bytes before end': size - 15,
        'offset at end of buffer': size,
        'offset after end of buffer': size + 1,
        'offset is negative': -1
      }.entries) {
        test(testCase.key, () {
          expect(
              () => Uuid.parse(Namespace.oid.value,
                  buffer: buffer, offset: testCase.value),
              throwsA(isA<RangeError>()));
        });
      }
    });
  });

  group('[UuidValue]', () {
    test('Construct UuidValue instance', () {
      const validUUID = '87cd4eb3-cb88-449b-a1da-e468fd829310';
      expect(Uuid.isValidUUID(fromString: validUUID), true);
      final uuidval = UuidValue.withValidation(validUUID);
      expect(uuidval.uuid, validUUID);
    });

    test('Pass invalid Uuid to constructor', () {
      const invalidUUID = 'for sure not a valid uuid';
      expect(Uuid.isValidUUID(fromString: invalidUUID), false);
      expect(() => UuidValue.withValidation(invalidUUID),
          throwsA(isA<FormatException>()));

      final uuidval = UuidValue.fromString(invalidUUID);
      expect(uuidval.uuid, invalidUUID);
    });

    test('Pass valid Guid to constructor without validation mode', () {
      const validGUID = '2400ee73-282c-4334-e153-08d8f922d1f9';
      expect(Uuid.isValidUUID(fromString: validGUID), false);
      expect(
          () => UuidValue.withValidation(validGUID),
          throwsA(isA<FormatException>().having(
            (error) => error.message,
            'message',
            'The provided UUID is not RFC4122 compliant. It seems you might be using a Microsoft GUID. Try setting `validationMode = ValidationMode.nonStrict`',
          )));

      final uuidval = UuidValue.fromString(validGUID);
      expect(uuidval.uuid, validGUID.toLowerCase());
    });

    test('Pass valid Guid to constructor with validation mode nonStrict', () {
      const validGUID = '2400ee73-282c-4334-e153-08d8f922d1f9';
      expect(
          Uuid.isValidUUID(
              fromString: validGUID, validationMode: ValidationMode.nonStrict),
          true);

      final uuidval =
          UuidValue.withValidation(validGUID, ValidationMode.nonStrict);
      expect(uuidval.uuid, validGUID.toLowerCase());
    });

    test('const namespace regression catcher', () {
      const ns = Namespace.dns;
      expect(ns.uuidValue, UuidValue.fromNamespace(ns));
      const uuidval = UuidValue.fromNamespace(Namespace.url);
      expect(uuidval.uuid, Namespace.url.value);
    });
  });

  group('[Validation Test]', () {
    test('Dashes UUID', () {
      const validUUID = '87cd4eb3-cb88-449b-a1da-e468fd829310';
      expect(Uuid.isValidUUID(fromString: validUUID, noDashes: true), false);
      expect(Uuid.isValidUUID(fromString: validUUID), true);
    });
    test('No Dashes UUID', () {
      const validNoDashesUUID = '87cd4eb3cb88449ba1dae468fd829310';
      expect(Uuid.isValidUUID(fromString: validNoDashesUUID, noDashes: true),
          true);
      expect(Uuid.isValidUUID(fromString: validNoDashesUUID), false);
    });

    test('No Dashes UUIDValue Formatted string', () {
      const validNoDashesUUID = '87cd4eb3cb88449ba1dae468fd829310';
      expect(Uuid.isValidUUID(fromString: validNoDashesUUID, noDashes: true),
          true);
      expect(Uuid.isValidUUID(fromString: validNoDashesUUID), false);

      var uuidval = UuidValue.fromString(validNoDashesUUID);
      expect(
          uuidval.toFormattedString(), "87cd4eb3-cb88-449b-a1da-e468fd829310");
    });

    test('No Dashes UUIDValue Formatted string validate', () {
      const validNoDashesUUID = '87cd4eb3cb88449ba1dae468fd829310';
      expect(Uuid.isValidUUID(fromString: validNoDashesUUID, noDashes: true),
          true);
      expect(Uuid.isValidUUID(fromString: validNoDashesUUID), false);

      var uuidval = UuidValue.fromString(validNoDashesUUID);
      expect(uuidval.toFormattedString(validate: true),
          "87cd4eb3-cb88-449b-a1da-e468fd829310");
    });
  });

  group('[Test Vectors]', () {
    group('[UUID1]', () {
      for (final testCase in {
        'Tuesday, February 22, 2022 2:22:22.000000 PM GMT-05:00': [
          1645557742000,
          'C232AB00-9414-11EC-B3C8-9F6BDECED846'
        ],
      }.entries) {
        test(testCase.key, () {
          var nodeId = <int>[0x9F, 0x6B, 0xDE, 0xCE, 0xD8, 0x46];
          var clockSeq = (0xB3 << 8 | 0xC8) & 0x3ffff;
          final uuid = Uuid().v1(
              config: V1Options(
                  clockSeq, testCase.value[0] as int, 0, nodeId, null));
          expect(uuid.toUpperCase(), equals(testCase.value[1]));
        });
      }
    });

    group('[UUID6]', () {
      for (final testCase in {
        'Tuesday, February 22, 2022 2:22:22.000000 PM GMT-05:00': [
          1645557742000,
          '1EC9414C-232A-6B00-B3C8-9F6BDECED846'
        ],
      }.entries) {
        test(testCase.key, () {
          var nodeId = <int>[0x9F, 0x6B, 0xDE, 0xCE, 0xD8, 0x46];
          var clockSeq = (0xB3 << 8 | 0xC8) & 0x3ffff;
          final uuid = Uuid().v6(
              config: V6Options(
                  clockSeq, testCase.value[0] as int, 0, nodeId, null));
          expect(uuid.toUpperCase(), equals(testCase.value[1]));
        });
      }
    });

    group('[UUID7]', () {
      for (final testCase in {
        'Tuesday, February 22, 2022 2:22:22.000000 PM GMT-05:00': [
          1645557742000,
          '017F22E2-79B0-7CC3-98C4-DC0C0C07398F'
        ],
      }.entries) {
        test(testCase.key, () {
          final rand = [
            0x0C,
            0xC3,
            0x18,
            0xC4,
            0xDC,
            0x0C,
            0x0C,
            0x07,
            0x39,
            0x8F
          ];

          final uuid =
              Uuid().v7(config: V7Options(testCase.value[0] as int, rand));
          expect(uuid.toUpperCase(), equals(testCase.value[1]));
        });
      }
    });

    group('[UUID8]', () {
      for (final testCase in {
        'Tuesday, February 22, 2022 2:22:22.222000 PM GMT-05:00': [
          DateTime.fromMillisecondsSinceEpoch(1645557742222).toUtc(),
          '20220222-1922-8422-9222-73AF3E41FFC4'
        ],
      }.entries) {
        test(testCase.key, () {
          final rand = MathRNG(seed: 1).generate();
          final uuid =
              Uuid().v8(config: V8Options(testCase.value[0] as DateTime, rand));
          expect(uuid.toUpperCase(), equals(testCase.value[1]));
        });
      }

      for (final testCase in {
        'UUIDv8 Generic, SHA512/256 random numbers': [
          [
            0xdb,
            0xc9,
            0xed,
            0x5e,
            0xf2,
            0xf5,
            0x43,
            0x13,
            0x8a,
            0xf4,
            0x5e,
            0x8b,
            0x58,
            0x5f,
            0x91,
            0x31,
            0xa6,
            0x16
          ],
          'DBC9ED5E-F2F5-8313-8AF4-5E8B585F9131'
        ],
      }.entries) {
        test(testCase.key, () {
          final uuid = Uuid()
              .v8g(config: V8GenericOptions(testCase.value[0] as List<int>));
          expect(uuid.toUpperCase(), equals(testCase.value[1]));
        });
      }
    });
  });

  group('[RNG]', () {
    test("MathRNG Generates unique lists of bytes, no seed", () {
      var hexs = <String>{};
      RNG rng = MathRNG();

      final numToGenerate = 3 * 1000 * 1000;
      int numDuplicates = 0;
      for (var i = 0; i < numToGenerate; i++) {
        Uint8List list = rng.generate();
        var hexString = Uuid.unparse(list);

        if (hexs.contains(hexString)) {
          numDuplicates += 1;
        } else {
          hexs.add(hexString);
        }
      }

      expect(numDuplicates, equals(0));
    });

    test("MathRNG Generates unique lists of bytes, with seed", () {
      var hexs = <String>{};
      RNG rng = MathRNG(seed: testTime);

      final numToGenerate = 3 * 1000 * 1000;
      int numDuplicates = 0;
      for (var i = 0; i < numToGenerate; i++) {
        Uint8List list = rng.generate();
        var hexString = Uuid.unparse(list);

        if (hexs.contains(hexString)) {
          numDuplicates += 1;
        } else {
          hexs.add(hexString);
        }
      }

      expect(numDuplicates, equals(0));
    });

    test("CryptoRNG Generates unique lists of bytes", () {
      var hexs = <String>{};
      RNG rng = CryptoRNG();

      final numToGenerate = 3 * 1000 * 1000;
      int numDuplicates = 0;
      for (var i = 0; i < numToGenerate; i++) {
        Uint8List list = rng.generate();
        var hexString = Uuid.unparse(list);

        if (hexs.contains(hexString)) {
          numDuplicates += 1;
        } else {
          hexs.add(hexString);
        }
      }

      expect(numDuplicates, equals(0));
    });
  });
}
