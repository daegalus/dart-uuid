import 'dart:typed_data';
import 'parsing.dart';
import 'uuid_util.dart';

class UuidV7 {
  int clockSeq = 0;
  int time = 0;
  int secs = 0;
  int uSecs = 0;
  late Map<String, dynamic>? goptions;

  factory UuidV7(Map<String, dynamic>? options) {
    options ??= {};

    return UuidV7._(options);
  }
  UuidV7._(this.goptions);

  /// v7() Generates a time-based version 7 UUID
  ///
  /// By default it will generate a string based off current time in Unix Epoch,
  /// and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format#section-4.3
  String generate({Map<String, dynamic>? options}) {
    var buf = Uint8List(16);
    options ??= const {};

    var clockSeq = options['clockSeq'] ?? this.clockSeq;

    int time =
        options['uSecs'] ?? (DateTime.now().toUtc()).microsecondsSinceEpoch;
    var secs = time ~/ 1000000;
    var uSecs = time % 1000000;

    // Time since last uuid creation (in uSecs)
    var dt = time - this.time;

    // Per 4.4.2, Bump clockseq on clock regression
    if (dt <= 0 && options['clockSeq'] == null) {
      clockSeq = clockSeq + 1 & 0x3fff;
    }

    this.time = time;
    this.secs = secs;
    this.uSecs = uSecs;
    this.clockSeq = clockSeq;

    buf..buffer.asByteData().setUint32(0, secs >> 4);
    buf..buffer.asByteData().setUint8(4, secs << 4);

    buf..buffer.asByteData().setUint8(4, uSecs >> 16);
    buf..buffer.asByteData().setUint8(5, uSecs >> 12);
    buf..buffer.asByteData().setUint8(6, uSecs >> 5 & 0xf | 0x70);
    buf..buffer.asByteData().setUint8(7, uSecs);
    buf..buffer.asByteData().setUint16(8, clockSeq | 0x8000);

    var node =
        (options['node'] != null) ? (options['node'] as List<int>) : newNode();
    buf.setAll(10, node);

    return UuidParsing.unparse(buf);
  }

  List<int> newNode() {
    var options = goptions ?? const {};
    var v1PositionalArgs = options['v1rngPositionalArgs'] ?? [];
    Map<Symbol, dynamic> v1NamedArgs =
        options['v1rngNamedArgs'] ?? const <Symbol, dynamic>{};
    var seedBytes = (options['v1rng'] != null)
        ? Function.apply(options['v1rng'], v1PositionalArgs, v1NamedArgs)
        : UuidUtil.mathRNG();

    List<int> nodeId = [
      seedBytes[0] | 0x01,
      seedBytes[1],
      seedBytes[2],
      seedBytes[3],
      seedBytes[4],
      seedBytes[5]
    ];

    return nodeId;
  }
}
