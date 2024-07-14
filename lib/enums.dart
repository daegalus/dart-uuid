// ignore_for_file: constant_identifier_names

import 'package:uuid/uuid_value.dart';

/// The options for UUID Validation strictness
enum ValidationMode { nonStrict, strictRFC4122 }

enum Namespace {
  // RFC4122 provided namespaces for v3 and v5 namespace based UUIDs
  DNS("6ba7b810-9dad-11d1-80b4-00c04fd430c8"),
  URL("6ba7b811-9dad-11d1-80b4-00c04fd430c8"),
  OID("6ba7b812-9dad-11d1-80b4-00c04fd430c8"),
  X500("6ba7b814-9dad-11d1-80b4-00c04fd430c8"),
  NIL("00000000-0000-0000-0000-000000000000");

  const Namespace(this.value);
  final String value;

  UuidValue get uuidValue => UuidValue.raw(value);
}
