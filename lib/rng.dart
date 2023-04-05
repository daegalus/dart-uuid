import 'dart:math';
import 'dart:typed_data';

// ignore: one_member_abstracts
abstract class RNG {
  Uint8List generate();
}

/// Math.Random()-based RNG. All platforms, fast, not cryptographically
/// strong. Optional [seed] can be passed on creation.
class MathRNG implements RNG {
  static final _random = Random();
  final int seed;

  const MathRNG({this.seed = -1});

  @override
  Uint8List generate() {
    final b = Uint8List(16);
    final rand = (seed == -1) ? _random : Random(seed);

    for (var i = 0; i < 16; i++) {
      b[i] = rand.nextInt(256);
    }

    return b;
  }
}

/// Crypto-Strong RNG. All platforms, unknown speed, cryptographically strong
/// (theoretically)
class CryptoRNG implements RNG {
  static final _secureRandom = Random.secure();

  @override
  Uint8List generate() {
    final b = Uint8List(16);

    for (var i = 0; i < 16; i++) {
      b[i] = _secureRandom.nextInt(256);
    }

    return b;
  }
}

class LegacyRNG implements RNG {
  final Function _rng;
  final Map<Symbol, dynamic> _namedArgs;
  final List<dynamic> _positionalArgs;

  const LegacyRNG(this._rng, this._namedArgs, this._positionalArgs);

  @override
  Uint8List generate() {
    return Function.apply(_rng, _positionalArgs, _namedArgs);
  }
}
