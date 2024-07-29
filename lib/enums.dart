// ignore_for_file: constant_identifier_names

import 'package:uuid/uuid.dart';

/// The options for UUID Validation strictness
enum ValidationMode { nonStrict, strictRFC4122 }

/// RFC4122 & RFC9562 provided namespaces for v3, v5, and v8 namespace based UUIDs
enum Namespace {
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  DNS("6ba7b810-9dad-11d1-80b4-00c04fd430c8"),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  URL("6ba7b811-9dad-11d1-80b4-00c04fd430c8"),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  OID("6ba7b812-9dad-11d1-80b4-00c04fd430c8"),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  X500("6ba7b814-9dad-11d1-80b4-00c04fd430c8"),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  NIL("00000000-0000-0000-0000-000000000000"),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  MAX("ffffffff-ffff-ffff-ffff-ffffffffffff"),
  dns("6ba7b810-9dad-11d1-80b4-00c04fd430c8"),
  url("6ba7b811-9dad-11d1-80b4-00c04fd430c8"),
  oid("6ba7b812-9dad-11d1-80b4-00c04fd430c8"),
  x500("6ba7b814-9dad-11d1-80b4-00c04fd430c8"),
  nil("00000000-0000-0000-0000-000000000000"),
  max("ffffffff-ffff-ffff-ffff-ffffffffffff");

  const Namespace(this.value);
  final String value;

  UuidValue get uuidValue => UuidValue.raw(value);
  List<int> get bytes => Uuid.parse(value, validate: false);
}
