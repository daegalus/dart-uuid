import 'dart:typed_data';
import 'parsing.dart';
import 'enums.dart';

class UuidValidation {
  /// Validates the provided [uuid] to make sure it has all the necessary
  /// components and formatting and returns a [bool]
  /// You can choose to validate from a string or from a byte list based on
  /// which parameter is passed.
  static bool isValidUUID(
      {String fromString = '',
      Uint8List? fromByteList,
      ValidationMode validationMode = ValidationMode.strictRFC4122}) {
    if (fromByteList != null) {
      fromString = UuidParsing.unparse(fromByteList);
    }
    // UUID of all 0s is ok.
    if (fromString == Namespace.NIL) {
      return true;
    }

    // If its not 36 characters in length, don't bother (including dashes).
    if (fromString.length != 36) {
      return false;
    }

    // Make sure if it passes the above, that it's a valid UUID or GUID.
    switch (validationMode) {
      case ValidationMode.strictRFC4122:
        {
          const pattern =
              r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
          final regex = RegExp(pattern, caseSensitive: false, multiLine: true);
          final match = regex.hasMatch(fromString);
          return match;
        }
      case ValidationMode.nonStrict:
        {
          const pattern =
              r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-8][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$';
          final regex = RegExp(pattern, caseSensitive: false, multiLine: true);
          final match = regex.hasMatch(fromString);
          return match;
        }
      default:
        {
          throw Exception('`$validationMode` is an invalid ValidationMode.');
        }
    }
  }

  static void isValidOrThrow(
      {String fromString = '',
      Uint8List? fromByteList,
      ValidationMode validationMode = ValidationMode.strictRFC4122}) {
    final isValid = isValidUUID(
        fromString: fromString,
        fromByteList: fromByteList,
        validationMode: validationMode);

    if (!isValid) {
      // let's check if it is a non RFC4122 uuid and help the developer
      if (validationMode != ValidationMode.nonStrict) {
        final isValidNonStrict = isValidUUID(
            fromString: fromString,
            fromByteList: fromByteList,
            validationMode: ValidationMode.nonStrict);

        if (isValidNonStrict) {
          throw FormatException(
              'The provided UUID is not RFC4122 compliant. It seems you might be using a Microsoft GUID. Try setting `validationMode = ValidationMode.nonStrict`',
              fromString);
        }
      }

      throw FormatException('The provided UUID is invalid.', fromString);
    }
  }
}
