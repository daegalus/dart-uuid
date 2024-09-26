// ignore_for_file: constant_identifier_names

import 'package:uuid/constants.dart';
import 'package:uuid/uuid.dart';

/// The options for UUID Validation strictness
enum ValidationMode { nonStrict, strictRFC4122 }

/// RFC4122 & RFC9562 provided namespaces for v3, v5, and v8 namespace based UUIDs
enum Namespace {
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  DNS(value: InternalConstants.zDNS),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  URL(value: InternalConstants.zURL),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  OID(value: InternalConstants.zOID),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  X500(value: InternalConstants.zX500),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  NIL(value: InternalConstants.zNIL),
  @Deprecated(
      "Please use the lowercase variant to follow Dart style guidelines.")
  MAX(value: InternalConstants.zMAX),
  dns(value: InternalConstants.zDNS),
  url(value: InternalConstants.zURL),
  oid(value: InternalConstants.zOID),
  x500(value: InternalConstants.zX500),
  nil(value: InternalConstants.zNIL),
  max(value: InternalConstants.zMAX);

  const Namespace({required this.value});

  final String value;

  UuidValue get uuidValue => value == InternalConstants.zNIL
      ? const UuidValue.raw(InternalConstants.zNIL)
      : value == InternalConstants.zDNS
          ? const UuidValue.raw(InternalConstants.zDNS)
          : value == InternalConstants.zURL
              ? const UuidValue.raw(InternalConstants.zURL)
              : value == InternalConstants.zOID
                  ? const UuidValue.raw(InternalConstants.zOID)
                  : value == InternalConstants.zX500
                      ? const UuidValue.raw(InternalConstants.zX500)
                      : value == InternalConstants.zMAX
                          ? const UuidValue.raw(InternalConstants.zMAX)
                          : const UuidValue.raw(InternalConstants.zNIL);

  List<int> get bytes => Uuid.parse(value, validate: false);
}
