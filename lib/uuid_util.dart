library uuid_util;

import 'dart:math';
import 'dart:typed_data';

class UuidUtil {
  /// Math.Random()-based RNG. All platforms, fast, not cryptographically strong. Optional Seed passable.
  static Uint8List mathRNG({int seed = -1}) {
    int rand;
    final Uint8List b = Uint8List(16);

    final Random _rand = (seed == -1) ? Random() : Random(seed);
    for (int i = 0; i < 16; i++) {
      if ((i & 0x03) == 0) {
        rand = (_rand.nextDouble() * 0x100000000).floor().toInt();
      }
      b[i] = rand >> ((i & 0x03) << 3) & 0xff;
    }

    return b;
  }

  /// Crypto-Strong RNG. All platforms, unknown speed, cryptographically strong (theoretically)
  static Uint8List cryptoRNG() {
    final Uint8List b = Uint8List(16);
    final Random rand = Random.secure();
    for (int i = 0; i < 16; i++) {
      b[i] = rand.nextInt(1 << 8);
    }
    return b;
  }
}
