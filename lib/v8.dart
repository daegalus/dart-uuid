import 'dart:typed_data';
import 'package:sprintf/sprintf.dart';
import 'package:uuid/data.dart';

import 'parsing.dart';

class UuidV8 {
  final GlobalOptions? goptions;

  const UuidV8({this.goptions});

  /// V8() Generates a time-based version 8 UUID
  ///
  /// By default it will generate a string based off current time in Unix Epoch,
  /// and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-8
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
  String generate({V8Options? options}) {
    var buf = Uint8List(16);

    DateTime time = options?.time ?? DateTime.timestamp();

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

    var randomBytes = options?.randomBytes ??
        (goptions?.rng?.generate() ?? V8State.random.generate());

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
}
