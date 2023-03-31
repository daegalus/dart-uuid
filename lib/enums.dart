// ignore_for_file: constant_identifier_names

class Namespace {
  // RFC4122 provided namespaces for v3 and v5 namespace based UUIDs
  static const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  static const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
  static const OID = '6ba7b812-9dad-11d1-80b4-00c04fd430c8';
  static const X500 = '6ba7b814-9dad-11d1-80b4-00c04fd430c8';
  static const NIL = '00000000-0000-0000-0000-000000000000';
}

/// The options for UUID Validation strictness
enum ValidationMode { nonStrict, strictRFC4122 }
