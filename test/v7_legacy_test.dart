import 'dart:math' show pow;

import 'package:test/test.dart';
import 'package:uuid_plus/src/data.dart';
import 'package:uuid_plus/src/internal/v7_legacy.dart';
import 'package:uuid_plus/src/parsing.dart';

/// Returns true if running in a JavaScript environment (web), false otherwise.
///
/// This works because in JavaScript all numbers are 64-bit floating-point,
/// so 1.0 and 1 are identical. In Dart VM (native), 1.0 is double and 1 is integer,
/// so they are different objects.
bool isJavaScriptEnvironment() {
  return identical(1.0, 1);
}

void main() {
  group('UuidV7 Legacy Implementation Platform Differences', () {
    test('JavaScript number limitations affect large integer division', () {
      // 2^60 is well beyond JavaScript's MAX_SAFE_INTEGER (2^53 - 1)
      final timestamp = 1152921504606846976; // 2^60

      // Compare floating-point division (old implementation) vs bit shifting (new implementation)
      final floatingPointDivision = timestamp ~/ pow(2, 40);
      final bitShifting = timestamp >> 40;

      // Platform-specific test assertions
      if (isJavaScriptEnvironment()) {
        // On web (JavaScript)
        expect(
          floatingPointDivision,
          equals(1048576),
          reason:
              'On web, floating-point division should give 1048576 due to JavaScript number limitations',
        );

        expect(
          bitShifting,
          equals(0),
          reason: 'On web, bit shifting should give 0',
        );
      } else {
        // On native platforms
        expect(floatingPointDivision, equals(bitShifting),
            reason:
                'On native platforms, floating-point division should match bit shifting');
      }
    });

    test('platform differences affect UUID timestamp encoding', () {
      // Use a timestamp that's large enough to show differences but not so large
      // that it exceeds JavaScript's precision completely
      // 2^41 = 2199023255552 (still within JavaScript's MAX_SAFE_INTEGER)
      final timestamp = 2199023255552;

      final uuidV7 = UuidV7Legacy();
      final uuid = uuidV7.generate(options: V7Options(timestamp, null));
      final bytes = UuidParsing.parse(uuid);

      // The first byte of the UUID contains the most significant bits of the timestamp
      final actualFirstByte = bytes[0];
      final byFloatingPoint = (timestamp ~/ pow(2, 40)) & 0xFF;
      final byBitShift = (timestamp >> 40) & 0xFF;

      print(
          '\nPlatform: ${isJavaScriptEnvironment() ? 'Web (JavaScript)' : 'Native'}');
      print('Generated UUID: $uuid');
      print(
          'First byte (actual): 0x${actualFirstByte.toRadixString(16).padLeft(2, '0')}');
      print(
          'First byte (floating-point): 0x${byFloatingPoint.toRadixString(16).padLeft(2, '0')}');
      print(
          'First byte (bit shift): 0x${byBitShift.toRadixString(16).padLeft(2, '0')}');

      // Platform-specific test assertions
      if (isJavaScriptEnvironment()) {
        // On web (JavaScript)
        expect(actualFirstByte, equals(0x02),
            reason:
                'On web, legacy implementation produces incorrect first byte 0x02');
        expect(byFloatingPoint, equals(0x02),
            reason:
                'On web, floating-point division produces incorrect value 0x02');
        expect(byBitShift, equals(0x00),
            reason: 'On web, bit shifting produces correct value 0x00');
      } else {
        // On native platforms
        expect(actualFirstByte, equals(0x02),
            reason: 'On native, all methods should produce 0x02');
        expect(byFloatingPoint, equals(0x02),
            reason: 'On native, floating-point division should work correctly');
        expect(byBitShift, equals(0x02),
            reason: 'On native, bit shifting should work correctly');
      }
    });
  });
}
