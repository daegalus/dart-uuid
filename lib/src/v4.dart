import 'data.dart';
import 'parsing.dart';

class UuidV4 {
  final GlobalOptions? goptions;

  const UuidV4({this.goptions});

  /// v4() Generates a RNG version 4 UUID
  ///
  /// By default it will generate a string based cryptoRNG, and will return
  /// a string. If you wish to use crypto-strong RNG, pass in UuidUtil.cryptoRNG
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  String generate({V4Options? options}) {
    // Use the built-in RNG or a custom provided RNG
    List<int> rng = options?.rng?.generate() ??
        goptions?.rng?.generate() ??
        V4State.random.generate();

    // Use provided values over RNG
    List<int> rnds = options?.random ?? rng;

    // per 4.4, set bits for version and clockSeq high and reserved
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    return UuidParsing.unparse(rnds);
  }
}
