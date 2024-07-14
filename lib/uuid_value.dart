import 'dart:typed_data';

import 'package:meta/meta.dart';

import 'parsing.dart';
import 'uuid.dart';
import 'validation.dart';

@experimental
class UuidValue {
  final String uuid;

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
  int get time => -1;
}
