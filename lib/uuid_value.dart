library uuid;

import 'package:uuid/uuid.dart';

class UuidValue {
  final String uuid;

  UuidValue(this.uuid) {
    Uuid.isValidUUID(uuid);
  }

  // toBytes() converts the internal string representation to a list of bytes.
  List<int> toBytes() {
    return Uuid.parse(uuid);
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
}
