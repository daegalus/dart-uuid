/// Generates UUID v1, v4, v5, v6, v7, v8 following RFC4122 standard.
// ignore_for_file: constant_identifier_names
// ignore_for_file: deprecated_member_use_from_same_package
// TODO: Remove this ignore when we remove the deprecated options.

library;

import 'dart:typed_data';

import 'package:uuid/data.dart';
import 'package:uuid/rng.dart';
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
import 'v8generic.dart';

export 'uuid_value.dart';
export 'enums.dart';

/// uuid for Dart
/// Author: Yulian Kuncheff
/// Released under MIT License.

class Uuid {
  final GlobalOptions? goptions;

  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const NAMESPACE_DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const NAMESPACE_URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const NAMESPACE_OID = '6ba7b812-9dad-11d1-80b4-00c04fd430c8';
  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const NAMESPACE_X500 = '6ba7b814-9dad-11d1-80b4-00c04fd430c8';
  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const NAMESPACE_NIL = '00000000-0000-0000-0000-000000000000';

  /// Creates a new instance of the Uuid class.
  /// Optionally you can pass in a [GlobalOptions] object to set global options
  /// for all UUID generation.
  /// [GlobalOptions.rng] is a [RNG] class that returns a list of random bytes.
  ///
  /// Defaults rng function is `UuidUtil.cryptoRNG`
  ///
  /// Example: Using MathRNG globally
  ///
  /// ```dart
  /// var uuid = Uuid(options: {
  ///   'grng': UuidUtil.mathRNG
  /// })
  ///
  /// // Generate a v4 (random) id that will use cryptRNG for its rng function
  /// uuid.v4();
  /// ```
  const Uuid({this.goptions});

  /// Parses the provided [uuid] into a list of byte values as a List<int>.
  /// Can optionally be provided a [buffer] to write into and
  ///  a positional [offset] for where to start inputting into the buffer.
  /// Throws FormatException if the UUID is invalid. Optionally you can set
  /// [validate] to false to disable validation of the UUID before parsing.
  ///
  /// Example parsing a UUID string
  ///
  /// ```dart
  /// var bytes = uuid.parse('797ff043-11eb-11e1-80d6-510998755d10');
  /// // bytes-> [121, 127, 240, 67, 17, 235, 17, 225, 128, 214, 81, 9, 152, 117, 93, 16]
  /// ```
  static List<int> parse(
    String uuid, {
    List<int>? buffer,
    int offset = 0,
    bool validate = true,
    ValidationMode validationMode = ValidationMode.strictRFC4122,
  }) {
    return UuidParsing.parse(uuid,
        buffer: buffer,
        offset: offset,
        validate: validate,
        validationMode: validationMode);
  }

  /// Parses the provided [uuid] into a list of byte values as a Uint8List.
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
        buffer: buffer,
        offset: offset,
        validate: validate,
        validationMode: validationMode);
  }

  /// Unparses a [buffer] of bytes and outputs a proper UUID string.
  /// An optional [offset] is allowed if you want to start at a different point
  /// in the buffer.
  /// Throws an exception if the buffer does not have a length of 16
  ///
  /// Example parsing and unparsing a UUID string
  ///
  /// ```dart
  /// var uuidString = uuid.unparse(bytes);
  /// // uuidString -> '797ff043-11eb-11e1-80d6-510998755d10'
  /// ```
  static String unparse(List<int> buffer, {int offset = 0}) {
    return UuidParsing.unparse(buffer, offset: offset);
  }

  /// Validates the provided [uuid] to make sure it has all the necessary
  /// components and formatting and returns a [bool]
  /// You can choose to validate from a string or from a byte list based on
  /// which parameter is passed.
  static bool isValidUUID(
      {String fromString = '',
      Uint8List? fromByteList,
      ValidationMode validationMode = ValidationMode.strictRFC4122,
      bool noDashes = false}) {
    return UuidValidation.isValidUUID(
        fromString: fromString,
        fromByteList: fromByteList,
        validationMode: validationMode,
        noDashes: noDashes);
  }

  /// Generates a time-based version 1 UUID
  ///
  /// By default it will generate a string based off current time, and will
  /// return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second argument is a [V1Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.2.2
  ///
  /// Example: Generate string UUID with fully-specified options
  /// ```dart
  /// uuid.v1(options: {
  ///     'node': [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  ///     'clockSeq': 0x1234,
  ///     'mSecs': new DateTime.utc(2011,11,01).millisecondsSinceEpoch,
  ///     'nSecs': 5678
  /// })   // -> "710b962e-041c-11e1-9234-0123456789ab"
  /// ```
  String v1(
      {@Deprecated('use config instead. Removal in 5.0.0')
      Map<String, dynamic>? options,
      V1Options? config}) {
    if (options != null && options.isNotEmpty) {
      config = V1Options(options["clockSeq"], options["mSecs"],
          options["nSecs"], options["node"], options["seedBytes"]);
    }
    return UuidV1(goptions: goptions).generate(options: config);
  }

  /// Generates a time-based version 1 UUID into a provided buffer
  ///
  /// By default it will generate a string based off current time, and will
  /// place the result into the provided [buffer]. The [buffer] will also be returned..
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first optional argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second optional argument is a [V1Options] object that takes the same
  /// options as the options map. This is the preferred way to pass options.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.2.2
  ///
  /// Example: In-place generation of two binary IDs
  /// ```dart
  /// // Generate two ids in an array
  /// var myBuffer = new List(32); // -> []
  /// uuid.v1buffer(myBuffer);
  /// // -> [115, 189, 5, 128, 201, 91, 17, 225, 146, 52, 109, 0, 9, 0, 52, 128, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  /// uuid.v1buffer(myBuffer, offset: 16);
  /// // -> [115, 189, 5, 128, 201, 91, 17, 225, 146, 52, 109, 0, 9, 0, 52, 128, 115, 189, 5, 129, 201, 91, 17, 225, 146, 52, 109, 0, 9, 0, 52, 128]
  ///
  /// // Optionally use uuid.unparse() to get stringify the ids
  /// uuid.unparse(myBuffer);    // -> '73bd0580-c95b-11e1-9234-6d0009003480'
  /// uuid.unparse(myBuffer, offset: 16) // -> '73bd0581-c95b-11e1-9234-6d0009003480'
  /// ```
  List<int> v1buffer(
    List<int> buffer, {
    @Deprecated('use config instead. Removal in 5.0.0')
    Map<String, dynamic>? options,
    V1Options? config,
    int offset = 0,
  }) {
    var result = options != null ? v1(options: options) : v1(config: config);
    return UuidParsing.parse(result, buffer: buffer, offset: offset);
  }

  /// Generates a time-based version 1 UUID as a [UuidValue] object
  ///
  /// By default it will generate a string based off current time, and will
  /// return it as a [UuidValue] object.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second argument is a [V1Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.2.2
  ///
  /// Example: UuidValue usage
  /// ```dart
  /// uuidValue = uuid.v1Obj(options: {
  ///     'node': [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  ///     'clockSeq': 0x1234,
  ///     'mSecs': new DateTime.utc(2011,11,01).millisecondsSinceEpoch,
  ///     'nSecs': 5678
  /// }) // -> UuidValue{uuid: '710b962e-041c-11e1-9234-0123456789ab'}
  ///
  /// print(uuidValue) -> // -> '710b962e-041c-11e1-9234-0123456789ab'
  /// uuidValue.toBytes() -> // -> [...]
  /// ```
  UuidValue v1obj(
      {@Deprecated('use config instead. Removal in 5.0.0')
      Map<String, dynamic>? options,
      V1Options? config}) {
    return options != null
        ? UuidValue.fromString(v1(options: options))
        : UuidValue.fromString(v1(config: config));
  }

  /// Generates a RNG version 4 UUID
  ///
  /// By default it will generate a string based cryptoRNG, and will return
  /// a string. If you wish to use crypto-strong RNG, pass in UuidUtil.cryptoRNG
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second argument is a [V4Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  ///
  /// Example: Generate string UUID with different RNG method
  ///
  /// ```dart
  /// import 'package:uuid/uuid_util.dart';
  /// uuid.v4(options: {
  ///   'rng': UuidUtil.cryptoRNG
  /// });
  /// // -> "109156be-c4fb-41ea-b1b4-efe1671c5836"
  /// ```
  ///
  /// Example: Generate string UUID with different RNG method and named parameters
  ///
  /// ```dart
  /// import 'package:uuid/uuid_util.dart';
  /// uuid.v4(options: {
  ///   'rng': UuidUtil.mathRNG,
  ///   'namedArgs': new Map.fromIterables([const Symbol('seed')],[1])
  /// });
  /// // -> "09a91894-e93f-4141-a3ec-82eb32f2a3ef"
  /// ```
  ///
  /// Example: Generate string UUID with different RNG method and positional parameters
  ///
  /// ```dart
  /// import 'package:uuid/uuid_util.dart';
  /// uuid.v4(options: {
  ///   'rng': UuidUtil.cryptoRNG,
  ///   'positionalArgs': [1]
  /// });
  /// // -> "09a91894-e93f-4141-a3ec-82eb32f2a3ef"
  /// ```
  ///
  /// Example: Generate string UUID with fully-specified options
  ///
  /// ```dart
  /// uuid.v4(options: {
  ///   'random': [
  ///     0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
  ///     0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
  ///   ]
  /// });
  /// // -> "109156be-c4fb-41ea-b1b4-efe1671c5836"
  /// ```
  String v4(
      {@Deprecated('use config instead. Removal in 5.0.0')
      Map<String, dynamic>? options,
      V4Options? config}) {
    if (options != null && options.isNotEmpty) {
      var rng = options["rng"];
      if (options["rng"] != null && options["rng"] is! RNG) {
        rng = LegacyRNG(
            options["rng"], options["namedArgs"], options["positionalArgs"]);
      }
      config = V4Options(options["random"], rng);
    }
    return UuidV4(goptions: goptions).generate(options: config);
  }

  /// Generates a RNG version 4 UUID into a provided buffer
  ///
  /// By default it will generate a string based off cryptoRNG, and will
  /// place the result into the provided [buffer]. The [buffer] will also be returned.
  /// If you wish to have crypto-strong RNG, pass in UuidUtil.cryptoRNG.
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first optional argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second optional argument is a [V4Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  ///
  /// Example: Generate two IDs in a single buffer
  ///
  /// ```dart
  /// var myBuffer = new List(32);
  /// uuid.v4buffer(myBuffer);
  /// uuid.v4buffer(myBuffer, offset: 16);
  /// ```
  List<int> v4buffer(
    List<int> buffer, {
    @Deprecated('use config instead. Removal in 5.0.0')
    Map<String, dynamic>? options,
    V4Options? config,
    int offset = 0,
  }) {
    var result = options != null ? v4(options: options) : v4(config: config);
    return UuidParsing.parse(result, buffer: buffer, offset: offset);
  }

  /// Generates a RNG version 4 UUID as a [UuidValue] object
  ///
  /// By default it will generate a string based cryptoRNG, and will return
  /// a [UuidValue] object. If you wish to use crypto-strong RNG, pass in UuidUtil.cryptoRNG
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second argument is a [V4Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  ///
  /// Example: UuidValue usage
  ///
  /// ```dart
  /// uuidValue = uuid.v4obj(options: {
  ///   'random': [
  ///     0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
  ///     0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
  ///   ]
  /// }) // -> UuidValue{uuid: '109156be-c4fb-41ea-b1b4-efe1671c5836'}
  ///
  /// print(uuidValue) -> // -> '109156be-c4fb-41ea-b1b4-efe1671c5836'
  /// uuidValue.toBytes() -> // -> [...]
  /// ```
  UuidValue v4obj(
      {@Deprecated('use config instead. Removal in 5.0.0')
      Map<String, dynamic>? options,
      V4Options? config}) {
    return options != null
        ? UuidValue.fromString(v4(options: options))
        : UuidValue.fromString(v4(config: config));
  }

  /// Generates a namespace & name-based version 5 UUID
  ///
  /// By default it will generate a string based on a provided uuid namespace and
  /// name, and will return a string.
  ///
  /// The first optional argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second optional argument is a [V5Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  ///
  /// Example: Generate string UUID with fully-specified options
  ///
  /// ```dart
  /// uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com');
  /// // -> "c74a196f-f19d-5ea9-bffd-a2742432fc9c"
  /// ```
  String v5(String? namespace, String? name,
      {@Deprecated('use config instead. Removal in 5.0.0')
      Map<String, dynamic>? options,
      V5Options? config}) {
    if (options != null && options.isNotEmpty) {
      V4Options? v4config;
      config = V5Options(options["randomNamespace"], v4config);
    }
    return UuidV5(goptions: goptions)
        .generate(namespace, name, options: config);
  }

  /// Generates a namespace & name-based version 5 UUID into a provided buffer
  ///
  /// By default it will generate a string based on a provided uuid namespace and
  /// place the result into the provided [buffer]. The [buffer] will also be returned.
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first optional argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second optional argument is a [V5Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  ///
  /// Example: Generate two IDs in a single buffer
  ///
  /// ```dart
  /// var myBuffer = new List(32);
  /// uuid.v5buffer(Uuid.NAMESPACE_URL, 'www.google.com', myBuffer);
  /// uuid.v5buffer(Uuid.NAMESPACE_URL, 'www.google.com', myBuffer, offset: 16);
  /// ```
  List<int> v5buffer(
    String? namespace,
    String? name,
    List<int>? buffer, {
    @Deprecated('use config instead. Removal in 5.0.0')
    Map<String, dynamic>? options,
    V5Options? config,
    int offset = 0,
  }) {
    var result = options != null
        ? v5(namespace, name, options: options)
        : v5(namespace, name, config: config);
    return UuidParsing.parse(result, buffer: buffer, offset: offset);
  }

  /// Generates a namespace & name-based version 5 UUID as a [UuidValue] object
  ///
  /// By default it will generate a string based on a provided uuid namespace and
  /// name, and will return a [UuidValue] object.
  ///
  /// The first optional argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second optional argument is a [V5Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  ///
  /// Example: UuidValue usage
  /// ```dart
  /// uuidValue = uuid.v5obj(Uuid.NAMESPACE_URL, 'www.google.com');
  /// // -> UuidValue(uuid: "c74a196f-f19d-5ea9-bffd-a2742432fc9c")
  ///
  /// print(uuidValue) -> // -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'
  /// uuidValue.toBytes() -> // -> [...]
  /// ```
  UuidValue v5obj(String? namespace, String? name,
      {@Deprecated('use config instead. Removal in 5.0.0')
      Map<String, dynamic>? options,
      V5Options? config}) {
    return options != null
        ? UuidValue.fromString(v5(namespace, name, options: options))
        : UuidValue.fromString(v5(namespace, name, config: config));
  }

  /// Generates a draft time-based version 6 UUID
  ///
  /// By default it will generate a string based off current Gregorian epoch time
  /// in milliseconds, and will return a string.
  ///
  /// The first argument is a [V6Options] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-6
  String v6({V6Options? config}) {
    return UuidV6(goptions: goptions).generate(options: config);
  }

  /// Generates a draft time-based version 1 UUID into a provided buffer
  ///
  /// By default it will generate a string based off current Gregorian epoch time, and will
  /// in milliseconds, and will place the result into the provided [buffer].
  /// The [buffer] will also be returned.
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first optional argument is an options map that takes various configuration
  /// options detailed in the readme. This is going to be eventually deprecated.
  ///
  /// The second optional argument is a [V6Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-6
  List<int> v6buffer(
    List<int> buffer, {
    V6Options? config,
    int offset = 0,
  }) {
    return UuidParsing.parse(v6(config: config),
        buffer: buffer, offset: offset);
  }

  /// Generates a draft time-based version 6 UUID as a [UuidValue] object
  ///
  /// By default it will generate a string based off current Gregorian Epoch time
  /// in milliseconds, and will return it as a [UuidValue] object.
  ///
  /// The first argument is a [V6Options] object that takes the same options as
  /// the options map. This is the preferred way to pass options.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-6
  UuidValue v6obj({V6Options? config}) {
    return UuidValue.fromString(v6(config: config));
  }

  /// Generates a draft time-based version 7 UUID as a [UuidValue] object
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will return a string.
  ///
  /// The first argument is a [V7Options] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-7
  String v7({V7Options? config}) {
    return UuidV7(goptions: goptions).generate(options: config);
  }

  /// Generates a draft time-based version 7 UUID into a provided buffer
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will place the result into the provided [buffer].
  /// The [buffer] will also be returned..
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first optional argument is a [V7Options] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-7
  List<int> v7buffer(
    List<int> buffer, {
    V7Options? config,
    int offset = 0,
  }) {
    return UuidParsing.parse(v7(config: config),
        buffer: buffer, offset: offset);
  }

  /// Generates a draft time-based version 7 UUID as a [UuidValue] object
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will return it as a [UuidValue] object.
  ///
  /// The first argument is a [V7Options] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-7
  UuidValue v7obj({V7Options? config}) {
    return UuidValue.fromString(v7(config: config));
  }

  /// Generates a draft time-based version 8 UUID
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will return a string.
  ///
  /// The first argument is a [V8Options] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-8
  String v8({V8Options? config}) {
    return UuidV8(goptions: goptions).generate(options: config);
  }

  /// Generates a draft time-based version 8 UUID into a provided buffer
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will place the result into the provided [buffer].
  /// The [buffer] will also be returned..
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first optional argument is a [V8Options] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-8
  List<int> v8buffer(
    List<int> buffer, {
    V8Options? config,
    int offset = 0,
  }) {
    return UuidParsing.parse(v8(config: config),
        buffer: buffer, offset: offset);
  }

  /// Generates a draft time-based version 8 UUID as a [UuidValue] object
  ///
  /// By default it will generate a string based off current Unix epoch time in
  /// milliseconds, and will return it as a [UuidValue] object.
  ///
  /// The first argument is a [V8Options] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-8
  UuidValue v8obj({V8Options? config}) {
    return UuidValue.fromString(v8(config: config));
  }

  /// Generates a draft time-based version 8 UUID
  ///
  /// Takes in 128 bits (16 bytes) of custom data, and produces a valid V8 uuid.
  /// Bits 48-51 and bits 64-65 will be modified to create a valid uuid.
  ///
  /// The first argument is a [V8GenericOptions] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-8
  String v8g({V8GenericOptions? config}) {
    return UuidV8Generic(goptions: goptions).generate(options: config);
  }

  /// Generates a draft time-based version 8 UUID into a provided buffer
  ///
  /// Takes in 128 bits (16 bytes) of custom data, and produces a valid V8 uuid.
  /// Bits 48-51 and bits 64-65 will be modified to create a valid uuid.
  /// It will place the result into the provided [buffer].
  ///
  /// The [buffer] will also be returned..
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first optional argument is a [V8GenericOptions] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-8
  List<int> v8gbuffer(
    List<int> buffer, {
    V8GenericOptions? config,
    int offset = 0,
  }) {
    return UuidParsing.parse(v8g(config: config),
        buffer: buffer, offset: offset);
  }

  /// Generates a draft time-based version 8 UUID as a [UuidValue] object
  ///
  /// Takes in 128 bits (16 bytes) of custom data, and produces a valid V8 uuid.
  /// Bits 48-51 and bits 64-65 will be modified to create a valid uuid.
  /// It will return it as a [UuidValue] object.
  ///
  /// The first argument is a [V8GenericOptions] object that takes the same options as
  /// the options map.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-8
  UuidValue v8gobj({V8GenericOptions? config}) {
    return UuidValue.fromString(v8g(config: config));
  }
}
