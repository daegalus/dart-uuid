import 'dart:typed_data';

import 'parsing.dart';
import 'uuid.dart';
import 'validation.dart';

class UuidValue {
  final String uuid;

  /// fromByteList() creates a UuidValue from a [Uint8List] of bytes.
  factory UuidValue.fromByteList(Uint8List byteList, {int? offset}) {
    return UuidValue(UuidParsing.unparse(byteList, offset: offset ?? 0));
  }

  /// fromList() creates a UuidValue from a [List<int>] of bytes.
  factory UuidValue.fromList(List<int> byteList, {int? offset}) {
    return UuidValue(UuidParsing.unparse(byteList, offset: offset ?? 0));
  }

  /// withValidation() creates a UuidValue from a [uuid] string.
  /// Optionally, you can provide a [validationMode] to use when validating
  /// the uuid string.
  /// Throws [FormatException] if the UUID is invalid.
  factory UuidValue.withValidation(String uuid,
      [ValidationMode validationMode = ValidationMode.strictRFC4122]) {
    final uuidValue = UuidValue(uuid.toLowerCase());
    uuidValue.validate(validationMode);
    return uuidValue;
  }

  static const dns = UuidValue(Uuid.NAMESPACE_DNS);
  static const url = UuidValue(Uuid.NAMESPACE_URL);
  static const oid = UuidValue(Uuid.NAMESPACE_OID);
  static const x500 = UuidValue(Uuid.NAMESPACE_X500);
  static const nil = UuidValue(Uuid.NAMESPACE_NIL);

  /// UuidValue() Constructor for creating a uuid value.
  ///
  /// Takes in a string representation of a [uuid] to wrap.
  const UuidValue(this.uuid);

  /// validate() validates the internal string representation of the uuid.
  /// Optionally, you can provide a [validationMode] to use when validating
  /// the uuid string.
  /// Throws [FormatException] if the UUID is invalid.
  void validate(
      [ValidationMode validationMode = ValidationMode.strictRFC4122]) {
    UuidValidation.isValidOrThrow(
        fromString: uuid, validationMode: validationMode);
  }

  // toBytes() converts the internal string representation to a list of bytes.
  Uint8List toBytes() {
    return UuidParsing.parseAsByteList(uuid, validate: false);
  }

  // toString() returns the String representation of the UUID
  @override
  String toString() {
    return uuid;
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
  int get time => -1;
}
