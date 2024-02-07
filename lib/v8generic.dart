import 'dart:typed_data';
import 'package:uuid/data.dart';

import 'parsing.dart';

class UuidV8Generic {
  final GlobalOptions? goptions;

  const UuidV8Generic({this.goptions});

  /// V8Generic() Generates a time-based version 8 UUID
  ///
  /// Takes in 128 bits (16 bytes) of custom data, and produces a valid V8 uuid.
  /// Bits 48-51 and bits 64-65 will be modified to create a valid uuid.
  ///
  /// https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-8
  ///
  ///   0                   10                  20                  30
  ///   0 1 2 3 4 5 6 7 8 9 A B C D E F 0 1 2 3 4 5 6 7 8 9 A B C D E F
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///  |                           custom_a                            |
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///  |            custom_a           |  ver  |       custom_b        |
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///  |var|                       custom_c                            |
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///  |                           custom_c                            |
  ///  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
  ///
  ///  48 bits - custom_a
  ///   4 bits - version
  ///  12 bits - custom_b
  ///   2 bits - variant
  ///  62 bits - custom_c
  String generate({V8GenericOptions? options}) {
    var buf = Uint8List(16);

    List<int> data =
        options?.data ?? goptions?.rng?.generate() ?? List<int>.filled(16, 0);

    buf.setRange(0, 16, data);
    buf.setRange(6, 7, [buf.getRange(6, 7).last & 0x0f | 0x80]);
    buf.setRange(8, 9, [buf.getRange(8, 9).last & 0x3f | 0x80]);

    return UuidParsing.unparse(buf);
  }
}
