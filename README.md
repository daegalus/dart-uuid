[![Build Status](https://travis-ci.org/Daegalus/dart-uuid.svg?branch=master)](https://travis-ci.org/Daegalus/dart-uuid)

# dart-uuid

**Version 2.0.0 has breaking API changes. Please review them below.**

Simple, fast generation of [RFC4122](http://www.ietf.org/rfc/rfc4122.txt) UUIDs.

Originally based on node-uuid by Robert Kieffer (I even copied this readme over and modified it.)
Primarily because it works, well written, and so on. It has changed considerably since the start though.

Features:

* Generate RFC4122 version 1, version 4, or version 5 UUIDs
* Runs in web, server, and flutter
* Cryptographically strong random number generation on all platforms
  * **Defaults to non-crypto generator, see UuidUtil for cryptoRNG**
* [Documentation](http://daegalus.github.com/dart-uuid/index.html)

## Getting Started

### Instructions

1.  Open a command line and cd to your projects root folder
2.  In your pubspec, add an entry for dart-uuid to your dependencies (example below)
3.  pub install
4.  If you wish to run tests, go into packages/dart-uuid/ and run 'dart test/uuid_test.dart'

### Pubspec

There are 2 options. Directly from git, or from pub.dartlang.org

pub.dartlang.org: (you can use 'any' instead of a version if you just want the latest always)

```yaml
dependencies:
  uuid: 2.0.1
```

```dart
import 'package:uuid/uuid.dart';

var uuid = new Uuid();
```

Then create some ids ...

```dart
// Generate a v1 (time-based) id
uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// Generate a v4 (random) id
uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

// Generate a v5 (namespace-name-sha1-based) id
uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com'); // -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'
```

## API

### Uuid({Map<String, dynamic> options: null}) -> Uuid (Consturctor)

Constructor supports setting some global RNG sertings so you don't have to specify them on each function call for v4 or v5

* `options` - (Map<String, dynamic>) Optional uuid state to apply. Properties may include:

  * `grng` - (Function) Random # generator to use as a global rng function. A Custom function that returns an list[16] of byte values or 1 of 2 provided.
  * `gNamedArgs` - (Map<Symbol, dynamic>) The arguments and values you want to pass to your global rng function.
  * `gPositionalArgs` - (List) The positional arguments for your global rng functions, if any.
  * `v1rng` - (Function) Random # generator to use as a rng function for v1 seed. A Custom function that returns an list[16] of byte values or 1 of 2 provided.
  * `v1rngNamedArgs` - (Map<Symbol, dynamic>) The arguments and values you want to pass to your v1 rng function.
  * `v1rngPositionalArgs` - (List) The positional arguments for your v1 rng functions, if any.

Defaults are `Uuid.mathRNG`

Example: Using CryptoRNG globally

```dart
var uuid = new Uuid(options: {
  'grng': UuidUtil.cryptoRNG
})

// Generate a v4 (random) id that will use cryptRNG for its rng function
uuid.v4();
```

### uuid.v1({Map<String, dynamic> options: null) -> String
### uuid.v1buffer(List<int> buffer, {Map<String, dynamic> options: null, int offset: 0}) -> List<int>

Generate and return a RFC4122 v1 (timestamp-based) UUID.

* `options` - (Map<String, dynamic>) Optional uuid state to apply. Properties may include:

  * `node` - (List<int>) Node id as List of 6 bytes (per 4.1.6). Default: Randomnly generated ID.
  * `clockseq` - (Number between 0 - 0x3fff) RFC clock sequence. Default: An internally maintained clockseq is used.
  * `msecs` - (Number) Time in milliseconds since unix Epoch. Default: The current time is used.
  * `nsecs` - (Number between 0-9999) additional time, in 100-nanosecond units. Ignored if `msecs` is unspecified. Default: internal uuid counter is used, as per 4.2.1.2.

* `buffer` - (List<int>) Array or buffer where UUID bytes are to be written.
* `offset` - (Int) Starting index in `buffer` at which to begin writing.

v1() returns a string representation of the uuid.

v1buffer() Returns a List<int> `buffer`, if specified, also writes the data to the provided buffer.

Example: Generate string UUID with fully-specified options

```dart
uuid.v1(options: {
    'node': [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    'clockSeq': 0x1234,
    'mSecs': new Date(2011,11,01).millisecondsSinceEpoch,
    'nSecs': 5678
})   // -> "1d6a6e2e-0457-11e1-9234-0123456789ab"
```

Example: In-place generation of two binary IDs

```dart
// Generate two ids in an array
var myBuffer = new List(32); // -> []
uuid.v1buffer(myBuffer);
// -> [115, 189, 5, 128, 201, 91, 17, 225, 146, 52, 109, 0, 9, 0, 52, 128, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
uuid.v1buffer(myBuffer, offset: 16);  
// -> [115, 189, 5, 128, 201, 91, 17, 225, 146, 52, 109, 0, 9, 0, 52, 128, 115, 189, 5, 129, 201, 91, 17, 225, 146, 52, 109, 0, 9, 0, 52, 128]

// Optionally use uuid.unparse() to get stringify the ids
uuid.unparse(myBuffer);    // -> '73bd0580-c95b-11e1-9234-6d0009003480'
uuid.unparse(myBuffer, offset: 16) // -> '73bd0581-c95b-11e1-9234-6d0009003480'
```

### uuid.v4({Map<String, dynamic> options: null})
### uuid.v4buffer(List<int> buffer, {Map<String, dynamic> options: null, int offset: 0})
Generate and return a RFC4122 v4 UUID.

* `options` - (Map<String, dynamic>) Optional uuid state to apply. Properties may include:

  * `random` - (Number[16]) List of 16 numbers (0-255) to use in place of randomly generated values
  * `rng` - (Function) Random # generator to use. A Custom function that returns an list[16] of byte values or 1 of 2 provided.
  * `namedArgs` - (Map<Symbol, dynamic>) The arguments and values you want to pass to your function.
  * `positionalArgs` - (List) The positional arguments for your functions. if any.

* `buffer` - (List<int>) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing.

v4() returns a string representation of the uuid.

v4buffer() Returns a List<int> `buffer`, if specified, also writes the data to the provided buffer.

Example: Generate string UUID with different RNG method

```dart
import 'package:uuid/uuid_util.dart';
uuid.v4(options: {
  'rng': UuidUtil.cryptoRNG
});
// -> "109156be-c4fb-41ea-b1b4-efe1671c5836"
```

Example: Generate string UUID with different RNG method and named parameters

```dart
import 'package:uuid/uuid_util.dart';
uuid.v4(options: {
  'rng': UuidUtil.mathRNG,
  'namedArgs': new Map.fromIterables([const Symbol('seed')],[1])
});
// -> "09a91894-e93f-4141-a3ec-82eb32f2a3ef"
```

Example: Generate string UUID with different RNG method and positional parameters

```dart
import 'package:uuid/uuid_util.dart';
uuid.v4(options: {
  'rng': UuidUtil.cryptoRNG,
  'positionalArgs': [1]
});
// -> "09a91894-e93f-4141-a3ec-82eb32f2a3ef"
```

Example: Generate string UUID with fully-specified options

```dart
uuid.v4(options: {
  'random': [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
    0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
  ]
});
// -> "109156be-c4fb-41ea-b1b4-efe1671c5836"
```

Example: Generate two IDs in a single buffer

```dart
var myBuffer = new List(32);
uuid.v4buffer(myBuffer);
uuid.v4buffer(myBuffer, offset: 16);
```

### uuid.v5(String namespace, String name, {Map<String, dynamic> options: null})
### uuid.v5buffer(String namespace, String name, List<int> buffer, {Map<String, dynamic> options: null, int offset: 0})
Generate and return a RFC4122 v5 UUID.

* `options` - (Map<String, dynamic>) Optional uuid state to apply. Properties may include:

  * `randomNamespace` - (Boolean) Default True. Returns if you want a v4 generated namespace (true) or NAMESPACE_NIL (false)

* `buffer` - (List<int>) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing.

v5() returns a string representation of the uuid.

v5buffer() Returns a List<int> `buffer`, if specified, also writes the data to the provided buffer.

Example: Generate string UUID with fully-specified options

```dart
uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com');
// -> "c74a196f-f19d-5ea9-bffd-a2742432fc9c"
```

Example: Generate two IDs in a single buffer

```dart
var myBuffer = new List(32);
uuid.v5buffer(Uuid.NAMESPACE_URL, 'www.google.com', myBuffer);
uuid.v5buffer(Uuid.NAMESPACE_URL, 'www.google.com', myBuffer, offset: 16);
```

### uuid.parse(String uuid, {List<int> buffer: null, int offset: 0})

### uuid.unparse(List<int> buffer, {int offset: 0})

Parse and unparse UUIDs

* `id` - (String) UUID(-like) string
* `buffer` - (List) Array or buffer where UUID bytes are to be written. Default: A new Array or Buffer is used
* `offset` - (Int | Number) Starting index in `buffer` at which to begin writing. Default: 0

Example parsing and unparsing a UUID string

```dart
var bytes = uuid.parse('797ff043-11eb-11e1-80d6-510998755d10'); // -> [121, 127, 240, 67, 17, 235, 17, 225, 128, 214, 81, 9, 152, 117, 93, 16]
var string = uuid.unparse(bytes); // -> '797ff043-11eb-11e1-80d6-510998755d10'
```

For more examples or usage, check my test implementations.

## Testing

In dartvm

```
dart test\uuid_test.dart
```

In Browser/flutter

No in browser testing, but I know many use it in Web and Flutter projects.

### Dart2js output size (minified, optimized with -O2)

* v1 only: 56kb
* v4 only: 54kb
* v4 crypto only: 55kb
* v5 only: 67kb
* v1 + v4: 59kb (includes crypto)
* v4 + v5: 68kb (includes crypto)

* ALL: 72kb
* v1 + v5: 70kb

## Release notes

See CHANGELOG
