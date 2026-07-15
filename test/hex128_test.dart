import 'dart:typed_data';

import 'package:test/test.dart';
import 'package:uuid/parsing.dart';
import 'package:uuid/uuid.dart';
import 'package:uuid/validation.dart';

void main() {
  const dashed = '019f13f5-53cb-b219-ca3e-4b569376f32b';
  const noDashes = '019f13f553cbb219ca3e4b569376f32b';
  const strictNoDashes = '87cd4eb3cb88449ba1dae468fd829310';
  const expectedBytes = <int>[
    0x01,
    0x9f,
    0x13,
    0xf5,
    0x53,
    0xcb,
    0xb2,
    0x19,
    0xca,
    0x3e,
    0x4b,
    0x56,
    0x93,
    0x76,
    0xf3,
    0x2b,
  ];

  group('128-bit hexadecimal format validation', () {
    test('accepts canonical dashed input without UUID semantic validation', () {
      expect(Uuid.isValidUUID(fromString: dashed), isFalse);
      expect(Uuid.isValidUUIDFormat(fromString: dashed), isTrue);
      expect(Uuid.isValidUUIDFormat(fromString: dashed.toUpperCase()), isTrue);
    });

    test('requires callers to select the dashed or undashed format', () {
      expect(Uuid.isValidUUIDFormat(fromString: dashed), isTrue);
      expect(
        Uuid.isValidUUIDFormat(fromString: dashed, noDashes: true),
        isFalse,
      );
      expect(Uuid.isValidUUIDFormat(fromString: noDashes), isFalse);
      expect(
        Uuid.isValidUUIDFormat(fromString: noDashes, noDashes: true),
        isTrue,
      );
    });

    test('rejects extra lines and malformed input', () {
      for (final value in <String>[
        '\n$dashed',
        '$dashed\n',
        'aa\n$dashed\nzz',
        '019f13f5_53cb-b219-ca3e-4b569376f32b',
        '019f13f5-53cb-b219-ca3e-4b569376f32',
        '019f13f5-53cb-b219-ca3e-4b569376f32bb',
      ]) {
        expect(
          Uuid.isValidUUIDFormat(fromString: value),
          isFalse,
          reason: value,
        );
      }
    });

    test('requires exactly 16 bytes', () {
      expect(Uuid.isValidUUIDFormat(fromByteList: Uint8List(16)), isTrue);
      expect(Uuid.isValidUUIDFormat(fromByteList: Uint8List(15)), isFalse);
      expect(Uuid.isValidUUIDFormat(fromByteList: Uint8List(17)), isFalse);
    });

    test('throwing validator follows the same rules', () {
      expect(
        () => UuidValidation.isValidFormatOrThrow(fromString: dashed),
        returnsNormally,
      );
      expect(
        () =>
            UuidValidation.isValidFormatOrThrow(fromString: 'aa\n$dashed\nzz'),
        throwsA(isA<FormatException>()),
      );
      expect(
        () => UuidValidation.isValidFormatOrThrow(fromByteList: Uint8List(17)),
        throwsA(isA<FormatException>()),
      );
    });
  });

  group('128-bit hexadecimal parsing', () {
    test('parses dashed input through every public return type', () {
      expect(Uuid.parseHex128(dashed), expectedBytes);
      expect(
        Uuid.parseHex128AsByteList(dashed),
        allOf(isA<Uint8List>(), expectedBytes),
      );
      expect(UuidParsing.parseHex128(dashed), expectedBytes);
    });

    test('parses undashed input when explicitly requested', () {
      expect(Uuid.parseHex128(noDashes, noDashes: true), expectedBytes);
      expect(
        Uuid.parseHex128AsByteList(noDashes, noDashes: true),
        expectedBytes,
      );
      expect(UuidParsing.parseHex128(noDashes, noDashes: true), expectedBytes);

      // The existing strict parser now exposes its lower-level noDashes option.
      const strictExpectedBytes = <int>[
        0x87,
        0xcd,
        0x4e,
        0xb3,
        0xcb,
        0x88,
        0x44,
        0x9b,
        0xa1,
        0xda,
        0xe4,
        0x68,
        0xfd,
        0x82,
        0x93,
        0x10,
      ];
      expect(
        Uuid.parse(strictNoDashes, noDashes: true),
        strictExpectedBytes,
      );
      expect(
        Uuid.parseAsByteList(strictNoDashes, noDashes: true),
        strictExpectedBytes,
      );
    });

    test('rejects extra lines before parsing any bytes', () {
      const injected = 'aa\n$dashed\nzz';
      expect(() => Uuid.parseHex128(injected), throwsA(isA<FormatException>()));
      expect(
        () => Uuid.parseHex128AsByteList(injected),
        throwsA(isA<FormatException>()),
      );
    });

    test('writes into a caller-provided buffer at the requested offset', () {
      final buffer = List<int>.filled(20, 0xff);
      final result = Uuid.parseHex128(dashed, buffer: buffer, offset: 2);

      expect(result, same(buffer));
      expect(buffer.sublist(2, 18), expectedBytes);
      expect(buffer.take(2), everyElement(0xff));
      expect(buffer.skip(18), everyElement(0xff));
    });
  });
}
