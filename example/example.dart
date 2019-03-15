import 'package:uuid_enhanced/uuid.dart';
import 'package:uuid_enhanced/uuid_util.dart';

void main() {
  final Uuid uuid = Uuid();

  // Generate a v1 (time-based) id
  uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

  // Generate a v4 (random) id
  uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

  // Generate a v4 (crypto-random) id
  uuid.v4(options: <String, dynamic>{'rng': UuidUtil.cryptoRNG});
  // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

  // Generate a v5 (namespace-name-sha1-based) id
  uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com');
  // -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'
}
