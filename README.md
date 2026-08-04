# uuid

**Version 4.x.x is a complete redesign of the underlying setup, but tries to be API compatible or similar to 3.x.**

[![Build Status](https://github.com/Daegalus/dart-uuid/workflows/Dart/badge.svg?branch=main&event=push)](https://github.com/Daegalus/dart-uuid/actions)

Simple, fast generation of [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) and [RFC9562](https://www.rfc-editor.org/rfc/rfc9562.html) UUIDs.

Features:

* Generate RFC4122 version 1, version 4, or version 5 UUIDs
* Supports RFC9562 version 6, version 7, and version 8
* Optional monotonic version 7 generator
* Runs in web, server, and flutter
* Cryptographically strong random number generation on all platforms
* Validate and parse generic 128-bit hexadecimal values without enforcing UUID version or variant bits
* [Documentation](https://daegalus.github.io/dart-uuid/index.html)

## Getting Started

### Instructions

1. Open a command line and cd to your projects root folder
2. In your pubspec, add an entry for dart-uuid to your dependencies (example below)
3. pub install
4. If you wish to run tests, go into packages/dart-uuid/ and run 'dart test'

### Pubspec

```yaml
dependencies:
  uuid: ^4.6.0
```

```dart
import 'package:uuid/uuid.dart';

var uuid = Uuid();
```

Then create some ids ...

```dart
// Generate a v1 (time-based) id
uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// Generate a v4 (random) id
uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

// Generate a v5 (namespace-name-sha1-based) id
uuid.v5(Namespace.url.value, 'www.google.com'); // -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'
```

### Structural 128-bit parsing

Use the explicit format APIs when the input must be a 128-bit hexadecimal
value but UUID version and variant bits should not be enforced.

```dart
const value = '019f13f5-53cb-b219-ca3e-4b569376f32b';

Uuid.isValidUUIDFormat(fromString: value); // true
Uuid.parseHex128(value); // 16 bytes

const withoutDashes = '019f13f553cbb219ca3e4b569376f32b';
Uuid.parseHex128(withoutDashes, noDashes: true); // 16 bytes
```

### Monotonic v7

`uuid.v7()` fills everything after the millisecond timestamp with random bits,
so ids created in the same millisecond have no defined order. `UuidV7Monotonic`
replaces the most significant of those random bits with a 16-bit counter
(RFC 9562 §6.2, Method 1), so ids from one generator sort in creation order
under an ordinary string comparison (or byte comparison if parsed).

```dart
import 'package:uuid/uuid.dart';
import 'package:uuid/v7monotonic.dart';

// Plain v7, both created in the same millisecond. Creation order and sort
// order happen to disagree.
const uuid = Uuid();
uuid.v7(); // -> '019fcd85-9fac-7f64-8711-97a4665f1adc'
uuid.v7(); // -> '019fcd85-9fac-715d-80d0-556404fa23ea'

// Monotonic, also within one millisecond. The counter defines the order.
final generator = UuidV7Monotonic();
generator.generate(); // -> '019fcd85-9fb3-7488-a625-f7a830c2dcf7'
generator.generate(); // -> '019fcd85-9fb3-7488-a87c-0c31456d733b'
```

Import the generator directly; it is not exported from `uuid.dart`.

Some limits of the monotonic generator:

1. Ordering only holds within one generator instance. v7 cannot order
   concurrent generators against each other without shared state.
2. Ids strictly increase unless the clock moves backward by more than 10
   seconds, which resets ordering to the new clock reading. Ids stay unique
   across the reset.
3. Ids are not secret tokens. The counter increments by exactly +1 within a
   millisecond, so an observer holding one id can predict the next. Use v4
   if unguessability matters.

## Documentation

For documentation, please visit the [Documentation](https://daegalus.github.io/dart-uuid/index.html) page. Examples are included for most functions and classes.

For more complex examples and other usages, please look at the [tests](test/uuid_test.dart).

## Release notes

See [CHANGELOG](CHANGELOG.md)
