library uuid_util;

import 'dart:math';

class UuidUtil {
  /// Math.Random()-based RNG. All platforms, fast, not cryptographically strong. Optional Seed passable.
  static List<int> mathRNG({int seed = -1}) {
    var rand, b = List<int>(16);

    var _rand = (seed == -1) ? Random() : Random(seed);
    for (var i = 0; i < 16; i++) {
      if ((i & 0x03) == 0) {
        rand = (_rand.nextDouble() * 0x100000000).floor().toInt();
      }
      b[i] = rand >> ((i & 0x03) << 3) & 0xff;
    }

    return b;
  }

  /// Crypto-Strong RNG. All platforms, unknown speed, cryptographically strong (theoretically)
  static List<int> cryptoRNG() {
    var b = List<int>(16);
    var rand = Random.secure();
    for (var i = 0; i < 16; i++) {
      b[i] = rand.nextInt(1 << 8);
    }
    return b;
  }
}
