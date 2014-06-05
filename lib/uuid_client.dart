library uuid_client;

import 'src/uuid.dart';
import 'package:cipher/impl/client.dart';

class Uuid extends UuidBase {

  static const NAMESPACE_DNS = UuidBase.NAMESPACE_DNS;
  static const NAMESPACE_URL = UuidBase.NAMESPACE_URL;
  static const NAMESPACE_OID = UuidBase.NAMESPACE_OID;
  static const NAMESPACE_X500= UuidBase.NAMESPACE_X500;
  static const NAMESPACE_NIL = UuidBase.NAMESPACE_NIL;

  Uuid() : super() {
    this.initCipher(initCipher);
  }
}
