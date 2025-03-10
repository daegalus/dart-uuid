import 'package:test/test.dart';
import 'package:uuid_plus/src/data.dart';
import 'package:uuid_plus/src/parsing.dart';
import 'package:uuid_plus/src/v4.dart';

void main() {
  group('UuidV4', () {
    test('should generate a valid v4 UUID', () {
      final uuidV4 = UuidV4();
      final uuid = uuidV4.generate();

      // Basic format check
      expect(
          uuid,
          matches(RegExp(
              r'^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')));

      // Verify version bit (should be 4)
      final bytes = UuidParsing.parse(uuid);
      expect(bytes[6] >> 4, equals(4),
          reason: 'Version bits should be set to 4');

      // Verify variant bits (should be 10xx, where x is random)
      expect(bytes[8] >> 6, equals(2),
          reason: 'Variant bits should be set to 10xx');
    });

    test('multiple UUIDs should be unique', () {
      final uuidV4 = UuidV4();
      final count = 1000;
      final generatedUuids = <String>{};

      for (var i = 0; i < count; i++) {
        generatedUuids.add(uuidV4.generate());
      }

      // All generated UUIDs should be unique
      expect(generatedUuids.length, equals(count),
          reason: 'Generated UUIDs should all be unique');
    });

    test('should accept custom random values', () {
      // Providing predetermined random values
      final customBytes = List<int>.filled(16, 0);
      final options = V4Options(customBytes, null);
      final uuidV4 = UuidV4();
      final uuid = uuidV4.generate(options: options);

      // Bytes should be modified according to v4 rules
      final parsedBytes = UuidParsing.parse(uuid);

      // Version bits should be set to 4
      expect(parsedBytes[6] >> 4, equals(4));

      // Variant bits should be set to 10xx
      expect(parsedBytes[8] >> 6, equals(2));

      // Other bytes should remain 0
      for (int i = 0; i < 16; i++) {
        if (i != 6 && i != 8) {
          expect(parsedBytes[i], equals(0));
        } else if (i == 6) {
          expect(parsedBytes[i], equals(0x40)); // 0x00 with version 4
        } else if (i == 8) {
          expect(parsedBytes[i], equals(0x80)); // 0x00 with variant bits
        }
      }
    });

    test('should correctly set version and variant bits', () {
      final uuidV4 = UuidV4();

      // Generate multiple UUIDs to ensure consistent behavior
      for (var i = 0; i < 10; i++) {
        final uuid = uuidV4.generate();
        final bytes = UuidParsing.parse(uuid);

        // Version should always be 4
        expect(bytes[6] >> 4, equals(4),
            reason: 'Version bits should always be set to 4');

        // Variant should always be 10xx (RFC4122)
        expect(bytes[8] >> 6, equals(2),
            reason: 'Variant bits should always be set to 10xx (RFC4122)');

        // Check that the random bits can be any value (just validating they are present)
        // The lower 4 bits of byte 6 could be any value 0-15
        expect(bytes[6] & 0x0F, inInclusiveRange(0, 15),
            reason: 'Lower 4 bits of version byte should be in range 0-15');

        // The lower 6 bits of byte 8 could be any value 0-63
        expect(bytes[8] & 0x3F, inInclusiveRange(0, 63),
            reason: 'Lower 6 bits of variant byte should be in range 0-63');
      }
    });

    test('should use custom random bytes consistently', () {
      // Test with two identical sets of random bytes
      final customBytes1 = List<int>.filled(16, 0xFF);
      final customBytes2 = List<int>.filled(16, 0xFF);

      final options1 = V4Options(customBytes1, null);
      final options2 = V4Options(customBytes2, null);

      final uuidV4 = UuidV4();
      final uuid1 = uuidV4.generate(options: options1);
      final uuid2 = uuidV4.generate(options: options2);

      // UUIDs should be identical when generated from identical random bytes
      expect(uuid1, equals(uuid2),
          reason:
              'UUIDs generated with identical random bytes should be identical');

      // Check the format of the UUID
      final bytes = UuidParsing.parse(uuid1);

      // Version bits should be set to 4
      expect(bytes[6] >> 4, equals(4));

      // Variant bits should be set to 10xx
      expect(bytes[8] >> 6, equals(2));

      // Check that other bytes have been correctly derived from our input
      for (int i = 0; i < 16; i++) {
        if (i == 6) {
          // Version 4 (0100) should be set, with lower bits from our 0xFF input
          expect(bytes[i], equals(0x4F));
        } else if (i == 8) {
          // Variant 10xx should be set, with lower bits from our 0xFF input
          expect(bytes[i], equals(0xBF));
        } else {
          // All other bytes should be 0xFF as provided
          expect(bytes[i], equals(0xFF));
        }
      }
    });
  });
}
