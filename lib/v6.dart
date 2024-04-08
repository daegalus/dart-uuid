// ignore_for_file: avoid_single_cascade_in_expression_statements

import 'dart:math';
import 'dart:typed_data';
import 'package:fixnum/fixnum.dart';
import 'data.dart';
import 'parsing.dart';

class UuidV6 {
  final GlobalOptions? goptions;

  const UuidV6({this.goptions});

  /// _init() Initializes the state of the UUID v1 generator
  /// Primarily sets up the seedBytes then generates the node id and clockseq
  void _init() {
    if (V6State.initialized) return;
    Uint8List seedBytes =
        goptions?.rng?.generate() ?? V6State.random.generate();

    // Per 4.5, create a 48-bit node id (47 random bits + multicast bit = 1)
    List<int> nodeId = [
      seedBytes[0] | 0x01,
      seedBytes[1],
      seedBytes[2],
      seedBytes[3],
      seedBytes[4],
      seedBytes[5]
    ];
    V6State.nodeId = nodeId;

    // Per 4.2.2, randomize (14 bit) clockseq
    var clockSeq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3ffff;
    V6State.clockSeq = clockSeq;
    V6State.initialized = true;
  }

  /// v6() Generates a time-based version 6 UUID
  ///
  /// By default it will generate a string based off current Gregorian epoch
  /// time, and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-7
  String generate({V6Options? options}) {
    _init();
    var buf = Uint8List(16);

    int clockSeq = options?.clockSeq ?? V6State.clockSeq ?? 0;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00). Time is handled internally as 'msecs' (integer
    // milliseconds) and 'nsecs' (100-nanoseconds offset from msecs) since unix
    // epoch, 1970-01-01 00:00.
    int mSecs = options?.mSecs ?? DateTime.timestamp().millisecondsSinceEpoch;

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    int nSecs = options?.nSecs ?? V6State.nSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (mSecs - V6State.mSecs) + (nSecs - V6State.nSecs) / 10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options?.clockSeq == null) {
      clockSeq = clockSeq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || mSecs > V6State.mSecs) && options?.nSecs == null) {
      nSecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nSecs >= 10000) {
      throw Exception('uuid.v6(): Can\'t create more than 10M uuids/sec');
    }

    V6State.mSecs = mSecs;
    V6State.nSecs = nSecs;
    V6State.clockSeq = clockSeq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    mSecs += 12219292800000;

    var uuidTime = Int64(mSecs) * Int64(10000) + Int64(nSecs);

    var high = uuidTime ~/ pow(2, 28);
    var mid = uuidTime * pow(2, 4);
    var low = uuidTime & 0x0fff | 0x6000;
    var clock = (clockSeq & 0x3fff) | 0x8000;

    buf..buffer.asByteData().setUint32(0, high.toInt());
    buf..buffer.asByteData().setUint32(4, mid.toInt());
    buf..buffer.asByteData().setUint16(6, low.toInt());
    buf..buffer.asByteData().setUint16(8, clock);

    var node =
        options?.node ?? V6State.nodeId ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    buf.setAll(10, node);
    return UuidParsing.unparse(buf);
  }
}
