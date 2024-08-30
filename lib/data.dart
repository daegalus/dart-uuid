import 'package:uuid/rng.dart';

/// [GlobalOptions] stores the global options passed into the library on instantiation.
/// [GlobalOptions.rng] is the random number generator class to use. Defaults to CryptoRNG() [CryptoRNG]
class GlobalOptions {
  final RNG? rng;

  const GlobalOptions(this.rng);
}

/// [V1Options] stores the options passed into the v1 function.
/// [clockSeq] (Number between 0 - 0x3fff) RFC clock sequence.
///   Default: An internally maintained clockseq is used.
/// [mSecs] is the time in milliseconds since the unix epoch. Defualt: Now.
/// [nSecs] is the number of 100-nanosecond intervals since the last mSecs.
///   Ignored if `msecs` is unspecified. Default: internal uuid counter is
///   used, as per 4.2.1.2.
/// [node] Node id as List of 6 bytes (per 4.1.6). Default: Randomnly generated ID.
/// [seedBytes] is the random bytes to use to generate the node id and clock
///   sequence. Primarily used for testing, or recreating a UUID
class V1Options {
  final int? clockSeq;
  final int? mSecs;
  final int? nSecs;
  final List<int>? node;
  final List<int>? seedBytes;

  const V1Options(
      this.clockSeq, this.mSecs, this.nSecs, this.node, this.seedBytes);
}

/// [V4Options] stores the options passed into the v4 function.
/// [random] is the random bytes to use to generate the UUID. Primarily used for
/// testing, or recreating a UUID
/// [rng] is the random number generator function to use. Defaults to CryptoRNG() [CryptoRNG]
class V4Options {
  final List<int>? random;
  final RNG? rng;

  const V4Options(this.random, this.rng);
}

/// [V5Options] stores the options passed into the v5 function.
/// [randomNamespace] is a boolean to indicate whether or not to use a random
/// namespace. Defaults to true.
/// [v4options] is the options to pass into the v4 function to generate the
/// random namespace.
class V5Options {
  final bool? randomNamespace;
  final V4Options? v4options;

  const V5Options(this.randomNamespace, this.v4options);
}

/// [V6Options] stores the options passed into the v6 function.
/// [clockSeq] (Number between 0 - 0x3fff) RFC clock sequence.
///   Default: An internally maintained clockseq is used.
/// [mSecs] is the time in milliseconds since the unix epoch. Defualt: Now.
/// [nSecs] is the number of 100-nanosecond intervals since the last mSecs.
///   Ignored if `msecs` is unspecified. Default: internal uuid counter is
///   used, as per 4.2.1.2.
/// [node] Node id as List of 6 bytes (per 4.1.6). Default: Randomnly generated ID.
/// [seedBytes] is the random bytes to use to generate the node id and clock
///   sequence. Primarily used for testing, or recreating a UUID
class V6Options {
  final int? clockSeq;
  final int? mSecs;
  final int? nSecs;
  final List<int>? node;
  final List<int>? seedBytes;

  const V6Options(
      this.clockSeq, this.mSecs, this.nSecs, this.node, this.seedBytes);
}

/// [V7Options] stores the options passed into the v7 function.
/// [time] is the time in milliseconds since the unix epoch
/// [randomBytes] is the random bytes to use to generate the UUID. Primarily used
/// for testing, or recreating a UUID
class V7Options {
  final int? time;
  final List<int>? randomBytes;

  const V7Options(this.time, this.randomBytes);
}

/// [V8Options] stores the options passed into the v8 function.
/// [time] is the time in milliseconds since the unix epoch
/// [randomBytes] is the random bytes to use to generate the UUID. Primarily used
/// for testing, or recreating a UUID
class V8Options {
  final DateTime? time;
  final List<int>? randomBytes;

  const V8Options(this.time, this.randomBytes);
}

/// [V8GenericOptions] stores the options passed into the v8g function.
/// [data] is the 122 bytes of custom data.
class V8GenericOptions {
  final List<int>? data;

  const V8GenericOptions(this.data);
}

/// [V1State] stores the state of the v1 function.
/// [nodeId] is the node id currently being used
/// [clockSeq] is the clock sequence currently being used
/// [mSecs] is the time in milliseconds since the unix epoch
/// [nSecs] is the number of 100-nanosecond intervals since the last mSecs
/// [initialized] is a boolean to indicate whether or not the state has been
/// initialized once already. Prevents re-initialization on subsequent calls to
/// _init() from within the v1 function.
class V1State {
  static List<int>? nodeId = [];
  static int? clockSeq = 0;
  static int mSecs = 0;
  static int nSecs = 0;
  static RNG random = CryptoRNG();
  static bool initialized = false;
}

/// [V4State] stores the random number generator state for the v4 function.
/// [random] is a instantiation of the RNG state being used.
/// [initialized] is a boolean to indicate whether or not the state has been
/// initialized once already. Prevents re-initialization on subsequent calls to
/// _init() from within the v4 function.
class V4State {
  static RNG random = CryptoRNG();
  static bool initialized = true;
}

/// [V6State] stores the state of the v1 function.
/// [nodeId] is the node id currently being used
/// [clockSeq] is the clock sequence currently being used
/// [mSecs] is the time in milliseconds since the unix epoch
/// [nSecs] is the number of 100-nanosecond intervals since the last mSecs
/// [initialized] is a boolean to indicate whether or not the state has been
/// initialized once already. Prevents re-initialization on subsequent calls to
/// _init() from within the v6 function.
class V6State {
  static List<int>? nodeId = [];
  static int? clockSeq;
  static int mSecs = 0;
  static int nSecs = 0;
  static RNG random = CryptoRNG();
  static bool initialized = false;
}

/// [V7State] stores the random number generator state for the v4 function.
/// [random] is a instantiation of the RNG state being used.
/// [initialized] is a boolean to indicate whether or not the state has been
/// initialized once already. Prevents re-initialization on subsequent calls to
/// _init() from within the v4 function.
class V7State {
  static RNG random = CryptoRNG();
  static bool initialized = true;
}

/// [V8State] stores the random number generator state for the v4 function.
/// [random] is a instantiation of the RNG state being used.
/// [initialized] is a boolean to indicate whether or not the state has been
/// initialized once already. Prevents re-initialization on subsequent calls to
/// _init() from within the v4 function.
class V8State {
  static RNG random = CryptoRNG();
  static bool initialized = true;
}
