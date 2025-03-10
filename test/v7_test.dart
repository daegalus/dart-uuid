import 'package:fixnum/fixnum.dart';
import 'package:test/test.dart';
import 'package:uuid_plus/src/data.dart';
import 'package:uuid_plus/src/parsing.dart';
import 'package:uuid_plus/src/uuid.dart';
import 'package:uuid_plus/src/v7.dart';

void main() {
  group('UuidV7', () {
    group('Direct UuidV7 Class Tests', () {
      final uuidV7 = UuidV7();

      test('generates valid UUID v7 string', () {
        final uuid = uuidV7.generate();

        // UUID format validation (8-4-4-4-12 pattern)
        expect(
            uuid,
            matches(
                r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'));

        // UUID version should be 7
        expect(uuid[14], equals('7'));

        // UUID variant should be 1 (10xx in binary)
        // The 8th character in the 3rd group should have its most significant bits as '10'
        // That means it should be one of: 8, 9, A, or B
        final variantChar = uuid[19];
        final variantValue = int.parse(variantChar, radix: 16);
        expect(variantValue >= 8 && variantValue <= 11, isTrue,
            reason:
                'Variant bits should be 10xx, making char one of 8, 9, A, or B, but was $variantChar');
      });

      test('UUIDs generated at the same time are different', () {
        final timestamp = DateTime.timestamp().millisecondsSinceEpoch;
        final uuid1 = uuidV7.generate(options: V7Options(timestamp, null));
        final uuid2 = uuidV7.generate(options: V7Options(timestamp, null));

        expect(uuid1, isNot(equals(uuid2)));
      });

      test('timestamp is encoded correctly in the UUID', () {
        // Use a fixed timestamp for testing
        final timestamp = 1646870400123; // 2022-03-10T00:00:00.123Z
        final uuid = uuidV7.generate(options: V7Options(timestamp, null));

        // Parse the UUID to get the binary representation
        final bytes = UuidParsing.parse(uuid);

        // Extract timestamp from the binary representation (first 6 bytes)
        final extractedTimestamp = extractTimestamp(bytes);

        expect(extractedTimestamp, equals(timestamp),
            reason:
                'Extracted timestamp $extractedTimestamp should match input timestamp $timestamp');
      });

      test('custom random bytes are used correctly', () {
        final timestamp = 1646870400123;
        // Use custom random bytes with a recognizable pattern
        final randomBytes = List<int>.filled(10, 0x42); // 10 bytes of 0x42

        final uuid =
            uuidV7.generate(options: V7Options(timestamp, randomBytes));
        final bytes = UuidParsing.parse(uuid);

        // Check that our random bytes are used, but with version and variant bits modified
        // Version bits (bits 4-7 of byte 6) will be set to 0111 (7)
        expect(bytes[6] & 0xF0, equals(0x70));
        // Lower 4 bits should be from our random bytes (0x42 & 0x0F = 0x02)
        expect(bytes[6] & 0x0F, equals(0x02));

        // Byte 7 should be unchanged from our random bytes
        expect(bytes[7], equals(0x42));

        // Variant bits (bits 0-1 of byte 8) will be set to 10xx
        expect(bytes[8] & 0xC0, equals(0x80));
        // Lower 6 bits should be from our random bytes (0x42 & 0x3F = 0x02)
        expect(bytes[8] & 0x3F, equals(0x02));

        // Byte 9 should be unchanged from our random bytes
        expect(bytes[9], equals(0x42));

        // Remaining random bytes should be unchanged
        for (var i = 10; i < 16; i++) {
          expect(bytes[i], equals(0x42));
        }
      });

      test('version and variant bits are set correctly', () {
        final uuid = uuidV7.generate();
        final bytes = UuidParsing.parse(uuid);

        // Version should be 7 (0111 in binary)
        expect(bytes[6] & 0xF0, equals(0x70));

        // Variant should be 10xx (RFC4122)
        expect(bytes[8] & 0xC0, equals(0x80));
      });

      test('UUIDs are monotonically increasing with time', () {
        final time1 = 1646870400000; // 2022-03-10T00:00:00.000Z
        final time2 = 1646870400001; // 2022-03-10T00:00:00.001Z

        final uuid1 = uuidV7.generate(options: V7Options(time1, null));
        final uuid2 = uuidV7.generate(options: V7Options(time2, null));

        // uuid2 should be lexicographically greater than uuid1
        expect(uuid1.compareTo(uuid2) < 0, isTrue);
      });
    });

    group('Uuid Class Integration Tests', () {
      final uuid = Uuid();

      test('v7() generates valid UUID v7 string', () {
        final uuidStr = uuid.v7();

        // UUID format validation
        expect(
            uuidStr,
            matches(
                r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'));

        // Version should be 7
        expect(uuidStr[14], equals('7'));

        // Variant should be RFC4122
        final variantChar = uuidStr[19];
        final variantValue = int.parse(variantChar, radix: 16);
        expect(variantValue >= 8 && variantValue <= 11, isTrue,
            reason:
                'Variant bits should be 10xx, making char one of 8, 9, A, or B, but was $variantChar');
      });

      test('v7buffer() generates valid binary UUID v7', () {
        final buffer = List<int>.filled(16, 0);
        final bytes = uuid.v7buffer(buffer);

        // Should be 16 bytes
        expect(bytes.length, equals(16));

        // Version should be 7
        expect(bytes[6] & 0xF0, equals(0x70));

        // Variant should be RFC4122
        expect(bytes[8] & 0xC0, equals(0x80));

        // Converting to string should yield a valid UUID
        final uuidStr = UuidParsing.unparse(bytes);
        expect(
            uuidStr,
            matches(
                r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'));
      });

      test('v7obj() generates valid UuidValue with v7 UUID', () {
        final uuidValue = uuid.v7obj();

        // Should be a UuidValue instance
        expect(uuidValue, isA<UuidValue>());

        // Value should be a valid UUID string
        expect(
            uuidValue.toString(),
            matches(
                r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'));

        // Version should be 7
        expect(uuidValue.toString()[14], equals('7'));

        // Should have the correct version in the UuidValue
        expect(uuidValue.version, equals(7));
      });

      test('custom options are respected in all v7 methods', () {
        final timestamp = 1646870400123; // 2022-03-10T00:00:00.123Z
        final options = V7Options(timestamp, null);
        final buffer = List<int>.filled(16, 0);

        final uuidStr = uuid.v7(config: options);
        final uuidBytes = uuid.v7buffer(buffer, config: options);
        final uuidObj = uuid.v7obj(config: options);

        // All methods should encode the same timestamp
        final extractedTimestampStr =
            extractTimestamp(UuidParsing.parse(uuidStr));
        final extractedTimestampBytes = extractTimestamp(uuidBytes);
        final extractedTimestampObj =
            extractTimestamp(UuidParsing.parse(uuidObj.toString()));

        expect(extractedTimestampStr, equals(timestamp),
            reason:
                'String method: expected $timestamp but got $extractedTimestampStr');
        expect(extractedTimestampBytes, equals(timestamp),
            reason:
                'Buffer method: expected $timestamp but got $extractedTimestampBytes');
        expect(extractedTimestampObj, equals(timestamp),
            reason:
                'Object method: expected $timestamp but got $extractedTimestampObj');
      });

      test('UUIDs are monotonically increasing with time', () {
        final time1 = 1646870400000; // 2022-03-10T00:00:00.000Z
        final time2 = 1646870400001; // 2022-03-10T00:00:00.001Z

        final uuid1 = uuid.v7(config: V7Options(time1, null));
        final uuid2 = uuid.v7(config: V7Options(time2, null));

        // uuid2 should be lexicographically greater than uuid1
        expect(uuid1.compareTo(uuid2) < 0, isTrue);

        // The same should apply to UuidValue objects
        final uuidObj1 = uuid.v7obj(config: V7Options(time1, null));
        final uuidObj2 = uuid.v7obj(config: V7Options(time2, null));

        // Use string comparison since UuidValue doesn't have compareTo
        expect(uuidObj1.toString().compareTo(uuidObj2.toString()) < 0, isTrue);
      });
    });
  });
}

// Helper function to extract timestamp from UUID bytes
int extractTimestamp(List<int> bytes) {
  // Create an Int64 from the first 6 bytes in big-endian order
  Int64 timestamp = Int64.ZERO;
  timestamp |= Int64(bytes[0]) << 40;
  timestamp |= Int64(bytes[1]) << 32;
  timestamp |= Int64(bytes[2]) << 24;
  timestamp |= Int64(bytes[3]) << 16;
  timestamp |= Int64(bytes[4]) << 8;
  timestamp |= Int64(bytes[5]);
  return timestamp.toInt();
}
