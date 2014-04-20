library Uuid;
import 'dart:math' as Math;
import 'package:crypto/crypto.dart';
import 'package:cipher/cipher.dart';
import 'package:cipher/impl/client.dart';
import 'dart:typed_data';
import 'uuid.dart';

class Uuid extends UuidBase {

  // RFC4122 provided namespaces for v3 and v5 namespace based UUIDs
  static const NAMESPACE_DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  static const NAMESPACE_URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
  static const NAMESPACE_OID = '6ba7b812-9dad-11d1-80b4-00c04fd430c8';
  static const NAMESPACE_X500= '6ba7b814-9dad-11d1-80b4-00c04fd430c8';
  static const NAMESPACE_NIL = '00000000-0000-0000-0000-000000000000';

  Uuid() : super() {
    this.initCipher(initCipher);
  }
}
