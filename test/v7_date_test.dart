import 'package:test/test.dart';
import 'package:uuid_plus/uuid_plus.dart';

void main() {
  group('UuidV7 date parsing', () {
    test('returns correct utc datetime for uuid v7', () {
      // Given
      final sourceDateTime = DateTime.utc(2025, 2, 3, 15, 34);
      final config = V7Options(sourceDateTime.millisecondsSinceEpoch, null);
      final uuid = const Uuid().v7(config: config);

      // When
      final dateTime = UuidV7.parseDateTime(uuid, utc: true);

      // Then
      expect(dateTime, sourceDateTime);
    });

    test('returns correct local datetime for uuid v7', () {
      // Given
      final sourceDateTime = DateTime.utc(2025, 2, 3, 15, 34);
      final config = V7Options(sourceDateTime.millisecondsSinceEpoch, null);
      final uuid = const Uuid().v7(config: config);

      // When
      final dateTime = UuidV7.parseDateTime(uuid, utc: false);

      // Then
      expect(dateTime, sourceDateTime.toLocal());
    });

    test('throws exception for invalid source', () {
      // Given
      const uuid = '123oneTwo';

      // When
      void parse() => UuidV7.parseDateTime(uuid);

      // Then
      expect(parse, throwsA(isA<FormatException>()));
    });

    test('throws exception for empty source', () {
      // Given
      const uuid = '';

      // When
      void parse() => UuidV7.parseDateTime(uuid);

      // Then
      expect(parse, throwsA(isA<FormatException>()));
    });

    test('throws exception for uuid v4', () {
      // Given
      final uuid = const Uuid().v4();

      // When
      void parse() => UuidV7.parseDateTime(uuid);

      // Then
      expect(parse, throwsA(isA<ArgumentError>()));
    });
  });
}
