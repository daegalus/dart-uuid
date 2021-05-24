import 'dart:typed_data';
import 'parsing.dart';
import 'uuid_util.dart';

class UuidV6 {
  late List<int> seedBytes;
  late List<int> nodeId;
  late int clockSeq;
  int mSecs = 0;
  int nSecs = 0;
  late Map<String, dynamic>? goptions;

  factory UuidV6(Map<String, dynamic>? options) {
    options ??= {};
    var v1PositionalArgs = options['v1rngPositionalArgs'] ?? [];
    Map<Symbol, dynamic> v1NamedArgs =
        options['v1rngNamedArgs'] ?? const <Symbol, dynamic>{};
    var seedBytes = (options['v1rng'] != null)
        ? Function.apply(options['v1rng'], v1PositionalArgs, v1NamedArgs)
        : UuidUtil.mathRNG();

    // Per 4.5, create a 48-bit node id (47 random bits + multicast bit = 1)
    List<int> nodeId = [
      seedBytes[0] | 0x01,
      seedBytes[1],
      seedBytes[2],
      seedBytes[3],
      seedBytes[4],
      seedBytes[5]
    ];

    // Per 4.2.2, randomize (14 bit) clockseq
    var clockSeq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3ffff;

    return UuidV6._(seedBytes, nodeId, clockSeq, 0, 0, options);
  }
  UuidV6._(this.seedBytes, this.nodeId, this.clockSeq, this.mSecs, this.nSecs,
      this.goptions);

  /// v6() Generates a time-based version 6 UUID
  ///
  /// By default it will generate a string based off current Gregorian epoch
  /// time, and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format#section-4.3
  String generate({Map<String, dynamic>? options}) {
    var buf = Uint8List(16);
    options ??= const {};

    var clockSeq = options['clockSeq'] ?? this.clockSeq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00). Time is handled internally as 'msecs' (integer
    // milliseconds) and 'nsecs' (100-nanoseconds offset from msecs) since unix
    // epoch, 1970-01-01 00:00.
    int mSecs = options['mSecs'] ?? (DateTime.now()).millisecondsSinceEpoch;

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    int nSecs = options['nSecs'] ?? this.nSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (mSecs - this.mSecs) + (nSecs - this.nSecs) / 10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options['clockSeq'] == null) {
      clockSeq = clockSeq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || mSecs > this.mSecs) && options['nSecs'] == null) {
      nSecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nSecs >= 10000) {
      throw Exception('uuid.v6(): Can\'t create more than 10M uuids/sec');
    }

    this.mSecs = mSecs;
    this.nSecs = nSecs;
    this.clockSeq = clockSeq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    mSecs += 12219292800000;

    var uuid_time = mSecs * 10000 + nSecs;

    var high = uuid_time << 4;
    var low = uuid_time & 0x0fff | 0x6000;
    var clock = (clockSeq & 0x3fff) | 0x8000;
    buf..buffer.asByteData().setUint64(0, high);
    buf..buffer.asByteData().setUint16(6, low);
    buf..buffer.asByteData().setUint16(8, clock);

    var node = (options['node'] != null) ? options['node'] : nodeId;
    buf.setAll(10, node);

    return UuidParsing.unparse(buf);
  }
}
