[![](https://drone.io/daegalus/dart-uuid/status.png)](https://drone.io/daegalus/dart-uuid/latest)

# dart-uuid

Simple, fast generation of [RFC4122](http://www.ietf.org/rfc/rfc4122.txt) UUIDS.

Heavily based on node-uuid by Robert Kieffer (I even copied this readme over and modified it.) 
Primarily becaue it works, well written, and so on.

Features:

* Generate RFC4122 version 1, version 4, or version 5 UUIDs
* Runs in dartvm and hopefully browsers too.
* Cryptographically strong random # generation on all platforms
* [Annotated source code](http://daegalus.github.com/dart-uuid/Uuid/Uuid.html)

Note: The AES implementation used is a custom written implementation, and I can not guarantee that it actually works. This is only until a standard library version for generating crypt strong random bytes is implemented.

## Getting Started

### Notes on Windows (currently)

* Use cmd for pub
* When actually running an application add // to the beginning of your Package-root directory ([Issue 4534](http://code.google.com/p/dart/issues/detail?id=4534))

### Instructions

1. Install and configure pub (http://www.dartlang.org/docs/pub-package-manager/#installing-and-configuring-pub)
2. Open a command line and cd to your projects root folder
3. In your pubspec, add an entry for dart-uuid to your dependencies (example below)
3. pub install
4. If you wish to run tests, go into packages/dart-uuid/ and run 'dart test/uuid_test.dart'

### Pubspec

There are 2 options. Directly from git, or from pub.dartlang.org

pub.dartlang.org: (you can use 'any' instead of a version if you just want the latest always)
```yaml
dependencies:
  uuid: 0.1.1
```

directly from github:
```yaml
dependencies:
  uuid:
    git: https://github.com/Daegalus/dart-uuid.git
```

```dart
#import('https://raw.github.com/Daegalus/dart-uuid/master/lib/uuid.dart'); //pulls it directly from github.
// OR
#import('package:uuid/uuid.dart'); //Uses the local one in ./packages/uuid/lib/uuid.dart

var uuid = new Uuid();
```

Then create some ids ...

```dart
// Generate a v1 (time-based) id
uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// Generate a v4 (random) id
uuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

// Generate a v5 (namespace-name-sha1-based) id
uuid.v5(uuid.NAMESPACE_URL, 'www.google.com'); // -> 'c74a196f-f19d-5ea9-bffd-a2742432fc9c'
```

## API

### uuid.v1({Map options: null, List buffer: null, int offset: 0})

Generate and return a RFC4122 v1 (timestamp-based) UUID.

* `options` - (Map) Optional uuid state to apply. Properties may include:

  * `node` - (List) Node id as List of 6 bytes (per 4.1.6). Default: Randomnly generated ID.
  * `clockseq` - (Number between 0 - 0x3fff) RFC clock sequence.  Default: An internally maintained clockseq is used.
  * `msecs` - (Number) Time in milliseconds since unix Epoch.  Default: The current time is used.
  * `nsecs` - (Number between 0-9999) additional time, in 100-nanosecond units. Ignored if `msecs` is unspecified. Default: internal uuid counter is used, as per 4.2.1.2.

* `buffer` - (List) Array or buffer where UUID bytes are to be written.
* `offset` - (Int) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

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
uuid.v1(buffer: myBuffer);   
// -> [115, 189, 5, 128, 201, 91, 17, 225, 146, 52, 109, 0, 9, 0, 52, 128, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
uuid.v1(buffer: myBuffer, offset: 16);  
// -> [115, 189, 5, 128, 201, 91, 17, 225, 146, 52, 109, 0, 9, 0, 52, 128, 115, 189, 5, 129, 201, 91, 17, 225, 146, 52, 109, 0, 9, 0, 52, 128]

// Optionally use uuid.unparse() to get stringify the ids
uuid.unparse(buffer: myBuffer);    // -> '73bd0580-c95b-11e1-9234-6d0009003480'
uuid.unparse(buffer: myBuffer, offset: 16) // -> '73bd0581-c95b-11e1-9234-6d0009003480'
```

### uuid.v4({Map options: null, List buffer: null, int offset: 0})

Generate and return a RFC4122 v4 UUID.

* `options` - (Map) Optional uuid state to apply. Properties may include:

  * `random` - (Number[16]) List of 16 numbers (0-255) to use in place of randomly generated values
  * `rng` - (Function) Random # generator to use. A Custom function that returns an list[16] of byte values or 1 of 2 provided.

* `buffer` - (List) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

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
uuid.v4(buffer: myBuffer);
uuid.v4(buffer: myBuffer, offset: 16);
```

### uuid.v5(String namespace, String name, {Map options: null, List buffer: null, int offset: 0})

Generate and return a RFC4122 v5 UUID.

* `options` - (Map) Optional uuid state to apply. Properties may include:

  * `randomNamespace` - (Boolean) Default True. Returns if you want a v4 generated namespace (true) or NAMESPACE_NIL (false)

* `buffer` - (List) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

Example: Generate string UUID with fully-specified options

```dart
uuid.v5(uuid.NAMESPACE_URL, 'www.google.com');
// -> "c74a196f-f19d-5ea9-bffd-a2742432fc9c"
```

Example: Generate two IDs in a single buffer

```dart
var myBuffer = new List(32);
uuid.v5(uuid.NAMESPACE_URL, 'www.google.com', buffer: myBuffer);
uuid.v5(uuid.NAMESPACE_URL, 'www.google.com', buffer: myBuffer, offset: 16);
```

### uuid.parse(String uuid, {List buffer: null, int offset: 0})
### uuid.unparse(List buffer, {int offset: 0})

Parse and unparse UUIDs

  * `id` - (String) UUID(-like) string
  * `buffer` - (List) Array or buffer where UUID bytes are to be written. Default: A new Array or Buffer is used
  * `offset` - (Int | Number) Starting index in `buffer` at which to begin writing. Default: 0

Example parsing and unparsing a UUID string

```dart
var bytes = uuid.parse('797ff043-11eb-11e1-80d6-510998755d10'); // -> [121, 127, 240, 67, 17, 235, 17, 225, 128, 214, 81, 9, 152, 117, 93, 16]
var string = uuid.unparse(bytes); // -> '797ff043-11eb-11e1-80d6-510998755d10'
```
## Testing

In dartvm

```
dart test\uuid_test.dart
```

In Browser

N/A as I have not used or tested this in the browser.

### Benchmarking

Not ready for this yet. My code is probably inefficient and messy in many areas. Though it should be pretty quick.

## Release notes
v0.1.1
- Fixing syntax for upcoming breaking changes.

v0.1.0
- Cleanup, changes, and prep for M3.

v0.0.9
- Minor fix with a const RegExp
- Made sure everything builds on latest dart.
- Fixed pubspec to now import unittest from pub instead of sdk.

v0.0.8
- Changed to the new optional paramater syntaxes and usages.
- Adjusted tests for the new function call style due to parameter change.
- Fixed Import/Source/Library statements to the new format.

v0.0.7
- Made changes requested by the Google team to get my package up on pub.dartlang.org

v0.0.6
- Fixed up some code to make it possibly faster and using better Dart practices.
- Cleaned up some documentation.

v0.0.5
- Added Initial AES for Dart (untested if it actually works/matches other AES encryptors)
- Use AES cipher to create crypto strong bytes.

v0.0.4
- Issue wasn't Math.Random() but a bad reseed by me.
- Cleaned up for new Pub layout.

v0.0.3
- Added UUIDv5
- Fixed UUIDv4 bugs
- Added more unit tests
- Found bug in dart's Math.Random(), reported, waiting for fix to fix my code.

v0.0.2
- Initial tests
- Fixed some parser bugs.

v0.0.1
- Initial Release
- No tests
