import 'dart:typed_data';

import 'parsing.dart';
import 'enums.dart';
import 'validation.dart';

class UuidValue {
  final String uuid;

  /// UuidValue() Constructor for creating a uuid value.
  ///
  /// Takes in a string representation of a [uuid] to wrap.
  ///
  /// Optionally , you can disable the validation check in the constructor
  /// by setting [validate] to `false`.
  factory UuidValue(String uuid, [bool validate = true, ValidationMode validationMode = ValidationMode.strictRFC4122]) {
    if (validate) {
      UuidValidation.isValidOrThrow(fromString: uuid, validationMode: validationMode);
    }

    return UuidValue._(uuid.toLowerCase());
  }

  factory UuidValue.fromByteList(Uint8List byteList, {int? offset}) {
    return UuidValue(UuidParsing.unparse(byteList, offset: offset ?? 0));
  }

  factory UuidValue.fromList(List<int> byteList, {int? offset}) {
    return UuidValue(UuidParsing.unparse(byteList, offset: offset ?? 0));
  }

  UuidValue._(this.uuid);

  // toBytes() converts the internal string representation to a list of bytes.
  Uint8List toBytes() {
    return UuidParsing.parseAsByteList(uuid);
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

  int get version => int.parse(String.fromCharCode(uuid.codeUnitAt(14)));
  int get time => -1;
}
