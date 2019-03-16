[![Build Status](https://api.cirrus-ci.com/github/truongsinh/dart-uuid.svg)](https://cirrus-ci.com/github/truongsinh/dart-uuid/master)
[![codecov](https://codecov.io/gh/truongsinh/dart-uuid/branch/master/graph/badge.svg)](https://codecov.io/gh/truongsinh/dart-uuid)
[![pub package](https://img.shields.io/pub/v/uuid_enhanced.svg)](https://pub.dartlang.org/packages/uuid_enhanced)

# dart-uuid

**Version 3.0.0 has breaking API changes**

Simple, fast generation of [RFC4122](http://www.ietf.org/rfc/rfc4122.txt) UUIDs.

Features:

* Generate RFC4122 version 1, version 4, or version 5 UUIDs
* Runs in web, server, and flutter
* Cryptographically strong random number generation on all platforms
  * **Defaults to non-crypto generator, see UuidUtil for cryptoRNG**
* [API](https://pub.dartlang.org/documentation/uuid_enhanced/latest)

## Getting Started

### Instructions

1.  Open a command line and cd to your projects root folder
2.  In your pubspec, add an entry for dart-uuid to your dependencies (example below)
3.  pub install
4.  If you wish to run tests, go into packages/dart-uuid/ and run 'dart test/uuid_test.dart'

### Pubspec

pub.dartlang.org: (you can use 'any' instead of a version if you just want the latest always)

```yaml
dependencies:
  uuid_enhanced: ^3.0.0
```

```dart
import 'package:uuid_enhanced/uuid_enhanced.dart';
```

Then create some ids ...

```dart
// Generate a v1 (time-based) id
Uuid.fromTime(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// Generate a v4 (random) id
Uuid.randomUuid(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

// Generate a v4 (crypto-random) id
Uuid.randomUuid(random: UuidUtil.cryptoRNG());
// -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

// Generate a v5 (namespace-name-sha1-based) id
Uuid.fromName('www.google.com', namespace: Uuid.NAMESPACE_URL);
// -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'
```

[See more API](https://pub.dartlang.org/documentation/uuid_enhanced/latest/)

## Testing

In dartvm

```
dart test\uuid_test.dart
```

### Benchmarking

Its pretty quick, but no official benchmarking.

## Release notes

See CHANGELOG
