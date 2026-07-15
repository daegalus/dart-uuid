import 'dart:typed_data';

import 'enums.dart';
import 'parsing.dart';

class UuidValidation {
  static final RegExp _hex128WithDashes = RegExp(
    r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    caseSensitive: false,
  );

  static final RegExp _hex128WithoutDashes = RegExp(
    r'^[0-9a-f]{32}$',
    caseSensitive: false,
  );

  /// Validates the provided [uuid] to make sure it has all the necessary
  /// components and formatting and returns a [bool]
  /// You can choose to validate from a string or from a byte list based on
  /// which parameter is passed.
  static bool isValidUUID({
    String fromString = '',
    Uint8List? fromByteList,
    ValidationMode validationMode = ValidationMode.strictRFC9562,
    bool noDashes = false,
  }) {
    if (fromByteList != null) {
      fromString = UuidParsing.unparse(fromByteList);
    }

    // UUID of all 0s is ok.
    if (fromString == Namespace.nil.value) {
      return true;
    }

    // UUID of all Fs is ok.
    if (fromString == Namespace.max.value) {
      return true;
    }

    // If its not 36 characters in length, don't bother (including dashes).
    if (!noDashes && fromString.length != 36) {
      return false;
    }

    // If its not 32 characters in length, don't bother (excluding excluding).
    if (noDashes && fromString.length != 32) {
      return false;
    }

    // Make sure if it passes the above, that it's a valid UUID or GUID.
    switch (validationMode) {
      // ignore: deprecated_member_use_from_same_package
      case ValidationMode.strictRFC9562 || ValidationMode.strictRFC4122:
        {
          var pattern = (noDashes)
              ? r'^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-8][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$'
              : r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
          final regex = RegExp(pattern, caseSensitive: false);
          return regex.hasMatch(fromString);
        }
      case ValidationMode.nonStrict:
        {
          var pattern = (noDashes)
              ? r'^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-8][0-9a-f]{3}-?[0-9a-f]{4}-?[0-9a-f]{12}$'
              : r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-8][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$';
          final regex = RegExp(pattern, caseSensitive: false);
          return regex.hasMatch(fromString);
        }
    }
  }

  /// Validates that the input is exactly a 128-bit hexadecimal value.
  ///
  /// String input must use the canonical UUID 8-4-4-4-12 layout. Set
  /// [noDashes] to `true` to instead require exactly 32 hexadecimal characters.
  /// This method does not validate UUID version or variant bits.
  ///
  /// Byte input must contain exactly 16 bytes. When [fromByteList] is provided,
  /// it takes precedence over [fromString].
  static bool isValidUUIDFormat({
    String fromString = '',
    Uint8List? fromByteList,
    bool noDashes = false,
  }) {
    if (fromByteList != null) {
      return fromByteList.length == 16;
    }

    final regex = noDashes ? _hex128WithoutDashes : _hex128WithDashes;
    return regex.hasMatch(fromString);
  }

  /// Validates the provided [uuid] to make sure it has all the necessary
  /// components and formatting and throws a [FormatException] if it is invalid.
  /// You can choose to validate from a string or from a byte list based on
  /// which parameter is passed.
  /// Optionally you can set [validationMode] to `ValidationMode.nonStrict` to
  /// allow for non RFC4122 compliant UUIDs.
  /// If you are using a Microsoft GUID, you should set [validationMode] to
  /// `ValidationMode.nonStrict`.
  static void isValidOrThrow({
    String fromString = '',
    Uint8List? fromByteList,
    ValidationMode validationMode = ValidationMode.strictRFC9562,
    bool noDashes = false,
  }) {
    final isValid = isValidUUID(
      fromString: fromString,
      fromByteList: fromByteList,
      validationMode: validationMode,
      noDashes: noDashes,
    );

    if (!isValid) {
      // let's check if it is a non RFC4122 uuid and help the developer
      if (validationMode != ValidationMode.nonStrict) {
        final isValidNonStrict = isValidUUID(
          fromString: fromString,
          fromByteList: fromByteList,
          validationMode: ValidationMode.nonStrict,
          noDashes: noDashes,
        );

        if (isValidNonStrict) {
          throw FormatException(
            'The provided UUID is not RFC4122 compliant. It seems you might be using a Microsoft GUID. Try setting `validationMode = ValidationMode.nonStrict`',
            fromString,
          );
        }
      }

      throw FormatException('The provided UUID is invalid.', fromString);
    }
  }

  /// Validates that the input is exactly a 128-bit hexadecimal value.
  ///
  /// Throws a [FormatException] when [isValidUUIDFormat] returns `false`.
  static void isValidFormatOrThrow({
    String fromString = '',
    Uint8List? fromByteList,
    bool noDashes = false,
  }) {
    final isValid = isValidUUIDFormat(
      fromString: fromString,
      fromByteList: fromByteList,
      noDashes: noDashes,
    );

    if (!isValid) {
      throw FormatException(
        'The provided UUID has an invalid format.',
        fromByteList ?? fromString,
      );
    }
  }
}
