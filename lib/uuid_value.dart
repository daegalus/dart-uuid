import 'dart:typed_data';

import 'package:meta/meta.dart';
import 'package:uuid/constants.dart';

import 'parsing.dart';
import 'uuid.dart';
import 'validation.dart';

@experimental
class UuidValue {
  final String uuid;

  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const dns = UuidValue.raw(Uuid.NAMESPACE_DNS);
  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const url = UuidValue.raw(Uuid.NAMESPACE_URL);
  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const oid = UuidValue.raw(Uuid.NAMESPACE_OID);
  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const x500 = UuidValue.raw(Uuid.NAMESPACE_X500);
  @Deprecated('Please use the Namespace enum in enums.dart instead.')
  static const nil = UuidValue.raw(Uuid.NAMESPACE_NIL);

  /// fromString() creates a UuidValue from a [String] with no validation.
  factory UuidValue.fromString(String uuid) {
    return UuidValue.raw(uuid.toLowerCase());
  }

  /// fromByteList() creates a UuidValue from a [Uint8List] of bytes.
  factory UuidValue.fromByteList(Uint8List byteList, {int? offset}) {
    return UuidValue.raw(UuidParsing.unparse(byteList, offset: offset ?? 0));
  }

  /// fromList() creates a UuidValue from a [List<int>] of bytes.
  factory UuidValue.fromList(List<int> byteList, {int? offset}) {
    return UuidValue.raw(UuidParsing.unparse(byteList, offset: offset ?? 0));
  }

  /// fromNamespace() creates a UuidValue from a [Namespace] enum.
  const UuidValue.fromNamespace(Namespace ns)
      : uuid = ns == Namespace.nil
            ? InternalConstants.zNIL
            : ns == Namespace.dns
                ? InternalConstants.zDNS
                : ns == Namespace.url
                    ? InternalConstants.zURL
                    : ns == Namespace.oid
                        ? InternalConstants.zOID
                        : ns == Namespace.x500
                            ? InternalConstants.zX500
                            : ns == Namespace.max
                                ? InternalConstants.zMAX
                                : InternalConstants.zNIL;

  /// withValidation() creates a UuidValue from a [uuid] string.
  /// Optionally, you can provide a [validationMode] to use when validating
  /// the uuid string.
  /// Throws [FormatException] if the UUID is invalid.
  factory UuidValue.withValidation(String uuid,
      [ValidationMode validationMode = ValidationMode.strictRFC4122,
      bool noDashes = false]) {
    final uuidValue = UuidValue.fromString(uuid);
    uuidValue.validate(validationMode, noDashes);
    return uuidValue;
  }

  /// Creates a UuidValue by taking directly the internal string representation of the [uuid],
  /// which is expected to be lowercase.
  ///
  /// You can use [UuidValue.fromString] instead, which will lowercase the uuid string for you or
  /// [UuidValue.withValidation] if you need validation of the created UUIDs.
  const UuidValue.raw(this.uuid);

  /// Takes in a string representation of a [uuid] to wrap.
  @Deprecated(
    'Use UuidValue.fromString() instead. If you need to define a const UuidValue '
    'you can use UuidValue.raw(), but making sure the value is lowercase.',
  )
  const UuidValue(this.uuid);

  /// validate() validates the internal string representation of the uuid.
  /// Optionally, you can provide a [validationMode] to use when validating
  /// the uuid string.
  /// Throws [FormatException] if the UUID is invalid.
  void validate(
      [ValidationMode validationMode = ValidationMode.strictRFC4122,
      bool noDashes = false]) {
    UuidValidation.isValidOrThrow(
        fromString: uuid, validationMode: validationMode, noDashes: noDashes);
  }

  // toBytes() converts the internal string representation to a list of bytes.
  Uint8List toBytes({bool validate = false}) {
    return UuidParsing.parseAsByteList(uuid, validate: validate);
  }

  // toString() returns the String representation of the UUID, without reformatting it.
  @override
  String toString() {
    return uuid;
  }

  String toFormattedString({bool validate = false}) {
    return UuidParsing.unparse(UuidParsing.parse(uuid,
        validate: validate, noDashes: !uuid.contains('-')));
  }

  // equals() compares to UuidValue objects' uuids.
  bool equals(UuidValue other) {
    return uuid == other.uuid;
  }

  @override
  bool operator ==(Object other) => other is UuidValue && uuid == other.uuid;

  @override
  int get hashCode => uuid.hashCode;

  // version gets the version of the UUID
  int get version => int.parse(String.fromCharCode(uuid.codeUnitAt(14)));

  // Unimplemented
  int get time => -1;

  // isV1() checks if the UUID is a version 1 UUID.
  bool get isV1 => version == 1;

  // isV4() checks if the UUID is a version 2 UUID.
  bool get isV4 => version == 4;

  // isV5() checks if the UUID is a version 5 UUID.
  bool get isV5 => version == 5;

  // isV6() checks if the UUID is a version 6 UUID.
  bool get isV6 => version == 6;

  // isV7() checks if the UUID is a version 7 UUID.
  bool get isV7 => version == 7;

  // isV8() checks if the UUID is a version 8 UUID.
  bool get isV8 => version == 8;

  // isNil() checks if the UUID is a nil UUID (00000000-0000-0000-0000-000000000000).
  bool get isNil => uuid == Namespace.nil.value;

  // isMAX() checks if the UUID is a MAX UUID (ffffffff-ffff-ffff-ffff-ffffffffffff).
}
