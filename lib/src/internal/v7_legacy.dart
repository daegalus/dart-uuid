// ========================================================================
// WARNING: THIS FILE IS FOR DEMONSTRATION PURPOSES ONLY
// AND WILL BE CAN BE REMOVED IN A FUTURE VERSION
// ========================================================================
//
// The UuidV7Legacy class in this file demonstrates the flawed implementation
// from the initial version of the library. It is kept ONLY to show how the
// same UUID generation code produces different results on web (JavaScript)
// versus native platforms due to differences in number handling.
//
// DO NOT USE THIS IN PRODUCTION CODE.
//
// For production code, always use the proper UuidV7 implementation:
//
// import 'package:uuid_plus/v7.dart';
//
// This version correctly uses fixnum's Int64 for consistent behavior across
// all platforms.
// ========================================================================

import 'dart:math';
import 'dart:typed_data';

import 'package:uuid_plus/src/data.dart';

import '../parsing.dart';

class UuidV7Legacy {
  final GlobalOptions? goptions;

  const UuidV7Legacy({this.goptions});

  /// v7() Generates a time-based version 7 UUID
  ///
  /// By default it will generate a string based off current time in Unix Epoch,
  /// and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-7
  String generate({V7Options? options}) {
    var buf = Uint8List(16);
    int time = options?.time ?? DateTime.timestamp().millisecondsSinceEpoch;

    var timeList48 = Uint8List.fromList([
      time ~/ pow(2, 40),
      time ~/ pow(2, 32),
      time ~/ pow(2, 24),
      time ~/ pow(2, 16),
      time ~/ pow(2, 8),
      time
    ]);

    buf.setAll(0, timeList48);
    List<int> randomBytes = options?.randomBytes ??
        (goptions?.rng?.generate() ?? V7State.random.generate());

    buf.setRange(6, 16, randomBytes);
    buf.setRange(6, 7, [buf.getRange(6, 7).last & 0x0f | 0x70]);
    buf.setRange(8, 9, [buf.getRange(8, 9).last & 0x3f | 0x80]);

    return UuidParsing.unparse(buf);
  }
}
