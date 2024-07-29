import 'package:uuid/data.dart';
import 'package:uuid/uuid.dart';
import 'package:uuid/rng.dart';

void main() {
  var uuid = Uuid();

  // Generate a v1 (time-based) id
  var v1 = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

  var v1Exact = uuid.v1(
      config: V1Options(
          0x1234,
          DateTime.utc(2011, 11, 01).millisecondsSinceEpoch,
          5678,
          [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
          null)); // -> '710b962e-041c-11e1-9234-0123456789ab'

  // Generate a v4 (random) id
  var v4 = uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

  // Generate a v4 (crypto-random) id
  var v4Crypto = uuid.v4(config: V4Options(null, CryptoRNG()));
  // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

  // Generate a v5 (namespace-name-sha1-based) id
  var v5 = uuid.v5(Namespace.url.value, 'www.google.com');
  // -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'

  // Generate a v6 (time-based) id
  var v6 = uuid.v6(); // -> '1ebbc608-7459-6a20-bc85-0d10b6a52acd'

  var v6Exact = uuid.v6(
      config: V6Options(
          0x1234,
          DateTime.utc(2011, 11, 01).millisecondsSinceEpoch,
          5678,
          [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
          null)); // -> '1e1041c7-10b9-662e-9234-0123456789ab'

  // Generate a v7 (time-based) id
  var v7 = uuid.v7(); // -> 060ab53c-0bb2-7482-8000-ab029e8fa2ea

  var v7Exact = uuid.v7(
      config: V7Options(
          DateTime.utc(2011, 10, 9, 8, 7, 6, 543, 210).millisecondsSinceEpoch, [
    0x01,
    0x23,
    0x45,
    0x67,
    0x89,
    0xab,
    0x01,
    0x23,
    0x45,
    0x67
  ])); // -> '04e91562-0884-7fea-9234-0123456789ab'

  // Generate a v8 (time-random) id
  var v8 = uuid.v8(); // -> '1e1041c7-10b9-662e-9234-0123456789ab'

  var v8Exact = uuid.v8(
      config: V8Options(DateTime.utc(2011, 10, 9, 8, 7, 6, 543, 210), [
    0x01,
    0x23,
    0x45,
    0x67,
    0x89,
    0xab,
    0x01,
    0x23,
    0x45,
    0x67
  ])); // -> '1e1041c7-10b9-662e-9234-0123456789ab'

  print('v1        | $v1');
  print('v1 exact  | $v1Exact');
  print('v4        | $v4');
  print('v4 crypto | $v4Crypto');
  print('v5        | $v5');
  print('v6        | $v6');
  print('v6 exact  | $v6Exact');
  print('v7        | $v7');
  print('v7 exact  | $v7Exact');
  print('v8        | $v8');
  print('v8 exact  | $v8Exact');
}
