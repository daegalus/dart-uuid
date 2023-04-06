import 'dart:math';
import 'dart:typed_data';

abstract class RNG {
  const RNG();

  Uint8List generate() {
    final uint8list = generateInternal();
    if (uint8list.length != 16) {
      throw Exception('The length of the Uint8list returned by the custom RNG must be 16.');
    } else {
      return uint8list;
    }
  }

  Uint8List generateInternal();
}

/// Math.Random()-based RNG. All platforms, fast, not cryptographically
/// strong. Optional [seed] can be passed on creation.
class MathRNG extends RNG {
  static final _random = Random();
  final int seed;

  const MathRNG({this.seed = -1});

  @override
  Uint8List generateInternal() {
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
class CryptoRNG extends RNG {
  static final _secureRandom = Random.secure();

  @override
  Uint8List generateInternal() {
    final b = Uint8List(16);

    for (var i = 0; i < 16; i++) {
      b[i] = _secureRandom.nextInt(256);
    }

    return b;
  }
}

// LegacyRNG is a wrapper around a legacy RNG function that takes named and
// positional arguments.
class LegacyRNG extends RNG {
  final Function _rng;
  final Map<Symbol, dynamic> _namedArgs;
  final List<dynamic> _positionalArgs;

  const LegacyRNG(this._rng, this._namedArgs, this._positionalArgs);

  @override
  Uint8List generateInternal() {
    return Function.apply(_rng, _positionalArgs, _namedArgs);
  }
}
