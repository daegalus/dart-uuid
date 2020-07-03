library uuid_util;

import 'dart:math';

class UuidUtil {
  /// Math.Random()-based RNG. All platforms, fast, not cryptographically strong. Optional Seed passable.
  static List<int> mathRNG({int seed = -1}) {
    var b = List<int>(16);

    var rand = (seed == -1) ? Random() : Random(seed);
    for (var i = 0; i < 16; i++) {
      b[i] = rand.nextInt(256);
    }

    (seed == -1) ? b.shuffle() : b.shuffle(Random(seed));

    return b;
  }

  /// Crypto-Strong RNG. All platforms, unknown speed, cryptographically strong (theoretically)
  static List<int> cryptoRNG() {
    var b = List<int>(16);
    var rand = Random.secure();
    for (var i = 0; i < 16; i++) {
      b[i] = rand.nextInt(256);
    }
    return b;
  }
}
