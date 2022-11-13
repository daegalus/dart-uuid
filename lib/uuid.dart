/// Generates UUID v1, v4, v5 following RFC4122 standard.
// ignore_for_file: constant_identifier_names

library uuid;

import 'dart:typed_data';

import 'package:uuid/validation.dart';

import 'enums.dart';
import 'parsing.dart';
import 'uuid_value.dart';
import 'v1.dart';
import 'v4.dart';
import 'v5.dart';
import 'v6.dart';
import 'v7.dart';
import 'v8.dart';

export 'uuid_value.dart';
export 'enums.dart';

/// uuid for Dart
/// Author: Yulian Kuncheff
/// Released under MIT License.

class Uuid {
  // RFC4122 provided namespaces for v3 and v5 namespace based UUIDs
  static const NAMESPACE_DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  static const NAMESPACE_URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
  static const NAMESPACE_OID = '6ba7b812-9dad-11d1-80b4-00c04fd430c8';
  static const NAMESPACE_X500 = '6ba7b814-9dad-11d1-80b4-00c04fd430c8';
  static const NAMESPACE_NIL = '00000000-0000-0000-0000-000000000000';

  final Map<String, dynamic>? goptions;
  final UuidV1 _uuidv1;
  final UuidV4 _uuidv4;
  final UuidV5 _uuidv5;
  final UuidV6 _uuidv6;
  final UuidV7 _uuidv7;
  final UuidV8 _uuidv8;

  factory Uuid({Map<String, dynamic>? options}) {
    return Uuid._(UuidV1(options: options), UuidV4(options: options), UuidV5(options), UuidV6(options), UuidV7(options),
        UuidV8(options),
        goptions: options);
  }
  const Uuid._(this._uuidv1, this._uuidv4, this._uuidv5, this._uuidv6, this._uuidv7, this._uuidv8, {this.goptions});

  ///Parses the provided [uuid] into a list of byte values as a List<int>.
  /// Can optionally be provided a [buffer] to write into and
  ///  a positional [offset] for where to start inputting into the buffer.
  /// Throws FormatException if the UUID is invalid. Optionally you can set
  /// [validate] to false to disable validation of the UUID before parsing.
  static List<int> parse(
    String uuid, {
    List<int>? buffer,
    int offset = 0,
    bool validate = true,
    ValidationMode validationMode = ValidationMode.strictRFC4122,
  }) {
    return UuidParsing.parse(uuid, buffer: buffer, offset: offset, validate: validate, validationMode: validationMode);
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
      ValidationMode validationMode = ValidationMode.strictRFC4122}) {
    return UuidParsing.parseAsByteList(uuid,
        buffer: buffer, offset: offset, validate: validate, validationMode: validationMode);
  }

  /// Unparses a [buffer] of bytes and outputs a proper UUID string.
  /// An optional [offset] is allowed if you want to start at a different point
  /// in the buffer.
  /// Throws an exception if the buffer does not have a length of 16
  static String unparse(List<int> buffer, {int offset = 0}) {
    return UuidParsing.unparse(buffer, offset: offset);
  }

  /// Validates the provided [uuid] to make sure it has all the necessary
  /// components and formatting and returns a [bool]
  /// You can choose to validate from a string or from a byte list based on
  /// which parameter is passed.
  static bool isValidUUID(
      {String fromString = '', Uint8List? fromByteList, ValidationMode validationMode = ValidationMode.strictRFC4122}) {
    return UuidValidation.isValidUUID(
        fromString: fromString, fromByteList: fromByteList, validationMode: validationMode);
  }

  /// v1() Generates a time-based version 1 UUID
  ///
  /// By default it will generate a string based off current time, and will
  /// return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.2.2
  String v1({Map<String, dynamic>? options}) {
    return _uuidv1.generate(options: options);
  }

  /// v1buffer() Generates a time-based version 1 UUID
  ///
  /// By default it will generate a string based off current time, and will
  /// place the result into the provided [buffer]. The [buffer] will also be returned..
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.2.2
  List<int> v1buffer(
    List<int> buffer, {
    Map<String, dynamic>? options,
    int offset = 0,
  }) {
    return UuidParsing.parse(v1(options: options), buffer: buffer, offset: offset);
  }

  /// v1obj() Generates a time-based version 1 UUID
  ///
  /// By default it will generate a string based off current time, and will
  /// return it as a [UuidValue] object.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.2.2
  UuidValue v1obj({Map<String, dynamic>? options}) {
    return UuidValue(v1(options: options));
  }

  /// v4() Generates a RNG version 4 UUID
  ///
  /// By default it will generate a string based mathRNG, and will return
  /// a string. If you wish to use crypto-strong RNG, pass in UuidUtil.cryptoRNG
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  String v4({Map<String, dynamic>? options}) {
    return _uuidv4.generate(options: options);
  }

  /// v4buffer() Generates a RNG version 4 UUID
  ///
  /// By default it will generate a string based off mathRNG, and will
  /// place the result into the provided [buffer]. The [buffer] will also be returned.
  /// If you wish to have crypto-strong RNG, pass in UuidUtil.cryptoRNG.
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  List<int> v4buffer(
    List<int> buffer, {
    Map<String, dynamic>? options,
    int offset = 0,
  }) {
    return UuidParsing.parse(v4(options: options), buffer: buffer, offset: offset);
  }

  /// v4obj() Generates a RNG version 4 UUID
  ///
  /// By default it will generate a string based mathRNG, and will return
  /// a [UuidValue] object. If you wish to use crypto-strong RNG, pass in UuidUtil.cryptoRNG
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  UuidValue v4obj({Map<String, dynamic>? options}) {
    return UuidValue(v4(options: options));
  }

  /// v5() Generates a namespace & name-based version 5 UUID
  ///
  /// By default it will generate a string based on a provided uuid namespace and
  /// name, and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  String v5(String? namespace, String? name, {Map<String, dynamic>? options}) {
    return _uuidv5.generate(namespace, name, options: options);
  }

  /// v5buffer() GGenerates a namespace & name-based version 5 UUID
  ///
  /// By default it will generate a string based on a provided uuid namespace and
  /// place the result into the provided [buffer]. The [buffer] will also be returned.
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  List<int> v5buffer(
    String? namespace,
    String? name,
    List<int>? buffer, {
    Map<String, dynamic>? options,
    int offset = 0,
  }) {
    return UuidParsing.parse(v5(namespace, name, options: options), buffer: buffer, offset: offset);
  }

  /// v5obj() Generates a namespace & name-based version 5 UUID
  ///
  /// By default it will generate a string based on a provided uuid namespace and
  /// name, and will return a [UuidValue] object.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  UuidValue v5obj(String? namespace, String? name, {Map<String, dynamic>? options}) {
    return UuidValue(v5(namespace, name, options: options));
  }

  /// v6() Generates a draft time-based version 6 UUID
  ///
  /// By default it will generate a string based off current Gregorian epoch time
  /// in milliseconds, and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format#section-4.3
  String v6({Map<String, dynamic>? options}) {
    return _uuidv6.generate(options: options);
  }

  /// v6buffer() Generates a draft time-based version 1 UUID
  ///
  /// By default it will generate a string based off current Gregorian epoch time, and will
  /// in milliseconds, and will place the result into the provided [buffer].
  /// The [buffer] will also be returned.
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format#section-4.3
  List<int> v6buffer(
    List<int> buffer, {
    Map<String, dynamic>? options,
    int offset = 0,
  }) {
    return UuidParsing.parse(v6(options: options), buffer: buffer, offset: offset);
  }

  /// v6obj() Generates a draft time-based version 6 UUID
  ///
  /// By default it will generate a string based off current Gregorian Epoch time
  /// in milliseconds, and will return it as a [UuidValue] object.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format#section-4.3
  UuidValue v6obj({Map<String, dynamic>? options}) {
    return UuidValue(v6(options: options));
  }

  /// v7() Generates a draft time-based version 7 UUID
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-01.html#name-uuidv7-layout-and-bit-order
  String v7({Map<String, dynamic>? options}) {
    return _uuidv7.generate(options: options);
  }

  /// v7buffer() Generates a draft time-based version 7 UUID
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will place the result into the provided [buffer].
  /// The [buffer] will also be returned..
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-01.html#name-uuidv7-layout-and-bit-order
  List<int> v7buffer(
    List<int> buffer, {
    Map<String, dynamic>? options,
    int offset = 0,
  }) {
    return UuidParsing.parse(v7(options: options), buffer: buffer, offset: offset);
  }

  /// v7obj() Generates a draft time-based version 7 UUID
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will return it as a [UuidValue] object.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-01.html#name-uuidv7-layout-and-bit-order
  UuidValue v7obj({Map<String, dynamic>? options}) {
    return UuidValue(v7(options: options));
  }

  /// v8() Generates a draft time-based version 8 UUID
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-01.html#name-uuidv7-layout-and-bit-order
  String v8({Map<String, dynamic>? options}) {
    return _uuidv8.generate(options: options);
  }

  /// v8buffer() Generates a draft time-based version 8 UUID
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will place the result into the provided [buffer].
  /// The [buffer] will also be returned..
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-01.html#name-uuidv7-layout-and-bit-order
  List<int> v8buffer(
    List<int> buffer, {
    Map<String, dynamic>? options,
    int offset = 0,
  }) {
    return UuidParsing.parse(v8(options: options), buffer: buffer, offset: offset);
  }

  /// v8obj() Generates a draft time-based version 8 UUID
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will return it as a [UuidValue] object.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-01.html#name-uuidv7-layout-and-bit-order
  UuidValue v8obj({Map<String, dynamic>? options}) {
    return UuidValue(v8(options: options));
  }
}
