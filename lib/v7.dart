import 'dart:typed_data';
import 'parsing.dart';
import 'uuid_util.dart';

class UuidV7 {
  int time = 0;
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

    int time = options['time'] ?? (DateTime.now().toUtc()).millisecondsSinceEpoch;

    this.time = time;

    var timeList = Uint8List(8)..buffer.asUint64List()[0] = time;
    var endIndex = timeList.length - 1;
    while (endIndex >= 0 && timeList[endIndex] == 0) {
      endIndex--;
    }
    timeList = timeList.sublist(0, endIndex + 1);

    buf.setAll(0, timeList.reversed);
    var randomBytes = (options['randomBytes'] != null) ? (options['randomBytes'] as List<int>) : randomData();

    buf.setRange(6, 16, randomBytes);
    buf.setRange(6, 7, [buf.getRange(6, 7).last & 0x0f | 0x70]);
    buf.setRange(8, 9, [buf.getRange(8, 9).last & 0x3f | 0x80]);

    return UuidParsing.unparse(buf);
  }

  List<int> randomData() {
    var options = goptions ?? const {};
    var v1PositionalArgs = options['v1rngPositionalArgs'] ?? [];
    Map<Symbol, dynamic> v1NamedArgs = options['v1rngNamedArgs'] ?? const <Symbol, dynamic>{};
    Uint8List seedBytes = (options['v1rng'] != null)
        ? Function.apply(options['v1rng'], v1PositionalArgs, v1NamedArgs)
        : UuidUtil.mathRNG();

    // ignore: omit_local_variable_types
    List<int> randomData = [
      seedBytes[0],
      seedBytes[1],
      seedBytes[2],
      seedBytes[3],
      seedBytes[4],
      seedBytes[5],
      seedBytes[6],
      seedBytes[7],
      seedBytes[8],
      seedBytes[9]
    ];

    return randomData;
  }
}
