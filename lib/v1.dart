import 'dart:typed_data';
import 'data.dart';
import 'parsing.dart';

class UuidV1 {
  final GlobalOptions? goptions;

  const UuidV1({this.goptions});

  /// _init() Initializes the state of the UUID v1 generator
  /// Primarily sets up the seedBytes then generates the node id and clockseq
  void _init() {
    if (V1State.initialized) return;
    Uint8List seedBytes =
        goptions?.rng?.generate() ?? V1State.random.generate();

    // Per 4.5, create a 48-bit node id (47 random bits + multicast bit = 1)
    List<int> nodeId = [
      seedBytes[0] | 0x01,
      seedBytes[1],
      seedBytes[2],
      seedBytes[3],
      seedBytes[4],
      seedBytes[5]
    ];
    V1State.nodeId = nodeId;

    // Per 4.2.2, randomize (14 bit) clockseq
    var clockSeq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3ffff;
    V1State.clockSeq = clockSeq;
    V1State.initialized = true;
  }

  /// v1() Generates a time-based version 1 UUID
  ///
  /// By default it will generate a string based off current Gregorian epoch
  /// time, and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.2.2
  String generate({V1Options? options}) {
    _init();
    var i = 0;
    var buf = Uint8List(16);

    int clockSeq = options?.clockSeq ?? V1State.clockSeq ?? 0;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00). Time is handled internally as 'msecs' (integer
    // milliseconds) and 'nsecs' (100-nanoseconds offset from msecs) since unix
    // epoch, 1970-01-01 00:00.
    int mSecs = options?.mSecs ?? DateTime.timestamp().millisecondsSinceEpoch;

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    int nSecs = options?.nSecs ?? V1State.nSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (mSecs - V1State.mSecs) + (nSecs - V1State.nSecs) / 10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options?.clockSeq == null) {
      clockSeq = clockSeq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || mSecs > V1State.mSecs) && options?.nSecs == null) {
      nSecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nSecs >= 10000) {
      throw Exception('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    V1State.mSecs = mSecs;
    V1State.nSecs = nSecs;
    V1State.clockSeq = clockSeq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    mSecs += 12219292800000;

    // time Low
    var tl = ((mSecs & 0xfffffff) * 10000 + nSecs) % 0x100000000;
    buf[i++] = tl >> 24 & 0xff;
    buf[i++] = tl >> 16 & 0xff;
    buf[i++] = tl >> 8 & 0xff;
    buf[i++] = tl & 0xff;

    // time mid
    var tmh = (mSecs / 0x100000000 * 10000).floor() & 0xfffffff;
    buf[i++] = tmh >> 8 & 0xff;
    buf[i++] = tmh & 0xff;

    // time high and version
    buf[i++] = tmh >> 24 & 0xff; // | 0x10; // include version
    buf[i++] = tmh >> 16 & 0xff;

    // clockSeq high and reserved (Per 4.2.2 - include variant)
    buf[i++] = (clockSeq & 0x3F00) >> 8;

    // clockSeq low
    buf[i++] = clockSeq & 0xff;

    // set version
    buf[6] = buf[6] & 0xf | 0x10;
    buf[8] = buf[8] | 0x80;
    // node
    List<int> node = options?.node ?? V1State.nodeId ?? [0, 0, 0, 0, 0, 0];
    for (var n = 0; n < 6; n++) {
      buf[i + n] = node[n];
    }

    return UuidParsing.unparse(buf);
  }
}
