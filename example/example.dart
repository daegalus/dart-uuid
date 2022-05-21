import 'package:uuid/uuid.dart';
import 'package:uuid/uuid_util.dart';

void main() {
  var uuid = Uuid();

  // Generate a v1 (time-based) id
  var v1 = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

  var v1_exact = uuid.v1(options: {
    'node': [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    'clockSeq': 0x1234,
    'mSecs': DateTime.utc(2011, 11, 01).millisecondsSinceEpoch,
    'nSecs': 5678
  }); // -> '710b962e-041c-11e1-9234-0123456789ab'

  // Generate a v4 (random) id
  var v4 = uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

  // Generate a v4 (crypto-random) id
  var v4_crypto = uuid.v4(options: {'rng': UuidUtil.cryptoRNG});
  // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

  // Generate a v5 (namespace-name-sha1-based) id
  var v5 = uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com');
  // -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'

  // Generate a v6 (time-based) id
  var v6 = uuid.v6(); // -> '1ebbc608-7459-6a20-bc85-0d10b6a52acd'

  var v6_exact = uuid.v6(options: {
    'node': [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    'clockSeq': 0x1234,
    'mSecs': DateTime.utc(2011, 11, 01).millisecondsSinceEpoch,
    'nSecs': 5678,
  }); // -> '1e1041c7-10b9-662e-9234-0123456789ab'

  // Generate a v7 (time-based) id
  var v7 = uuid.v7(); // -> 060ab53c-0bb2-7482-8000-ab029e8fa2ea

  var v7_exact = uuid.v7(options: {
    'randomBytes': [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0x01, 0x23, 0x45, 0x67],
    'time': DateTime.utc(2011, 10, 9, 8, 7, 6, 543, 210).millisecondsSinceEpoch,
  }); // -> '04e91562-0884-7fea-9234-0123456789ab'

  // Generate a v8 (time-random) id
  var v8 = uuid.v8(); // -> '1e1041c7-10b9-662e-9234-0123456789ab'

  var v8_exact = uuid.v8(options: {
    'randomBytes': [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0x01, 0x23, 0x45, 0x67],
    'time': DateTime.utc(2011, 10, 9, 8, 7, 6, 543, 210),
  }); // -> '1e1041c7-10b9-662e-9234-0123456789ab'

  print('v1        | ' + v1);
  print('v1 exact  | ' + v1_exact);
  print('v4        | ' + v4);
  print('v4 crypto | ' + v4_crypto);
  print('v5        | ' + v5);
  print('v6        | ' + v6);
  print('v6 exact  | ' + v6_exact);
  print('v7        | ' + v7);
  print('v7 exact  | ' + v7_exact);
  print('v8        | ' + v8);
  print('v8 exact  | ' + v8_exact);
}
