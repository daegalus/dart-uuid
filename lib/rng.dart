import 'dart:math';
import 'dart:typed_data';

// RNG is an abstract class that defines the interface for a random number
// generator. It is used by the UUID class to generate random numbers.
//
// It also ensures that the Uint8List returned by the RNG is of the correct
// length. Throws an [Exception] if the length is not 16.
abstract class RNG {
  const RNG();

  Uint8List generate() {
    final uint8list = _generateInternal();
    if (uint8list.length != 16) {
      throw Exception(
          'The length of the Uint8list returned by the custom RNG must be 16.');
    } else {
      return uint8list;
    }
  }

  Uint8List _generateInternal();
}

/// Math.Random()-based RNG. All platforms, fast, not cryptographically
/// strong. Optional [seed] can be passed on creation.
class MathRNG extends RNG {
  final Random _rnd;

  MathRNG({int? seed}) : _rnd = seed != null ? Random(seed) : Random();

  @override
  Uint8List _generateInternal() {
    final b = Uint8List(16);

    for (var i = 0; i < 16; i += 4) {
      var k = _rnd.nextInt(pow(2, 32).toInt());
      b[i] = k;
      b[i + 1] = k >> 8;
      b[i + 2] = k >> 16;
      b[i + 3] = k >> 24;
    }

    return b;
  }
}

/// Math.Random()-based RNG. All platforms, fast, not cryptographically
/// strong. Optional [seed] can be passed on creation.
class MathRNGDeprecated extends RNG {
  static final _random = Random();
  final int seed;

  const MathRNGDeprecated({this.seed = -1});

  @override
  Uint8List _generateInternal() {
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
  Uint8List _generateInternal() {
    final b = Uint8List(16);

    for (var i = 0; i < 16; i += 4) {
      var k = _secureRandom.nextInt(pow(2, 32).toInt());
      b[i] = k;
      b[i + 1] = k >> 8;
      b[i + 2] = k >> 16;
      b[i + 3] = k >> 24;
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
  Uint8List _generateInternal() {
    return Function.apply(_rng, _positionalArgs, _namedArgs);
  }
}
