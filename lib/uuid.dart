library uuid;

import 'dart:typed_data' show Uint8List;
import 'package:crypto/crypto.dart' show sha1;
import 'package:convert/convert.dart' as convert;
import 'uuid_util.dart';

class Uuid {
  Uuid() {
    _byteToHex = List<String>(256);
    _hexToByte = <String, int>{};

    // Easy number <-> hex conversion
    for (int i = 0; i < 256; i++) {
      final Uint8List hex = Uint8List(1);
      hex[0] = i;
      _byteToHex[i] = convert.hex.encode(hex);
      _hexToByte[_byteToHex[i]] = i;
    }

    // Sets initial seedBytes, node, and clock seq based on cryptoRNG.
    _seedBytes = UuidUtil.cryptoRNG();

    // Per 4.5, create a 48-bit node id (47 random bits + multicast bit = 1)
    _nodeId = Uint8List.fromList(<int>[
      _seedBytes[0] | 0x01,
      _seedBytes[1],
      _seedBytes[2],
      _seedBytes[3],
      _seedBytes[4],
      _seedBytes[5]
    ]);

    // Per 4.2.2, randomize (14 bit) clockseq
    _clockSeq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3ffff;
  }

  // RFC4122 provided namespaces for v3 and v5 namespace based UUIDs
  static const String NAMESPACE_DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  static const String NAMESPACE_URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
  static const String NAMESPACE_OID = '6ba7b812-9dad-11d1-80b4-00c04fd430c8';
  static const String NAMESPACE_X500 = '6ba7b814-9dad-11d1-80b4-00c04fd430c8';
  static const String NAMESPACE_NIL = '00000000-0000-0000-0000-000000000000';

  Uint8List _seedBytes, _nodeId;
  int _clockSeq, _lastMSecs = 0, _lastNSecs = 0;
  List<String> _byteToHex;
  Map<String, int> _hexToByte;

  ///Parses the provided [uuid] into a list of byte values.
  /// Can optionally be provided a [buffer] to write into and
  ///  a positional [offset] for where to start inputting into the buffer.
  Uint8List parse(String uuid, {Uint8List buffer, int offset = 0}) {
    final int i = offset;
    int ii = 0;

    // Create a 16 item buffer if one hasn't been provided.
    buffer = (buffer != null) ? buffer : Uint8List(16);

    // Convert to lowercase and replace all hex with bytes then
    // string.replaceAll() does a lot of work that I don't need, and a manual
    // regex gives me more control.
    final RegExp regex = RegExp('[0-9a-f]{2}');
    for (Match match in regex.allMatches(uuid.toLowerCase())) {
      if (ii < 16) {
        final String hex = uuid.toLowerCase().substring(match.start, match.end);
        buffer[i + ii++] = _hexToByte[hex];
      }
    }

    // Zero out any left over bytes if the string was too short.
    while (ii < 16) {
      buffer[i + ii++] = 0;
    }

    return buffer;
  }

  /// Unparses a [buffer] of bytes and outputs a proper UUID string.
  /// An optional [offset] is allowed if you want to start at a different point
  /// in the buffer.
  String unparse(Uint8List buffer, {int offset = 0}) {
    int i = offset;
    return '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}-'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}-'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}-'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}-'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}'
        '${_byteToHex[buffer[i++]]}${_byteToHex[buffer[i++]]}';
  }

  /// v1() Generates a time-based version 1 UUID
  ///
  /// By default it will generate a string based off current time, and will
  /// return a string.
  ///
  /// If an optional [buffer] list is provided, it will put the byte data into
  /// that buffer and return a buffer.
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.2.2
  String v1({
    int mSecs,
    int nSecs,
    final int clockSequence,
    Uint8List node,
  }) {
    int i = 0;
    final Uint8List buf = Uint8List(16);

    int clockSeq = clockSequence ?? _clockSeq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00). Time is handled internally as 'msecs' (integer
    // milliseconds) and 'nsecs' (100-nanoseconds offset from msecs) since unix
    // epoch, 1970-01-01 00:00.
    mSecs ??= DateTime.now().millisecondsSinceEpoch;

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    nSecs ??= _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    final int dt = (mSecs - _lastMSecs) * 10000 + (nSecs - _lastNSecs);

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && clockSequence == null) {
      clockSeq = clockSeq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || mSecs > _lastMSecs) && nSecs == null) {
      nSecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nSecs >= 10000) {
      throw Exception('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = mSecs;
    _lastNSecs = nSecs;
    _clockSeq = clockSeq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    mSecs += 12219292800000;

    // time Low
    final int tl = ((mSecs & 0xfffffff) * 10000 + nSecs) % 0x100000000;
    buf[i++] = tl >> 24 & 0xff;
    buf[i++] = tl >> 16 & 0xff;
    buf[i++] = tl >> 8 & 0xff;
    buf[i++] = tl & 0xff;

    // time mid
    final int tmh = (mSecs ~/ 0x100000000 * 10000) & 0xfffffff;
    buf[i++] = tmh >> 8 & 0xff;
    buf[i++] = tmh & 0xff;

    // time high and version
    buf[i++] = tmh >> 24 & 0xf | 0x10; // include version
    buf[i++] = tmh >> 16 & 0xff;

    // clockSeq high and reserved (Per 4.2.2 - include variant)
    buf[i++] = clockSeq >> 8 | 0x80;

    // clockSeq low
    buf[i++] = clockSeq & 0xff;

    // node
    node ??= _nodeId;
    for (int n = 0; n < 6; n++) {
      buf[i + n] = node[n];
    }

    return unparse(buf);
  }

  /// v1buffer() Generates a time-based version 1 UUID
  ///
  /// By default it will generate a string based off current time, and will
  /// place the result into the provided [buffer]. The [buffer] will also be returned..
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.2.2
  Uint8List v1buffer(
    Uint8List buffer, {
    int mSecs,
    int nSecs,
    final int clockSequence,
    Uint8List node,
    int offset = 0,
  }) {
    final Uint8List _buf = parse(v1(
      mSecs: mSecs,
      nSecs: nSecs,
      clockSequence: clockSequence,
      node: node,
    ));

    if (buffer != null) {
      buffer.setRange(offset, offset + 16, _buf);
    }

    return buffer;
  }

  /// v4() Generates a RNG version 4 UUID
  ///
  /// By default it will generate a string based mathRNG, and will return
  /// a string. If you wish to use crypto-strong RNG, pass in UuidUtil.cryptoRNG
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  String v4({
    Uint8List rng,
    Uint8List random,
  }) {
    rng ??= UuidUtil.mathRNG();

    // Use provided values over RNG
    final Uint8List rnds = random ?? rng;

    // per 4.4, set bits for version and clockSeq high and reserved
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    return unparse(rnds);
  }

  /// v4buffer() Generates a RNG version 4 UUID
  ///
  /// By default it will generate a string based off mathRNG, and will
  /// place the result into the provided [buffer]. The [buffer] will also be returned.
  /// If you wish to have crypto-strong RNG, pass in UuidUtil.cryptoRNG.
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  Uint8List v4buffer(
    Uint8List buffer, {
    Uint8List rng,
    Uint8List random,
    int offset = 0,
  }) {
    final Uint8List _buf = parse(v4(rng: rng, random: random));

    if (buffer != null) {
      buffer.setRange(offset, offset + 16, _buf);
    }

    return buffer;
  }

  /// v5() Generates a namspace & name-based version 5 UUID
  ///
  /// By default it will generate a string based on a provided uuid namespace and
  /// name, and will return a string.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  String v5(
    String namespace,
    String name, {
    bool randomNamespace,
  }) {
    // Check if user wants a random namespace generated by v4() or a NIL namespace.
    randomNamespace ??= true;

    // If randomNamespace is true, generate UUIDv4, else use NIL
    final String blankNS = randomNamespace ? v4() : NAMESPACE_NIL;

    // Use provided namespace, or use whatever is decided by options.
    namespace = (namespace != null) ? namespace : blankNS;

    // Use provided name,
    name = (name != null) ? name : '';

    // Convert namespace UUID to Byte List
    final Uint8List bytes = parse(namespace);

    // Convert name to a list of bytes
    final Uint8List nameBytes = Uint8List.fromList(name.codeUnits);

    // Generate SHA1 using namespace concatenated with name
    final Uint8List hashBytes =
        Uint8List.fromList(sha1.convert(bytes + nameBytes).bytes);

    // per 4.4, set bits for version and clockSeq high and reserved
    hashBytes[6] = (hashBytes[6] & 0x0f) | 0x50;
    hashBytes[8] = (hashBytes[8] & 0x3f) | 0x80;

    return unparse(hashBytes);
  }

  /// v5buffer() Generates a RNG version 4 UUID
  ///
  /// By default it will generate a string based off current time, and will
  /// place the result into the provided [buffer]. The [buffer] will also be returned..
  ///
  /// Optionally an [offset] can be provided with a start position in the buffer.
  ///
  /// The first argument is an options map that takes various configuration
  /// options detailed in the readme.
  ///
  /// http://tools.ietf.org/html/rfc4122.html#section-4.4
  Uint8List v5buffer(
    String namespace,
    String name,
    Uint8List buffer, {
    bool randomNamespace,
    int offset = 0,
  }) {
    final Uint8List _buf =
        parse(v5(namespace, name, randomNamespace: randomNamespace));

    if (buffer != null) {
      buffer.setRange(offset, offset + 16, _buf);
    }

    return buffer;
  }
}
