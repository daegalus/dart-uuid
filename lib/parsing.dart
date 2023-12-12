import 'dart:typed_data';

import 'enums.dart';
import 'validation.dart';

class UuidParsing {
  /// Easy number -> hex conversion
  static final List<String> _byteToHex = List<String>.generate(256, (i) {
    return i.toRadixString(16).padLeft(2, '0');
  });

  /// Convert Hex String to Uint8List
  static Uint8List parseHexToBytes(String hex) {
    if (hex.length % 2 != 0) {
      throw ArgumentError('Invalid hex string');
    }
    if (hex.startsWith('0x')) {
      hex = hex.substring(2);
    }

    var bytes = Uint8List(hex.length ~/ 2);
    for (var i = 0; i < hex.length; i += 2) {
      bytes[i ~/ 2] = int.parse(hex.substring(i, i + 2), radix: 16);
    }
    return bytes;
  }

  /// Parses the provided [uuid] into a list of byte values as a List<int>.
  /// Can optionally be provided a [buffer] to write into and
  /// a positional [offset] for where to start inputting into the buffer.
  ///
  /// Returns the [buffer] containing the bytes. If no [buffer] was provided,
  /// a new [buffer] is created and returned. If a [buffer] was provided, it
  /// is returned (even if the uuid bytes are not placed at the beginning of
  /// that [buffer]).
  ///
  /// Throws [FormatException] if the UUID is invalid. Optionally you can set
  /// [validate] to false to disable validation of the UUID before parsing.
  ///
  /// Throws [RangeError] if a [buffer] is provided and it is too small.
  /// It is also thrown if a non-zero [offset] is provided without providing
  /// a [buffer].
  static List<int> parse(String uuid,
      {List<int>? buffer,
      int offset = 0,
      bool validate = true,
      ValidationMode validationMode = ValidationMode.strictRFC4122,
      bool noDashes = false}) {
    if (validate) {
      UuidValidation.isValidOrThrow(
          fromString: uuid, validationMode: validationMode, noDashes: noDashes);
    }
    var i = offset, ii = 0;

    // Get buffer to store the result
    if (buffer == null) {
      // Buffer not provided: create a 16 item buffer
      if (offset != 0) {
        throw RangeError('non-zero offset without providing a buffer');
      }
      buffer = Uint8List(16);
    } else {
      // Buffer provided: check it is large enough
      if (buffer.length - offset < 16) {
        throw RangeError('buffer too small: need 16: length=${buffer.length}'
            '${offset != 0 ? ', offset=$offset' : ''}');
      }
    }

    // Convert to lowercase and replace all hex with bytes then
    // string.replaceAll() does a lot of work that I don't need, and a manual
    // regex gives me more control.
    final regex = RegExp('[0-9a-f]{2}');
    for (Match match in regex.allMatches(uuid.toLowerCase())) {
      if (ii < 16) {
        var hex = uuid.toLowerCase().substring(match.start, match.end);
        buffer[i + ii++] = int.parse(hex, radix: 16);
      }
    }

    // Zero out any left over bytes if the string was too short.
    while (ii < 16) {
      buffer[i + ii++] = 0;
    }

    return buffer;
  }

  ///Parses the provided [uuid] into a list of byte values as a Uint8List.
  /// Can optionally be provided a [buffer] to write into and
  ///  a positional [offset] for where to start inputting into the buffer.
  /// Throws FormatException if the UUID is invalid. Optionally you can set
  /// [validate] to false to disable validation of the UUID before parsing.
  static Uint8List parseAsByteList(String uuid,
      {List<int>? buffer,
      int offset = 0,
      bool validate = true,
      ValidationMode validationMode = ValidationMode.strictRFC4122,
      bool noDashes = false}) {
    return Uint8List.fromList(parse(uuid,
        buffer: buffer,
        offset: offset,
        validate: validate,
        validationMode: validationMode,
        noDashes: noDashes));
  }

  /// Unparses a [buffer] of bytes and outputs a proper UUID string.
  /// An optional [offset] is allowed if you want to start at a different point
  /// in the buffer.
  ///
  /// Throws a [RangeError] exception if the [buffer] is not large enough to
  /// hold the bytes. That is, if the length of the [buffer] after the [offset]
  /// is less than 16.
  static String unparse(List<int> buffer, {int offset = 0}) {
    if (buffer.length - offset < 16) {
      throw RangeError('buffer too small: need 16: length=${buffer.length}'
          '${offset != 0 ? ', offset=$offset' : ''}');
    }
    var i = offset;
    return '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}-'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}-'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}-'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}-'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}';
  }
}
