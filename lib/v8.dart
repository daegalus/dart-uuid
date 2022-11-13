import 'dart:typed_data';
import 'package:sprintf/sprintf.dart';

import 'parsing.dart';
import 'uuid_util.dart';

class UuidV8 {
  DateTime time = DateTime.now();
  late Map<String, dynamic>? goptions;

  factory UuidV8(Map<String, dynamic>? options) {
    options ??= {};

    return UuidV8._(options);
  }
  UuidV8._(this.goptions);

  /// V8() Generates a time-based version 8 UUID
  ///
  /// By default it will generate a string based off current time in Unix Epoch,
  /// and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format#section-4.3
  ///
  ///   0                   10                  20                  30
  ///   0 1 2 3 4 5 6 7 8 9 A B C D E F 0 1 2 3 4 5 6 7 8 9 A B C D E F
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///  |                        year-month-day                         |
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///  |          hour:minute          |  ver  | rand  |    seconds    |
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///  |var| milliseconds  |                   rand                    |
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///  |                             rand                              |
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///
  ///  48 bits - year-month-day
  ///   4 bits - version
  ///   4 bits - random
  ///   8 bits - seconds
  ///   2 bits - variant
  ///  16 bits - milliseconds
  ///  46 bits - random
  String generate({Map<String, dynamic>? options}) {
    var buf = Uint8List(16);
    options ??= const {};

    DateTime time = options['time'] ?? DateTime.now().toUtc();

    this.time = time;

    buf.setRange(
        0, 2, UuidParsing.parseHexToBytes(sprintf('0x%04i', [time.year])));
    buf.setRange(
        2, 3, UuidParsing.parseHexToBytes(sprintf('0x%02i', [time.month])));
    buf.setRange(
        3, 4, UuidParsing.parseHexToBytes(sprintf('0x%02i', [time.day])));
    buf.setRange(
        4, 5, UuidParsing.parseHexToBytes(sprintf('0x%02i', [time.hour])));
    buf.setRange(
        5, 6, UuidParsing.parseHexToBytes(sprintf('0x%02i', [time.minute])));

    var randomBytes = (options['randomBytes'] != null)
        ? (options['randomBytes'] as List<int>)
        : randomData();

    buf.setRange(6, 16, randomBytes);
    buf.setRange(6, 7, [buf.getRange(6, 7).last & 0x0f | 0x80]);
    buf.setRange(8, 9, [buf.getRange(8, 9).last & 0x3f | 0x80]);

    buf.setRange(
        7, 8, UuidParsing.parseHexToBytes(sprintf('0x%02i', [time.second])));
    var milliBytes =
        UuidParsing.parseHexToBytes(sprintf('0x%04i', [time.millisecond]));
    milliBytes[0] = milliBytes[0] & 0x0f | buf.getRange(8, 9).last & 0xf0;
    buf.setRange(8, 10, milliBytes);

    return UuidParsing.unparse(buf);
  }

  List<int> randomData() {
    var options = goptions ?? const {};
    var v1PositionalArgs = options['v1rngPositionalArgs'] ?? [];
    Map<Symbol, dynamic> v1NamedArgs =
        options['v1rngNamedArgs'] ?? const <Symbol, dynamic>{};
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
      seedBytes[9],
      seedBytes[10],
    ];

    return randomData;
  }
}
