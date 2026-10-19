import 'dart:typed_data';

import 'enums.dart';
import 'validation.dart';

class UuidParsing {
  /// Easy number -> hex conversion
  static final List<String> _byteToHex = List<String>.generate(256, (i) {
    return i.toRadixString(16).padLeft(2, '0');
  });

  static final Uint8List _hexDigits =
      Uint8List.fromList('0123456789abcdef'.codeUnits);

  /// True only on dart2js. dart2wasm and the VM give false.
  static const bool _isJs = identical(0, 0.0);

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

  /// Parses the provided [uuid] into a list of byte values as a List&lt;int&gt;.
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
  /// Set [noDashes] to `true` when parsing a 32-character UUID without dashes.
  ///
  /// Throws [RangeError] if a [buffer] is provided and it is too small.
  /// It is also thrown if a non-zero [offset] is provided without providing
  /// a [buffer].
  static List<int> parse(
    String uuid, {
    List<int>? buffer,
    int offset = 0,
    bool validate = true,
    ValidationMode validationMode = ValidationMode.strictRFC9562,
    bool noDashes = false,
  }) {
    if (validate) {
      UuidValidation.isValidOrThrow(
        fromString: uuid,
        validationMode: validationMode,
        noDashes: noDashes,
      );
    }

    return _parse(uuid, buffer, offset);
  }

  ///Parses the provided [uuid] into a list of byte values as a Uint8List.
  /// Can optionally be provided a [buffer] to write into and
  ///  a positional [offset] for where to start inputting into the buffer.
  /// Throws FormatException if the UUID is invalid. Optionally you can set
  /// [validate] to false to disable validation of the UUID before parsing.
  /// Set [noDashes] to `true` when parsing a 32-character UUID without dashes.
  static Uint8List parseAsByteList(
    String uuid, {
    List<int>? buffer,
    int offset = 0,
    bool validate = true,
    ValidationMode validationMode = ValidationMode.strictRFC9562,
    bool noDashes = false,
  }) {
    return Uint8List.fromList(
      parse(
        uuid,
        buffer: buffer,
        offset: offset,
        validate: validate,
        validationMode: validationMode,
        noDashes: noDashes,
      ),
    );
  }

  /// Parses the provided [uuid] into a list of byte values as a List&lt;int&gt;.
  /// Can optionally be provided a [buffer] to write into and
  /// a positional [offset] for where to start inputting into the buffer.
  ///
  /// Returns the [buffer] containing the bytes. If no [buffer] was provided,
  /// a new [buffer] is created and returned. If a [buffer] was provided, it
  /// is returned (even if the uuid bytes are not placed at the beginning of
  /// that [buffer]).
  ///
  /// Throws [FormatException] if the hexadecimal format is invalid.
  /// UUID version and variant bits are not validated.
  /// Optionally you can set [validate] to false to disable
  /// validation of the UUID before parsing.
  /// Set [noDashes] to `true` when parsing 32 hexadecimal characters without
  /// dashes.
  ///
  /// Throws [RangeError] if a [buffer] is provided and it is too small.
  /// It is also thrown if a non-zero [offset] is provided without providing
  /// a [buffer].
  static List<int> parseHex128(
    String uuid, {
    List<int>? buffer,
    int offset = 0,
    bool validate = true,
    bool noDashes = false,
  }) {
    if (validate) {
      UuidValidation.isValidFormatOrThrow(fromString: uuid, noDashes: noDashes);
    }

    return _parse(uuid, buffer, offset);
  }

  ///Parses the provided [uuid] into a list of byte values as a Uint8List.
  /// Can optionally be provided a [buffer] to write into and
  ///  a positional [offset] for where to start inputting into the buffer.
  /// Throws [FormatException] if the hexadecimal format is invalid.
  /// UUID version and variant bits are not validated.
  /// Optionally you can set [validate] to false to disable
  /// validation of the UUID before parsing.
  /// Set [noDashes] to `true` when parsing 32 hexadecimal characters without
  /// dashes.
  static Uint8List parseHex128AsByteList(
    String uuid, {
    List<int>? buffer,
    int offset = 0,
    bool validate = true,
    bool noDashes = false,
  }) {
    return Uint8List.fromList(
      parseHex128(
        uuid,
        buffer: buffer,
        offset: offset,
        validate: validate,
        noDashes: noDashes,
      ),
    );
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
      throw RangeError(
        'buffer too small: need 16: length=${buffer.length}'
        '${offset != 0 ? ', offset=$offset' : ''}',
      );
    }
    if (_isJs) {
      // On dart2js, joining the table strings is faster than
      // String.fromCharCodes.
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
    final result = Uint8List(36);
    var j = 0;
    for (var i = offset; i < offset + 16; i++) {
      if (i == offset + 4 ||
          i == offset + 6 ||
          i == offset + 8 ||
          i == offset + 10) {
        result[j++] = 0x2d; // '-'
      }
      final byte = buffer[i];
      RangeError.checkValueInInterval(byte, 0, 255);
      result[j++] = _hexDigits[byte >> 4];
      result[j++] = _hexDigits[byte & 0x0f];
    }
    return String.fromCharCodes(result);
  }

  static int _hexValue(int c) {
    final d = c - 0x30;
    if (d >= 0 && d <= 9) return d; // 0-9
    final l = (c | 0x20) - 0x61; // c | 0x20 maps A-F to a-f
    if (l >= 0 && l <= 5) return l + 10; // a-f, A-F
    return -1;
  }

  static List<int> _parse(String uuid, List<int>? buffer, int offset) {
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
        throw RangeError(
          'buffer too small: need 16: length=${buffer.length}'
          '${offset != 0 ? ', offset=$offset' : ''}',
        );
      }
    }

    // Each character accepts both cases. The result is the same as
    // toLowerCase() and then matching RegExp('[0-9a-f]{2}') from left to right.
    for (var j = 0; j + 1 < uuid.length && ii < 16;) {
      final hi = _hexValue(uuid.codeUnitAt(j));
      final lo = hi < 0 ? -1 : _hexValue(uuid.codeUnitAt(j + 1));
      if (lo < 0) {
        j++;
        continue;
      }
      buffer[i + ii++] = (hi << 4) | lo;
      j += 2;
    }

    // Zero out any left over bytes if the string was too short.
    while (ii < 16) {
      buffer[i + ii++] = 0;
    }

    return buffer;
  }
}
