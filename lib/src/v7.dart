import 'dart:typed_data';

import 'package:fixnum/fixnum.dart';
import 'package:uuid_plus/src/data.dart';
import 'package:uuid_plus/src/uuid_value.dart';

import 'parsing.dart';

class UuidV7 {
  final GlobalOptions? goptions;

  const UuidV7({this.goptions});

  /// Extracts the [DateTime] encoded by the [uuid] v7.
  ///
  /// Set [utc] to `true` if the returned [DateTime] should be without
  /// a timezone or `false` if the [DateTime] should have local timezone.
  static DateTime parseDateTime(
    String uuid, {
    bool utc = false,
  }) {
    final unformattedUuid = uuid.replaceAll('-', '');
    final bytes = UuidParsing.parse(unformattedUuid, noDashes: true);
    final value = UuidValue.fromList(bytes);
    if (!value.isV7) {
      throw ArgumentError('DateTime supported only for uuid v7');
    }

    // Extract the 48-bit timestamp from the first 6 bytes.
    var timestampMillis = Int64(0);
    for (var i = 0; i < 6; i++) {
      // Using BigInt due to how JS binary shift works,
      // it truncates the number to be uint32 which is not enough in this case.
      timestampMillis = (timestampMillis << 8) | bytes[i];
    }

    return DateTime.fromMillisecondsSinceEpoch(
      timestampMillis.toInt(),
      isUtc: utc,
    );
  }

  /// Generates a time-based version 7 UUID
  ///
  /// By default it generates a string based on current time in Unix Epoch.
  /// Uses fixnum package to ensure consistent behavior across all platforms,
  /// including web (JavaScript).
  ///
  /// Options can be passed to customize the generation.
  ///
  /// Reference: https://datatracker.ietf.org/doc/html/draft-ietf-uuidrev-rfc4122bis#name-uuid-version-7
  String generate({V7Options? options}) {
    var buf = Uint8List(16);

    // Use Int64 from fixnum for platform-independent handling of large integers
    Int64 time = Int64(
      options?.time ?? DateTime.timestamp().millisecondsSinceEpoch,
    );

    buf[0] = time.shiftRightUnsigned(40).toInt() & 0xFF;
    buf[1] = time.shiftRightUnsigned(32).toInt() & 0xFF;
    buf[2] = time.shiftRightUnsigned(24).toInt() & 0xFF;
    buf[3] = time.shiftRightUnsigned(16).toInt() & 0xFF;
    buf[4] = time.shiftRightUnsigned(8).toInt() & 0xFF;
    buf[5] = time.toInt() & 0xFF;

    List<int> randomBytes = options?.randomBytes ??
        (goptions?.rng?.generate() ?? V7State.random.generate());

    buf.setRange(6, 16, randomBytes);
    buf[6] = (buf[6] & 0x0F) | 0x70;
    buf[8] = (buf[8] & 0x3F) | 0x80;

    return UuidParsing.unparse(buf);
  }
}
