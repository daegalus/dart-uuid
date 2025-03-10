# UUID Plus

> **⚠️ FORK NOTICE: This repository is a fork of the [original dart-uuid](https://github.com/Daegalus/dart-uuid) by [Daegalus](https://github.com/Daegalus). maintained by Input Output Global, Inc. (IOG)** 
>
> Original [README](https://github.com/Daegalus/dart-uuid/blob/main/README.md), [License](https://github.com/Daegalus/dart-uuid/blob/main/LICENSE) and [Documentation](https://daegalus.github.io/dart-uuid/index.html).

Simple, fast generation of [RFC4122](https://www.ietf.org/rfc/rfc4122.txt) and [RFC9562](https://www.rfc-editor.org/rfc/rfc9562.html) UUIDs.

- [UUID Plus](#uuid-plus)
  - [Getting Started](#getting-started)
    - [Instructions](#instructions)
    - [Pubspec](#pubspec)
  - [Testing](#testing)
    - [Running Tests in Native Environment](#running-tests-in-native-environment)
    - [Running Tests in Browser Environment](#running-tests-in-browser-environment)
  - [Release notes](#release-notes)
  - [Attribution](#attribution)

Features:

* Generate RFC4122 version 1, version 4, or version 5 UUIDs
* Supports RFC9562 version 6, version 7, and version 8
* Supported Platforms: Web, Server, iOS, Android, Linux, MacOS, Windows
* Cryptographically strong random number generation on all platforms

## Getting Started

### Instructions

### Pubspec

```yaml
dependencies:
  uuid_plus: ^0.1.0
```

```dart
import 'package:uuid_plus/uuid_plus.dart';

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

## Testing

The library comes with a comprehensive test suite. Here's how to run the tests:

### Running Tests in Native Environment

To run all tests:

```bash
dart test
```

To run specific tests:

```bash
# Run a specific test file
dart test test/uuid_test.dart

# Run a specific test group (by name)
dart test test/uuid_test.dart --name="Version 7 Tests"

# Run a specific individual test 
dart test test/uuid_test.dart --name="IDs created at same mSec are different"

# Run tests matching a pattern
dart test test/uuid_test.dart --name="timestamp"

# Run multiple test files
dart test test/uuid_test.dart test/other_test.dart
```

### Running Tests in Browser Environment

To run all tests:

```bash
# Run all tests in Chrome
dart test -p chrome

# Run only UUID v7 tests in Chrome
dart test test/uuid_test.dart --name="Version 7 Tests" -p chrome

# Run on specific browsers
dart test -p chrome,firefox

# Run with increased timeout for slow tests
dart test -p chrome --timeout=2x
```

For debugging in the browser:

```bash
# Basic debugging - pauses for you to connect DevTools
dart test test/uuid_test.dart -p chrome --pause-after-load

# Debug a specific test group
dart test test/uuid_test.dart --name="Version 7 Tests" -p chrome --pause-after-load --timeout=10x

# Debug a specific test with extended timeout
dart test test/uuid_test.dart --name="UUID v7 has mathematically sufficient random bits" -p chrome --pause-after-load --timeout=10x
```

This will open Chrome and pause execution, allowing you to use Chrome DevTools for debugging.


## Release notes

See [CHANGELOG](CHANGELOG.md)

## Attribution

This package is a fork of [dart-uuid](https://github.com/Daegalus/dart-uuid) originally created by Yulian Kuncheff. 

The original package is licensed under the MIT License. This fork maintains the same license with additional copyright notice for Input Output Global, Inc. (IOG).
