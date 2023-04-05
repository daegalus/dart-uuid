import 'dart:typed_data';
import 'package:uuid/data.dart';

import 'parsing.dart';
import 'uuid_util.dart';

class UuidV7 {
  final GlobalOptions? goptions;

  const UuidV7({this.goptions});

  /// v7() Generates a time-based version 7 UUID
  ///
  /// By default it will generate a string based off current time in Unix Epoch,
  /// and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format#section-4.3
  String generate({V7Options? options}) {
    var buf = Uint8List(16);
    int time = options?.time ?? (DateTime.now().toUtc()).millisecondsSinceEpoch;

    var timeList32 = Uint8List(8)..buffer.asUint32List()[0] = time >> 16;
    var timeList16 = Uint8List(8)..buffer.asUint16List()[0] = time;
    var endIndex32 = timeList32.length - 1;
    var endIndex16 = timeList16.length - 1;

    while (endIndex32 >= 0 && timeList32[endIndex32] == 0) {
      endIndex32--;
    }
    while (endIndex16 >= 0 && timeList16[endIndex16] == 0) {
      endIndex16--;
    }

    timeList32 = timeList32.sublist(0, endIndex32 + 1);
    timeList16 = timeList16.sublist(0, endIndex16 + 1);

    buf.setAll(0, timeList32.reversed);
    buf.setAll(4, timeList16.reversed);
    List<int> randomBytes = options?.randomBytes ?? _randomData();

    buf.setRange(6, 16, randomBytes);
    buf.setRange(6, 7, [buf.getRange(6, 7).last & 0x0f | 0x70]);
    buf.setRange(8, 9, [buf.getRange(8, 9).last & 0x3f | 0x80]);

    return UuidParsing.unparse(buf);
  }

  /// _randomData() Generates a random data for v7 UUID random section
  List<int> _randomData() {
    Uint8List seedBytes = Function.apply(goptions?.rng ?? UuidUtil.mathRNG,
        goptions?.positionalArgs ?? [], goptions?.namedArgs ?? {});

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
