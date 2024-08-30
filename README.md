# uuid

**Version 4.x.x is a complete redesign of the underlying setup, but tries to be API compatible or similar to 3.x.**

**UuidValue is still Experimental and the API for it is in flux, please pay attention to changelogs and versions.**

[![Build Status](https://github.com/Daegalus/dart-uuid/workflows/Dart/badge.svg?branch=main&event=push)](https://github.com/Daegalus/dart-uuid/actions)

Simple, fast generation of [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) and [RFC9562](https://www.rfc-editor.org/rfc/rfc9562.html) UUIDs.

Features:

* Generate RFC4122 version 1, version 4, or version 5 UUIDs
* Supports RFC9562 version 6, version 7, and version 8
* Runs in web, server, and flutter
* Cryptographically strong random number generation on all platforms
* [Documentation](https://daegalus.github.io/dart-uuid/index.html)

## Getting Started

### Instructions

1. Open a command line and cd to your projects root folder
2. In your pubspec, add an entry for dart-uuid to your dependencies (example below)
3. pub install
4. If you wish to run tests, go into packages/dart-uuid/ and run 'dart test/uuid_test.dart'

### Pubspec

```yaml
dependencies:
  uuid: ^4.4.2
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
uuid.v5(Uuid.NAMESPACE_URL, 'www.google.com'); // -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'
```

## Documentation

For documentation, please visit the [Documentation](https://daegalus.github.io/dart-uuid/index.html) page. Examples are included for most functions and classes.

For more complex examples and other usages, please look at the [tests](test/uuid_test.dart).

## Release notes

See [CHANGELOG](CHANGELOG.md)
