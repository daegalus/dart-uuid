import 'parsing.dart';
import 'uuid_util.dart';

class UuidV4 {
  late List<int> Function() globalRNG;

  factory UuidV4({Map<String, dynamic>? options}) {
    options ??= {};
    // Set the globalRNG function to mathRNG with the option to set an alternative globally
    List gPositionalArgs = options['gPositionalArgs'] ?? [];
    Map<Symbol, dynamic> gNamedArgs = options['gNamedArgs'] ?? const <Symbol, dynamic>{};

    List<int> Function() grng = (options['grng'] != null)
        ? () => Function.apply(options!['grng'], gPositionalArgs, gNamedArgs)
        : UuidUtil.mathRNG;

    return UuidV4._(grng);
  }

  UuidV4._(this.globalRNG);

  /// v4() Generates a RNG version 4 UUID
  ///
  /// By default it will generate a string based mathRNG, and will return
  /// a string. If you wish to use crypto-strong RNG, pass in UuidUtil.cryptoRNG
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  String generate({Map<String, dynamic>? options}) {
    options ??= {};

    // Use the built-in RNG or a custom provided RNG
    List positionalArgs = options['positionalArgs'] ?? [];
    Map<Symbol, dynamic> namedArgs = options['namedArgs'] ?? const <Symbol, dynamic>{};
    List<int> rng = (options['rng'] != null) ? Function.apply(options['rng'], positionalArgs, namedArgs) : globalRNG();

    // Use provided values over RNG
    List<int> rnds = options['random'] ?? rng;

    // per 4.4, set bits for version and clockSeq high and reserved
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    return UuidParsing.unparse(rnds);
  }
}
