# Changelog

v4.5.1

* Add `UuidValue.fromNamespace` to let you make constant variants of the namespace, as due to language limitations on Enums, `Namespace.*.uuidValue` can't be constant.
* Added `isV#()`, `isNil()`, and `isMax()` functions to `UuidValue` for matching Dart standards.

v4.5.0

* Change to CryptoRNG by default, you will now need to use MathRNG explicitly if you want speed over security. (thanks @Rexios80)
  * This also works around a regression in the Dart SDK on WASM targets: https://github.com/dart-lang/sdk/issues/56609
* Deprecate the use of `Uuid.NAMESPACE*` and `UuidV5.NAMESPACE`, and switch to using a proper const enum for this. (thanks @bymoye)
  * These will be removed once sufficient time has been made for the deprecation notice to be seen. Most likely v5.0.
  * Please use the new `Namespace` enum in `enums.dart`.
* Re-add `Uuid.NAMESPACE*` and `UuidV5.NAMESPACE` in order to give deprecation time.
* Add missing MAX UUID option from RFC9562
* Add `bytes` getter to `Namespace` enum.
* **[PARTIAL BREAKING CHANGE]** `Namespace` is now an enum, and the entries are now of the `Namespace` type. They all have a `value` function to return the internal `string`

v4.4.2

* Revert meta depenency version upgrade, was breaking flutter_test. (thanks @techouse)

v4.4.1

* Fix UUIDv1 to use millisecondsSinceEpoch instead of microsecondsSinceEpoch. Matches UUIDv6 and passes vector tests.
  
v4.4.0

* Fix MathRNG with Seed being recreated on each use, generating the same list of bytes. (thanks @showband)
* Fix UUIDv5 UTF8 inconsistencies. (thanks @vjamrich)
* Use static state storage for random number generator to prevent MathRNG issue.
* Replace V1, v6, V7, V8 MathRNG preventively, the issue didn't exhibit there due to other factors in the UUID generation (primarily time, and clockseq)

v4.3.3

* Fix UUIDv7 in Javascript
  * Using bitshifts on anything over 32bits get truncated. Switched to a more naive solution for now. Hopefully dart2wasm fixes things.
* Remove unnecessary `_randomData()` functions
* Add `fixnum` package to handle issues in v6, time, and javascript.

v4.3.2

* Added `toFormattedString()` to `UuidValue` to handle cases where the UUID used has no hyphens but you wnt them for output.
* Changed constraint for `meta` to `1.10.0` to not conflict with `flutter_test`

v4.3.1

* Add additional optional parameters for parseing and validation for the new noDashes flag.

v4.3.0

* Update SDK constraints to >= 3.0.0
* Update Meta package to 1.11.0
* **[PARTIAL BREAKING CHANGE]** Changing MathRNG implementation to use 4 nextints, instead of 16 for optimization to match CryptoRNG. This will affect regenerating the same UUID from the same seed.
  * If you need the old behavior, please use MathRNGDeprecated() instead.

v4.2.2

* Fix CryptoRNG on Web generating a random number 0 always
* Add NoDashes support to the validator so that it validates UUIDs that don't have dashes but are otherwise valid.

v4.2.1

* Lower `meta` dependency to 1.9.1 so that it is compatible with Flutter Stable 3.13

v4.2.0

* **[BREAKING CHANGE]** Deprecate default/empty `UuidValue` constructor because it has a different behavior from the 3.x package version. (Thanks @davidmartos96)
  * Use `UuidValue.fromString()` instead, which has the same behavior. If you need to define a const `UuidValue` you can use `UuidValue.raw()`, but making sure the value is lowercase.
* Mark `UuidValue` as experimental with an annotation. (Thanks @Kaival-Patel)

v4.1.0

* **[BREAKING CHANGE]** In order to enforce lowercase strings in `UuidValue`, I have made the default const constructor private, and added a `fromString` factory constructor. Please migrate any direct `UuidValue()` usage to `UuidValue.fromString()` or `UuidValue.withValidation()`.

v4.0.0

* toBytes on UuidValue now does not validate by default, but has the option `validate` that can be set to true if you need validation when calling it. (Thanks @Erhannis)

v4.0.0-beta3-1

* Ensure that any custom RNG implementation produces Uint8Lists of length 16. (Thanks @wph44)

v4.0.0-beta3

* **[BREAKING CHANGE]** Replacing UuidUtil rng functions with RNG classes.
  * UuidUtil.mathRNG() is replaced with MathRNG().generate().
  * UuidUtil.cryptoRNG() is replaced with CryptoRNG().generate().
  * Custom crypto implementations just need to implement the `RNG` abstract class.
  * namedArgs and positionalArgs have been removed from GlobalOptions
  * You may use LegacyRNG() if you need to use the old function style RNG.
* Fix a bug with the usage of Uint64List in Dart2js by not using it. (Thanks @hambergerpls)

v4.0.0-beta2

* **[BREAKING CHANGE]** The `Uuid` class now takes a `GlobalOptions` class instead of a `Map<String, dynamic>`.
* Added options classes to eventually replace the Map parameter.
* **[BREAKING CHANGE]** Since v6,v7,v8 are new for 4.0, I have made it so they only take the new options class.
* Reworked the constructors, and moved state out of the classes. Const is now supported properly again
* Switched tests to use const Uuid to catch regressions.
* Set the `options` parameter in v1, v4, and v5 to deprecated.
* **[BREAKING CHANGE]** Make UuidValue properly const also
  * Can no longer run validation on the const variant.
  * Added UuidValue.withValidation() to handle this usecase, it can't be const.
  * If you need const and validation. Create the UuidValue with the UUID, then call the `validate()` function on it.

v4.0.0-beta1-1

* Mostly cleanup, linting, updating depedencies, etc.

v4.0.0-beta1

* Break up versions into individual objects that can be used standalone.
* No more colliding global states between versions
* Added UUID v6, v7, v8 from the new RFC.
* Add `time`, `version`, and `variant` functions to UuidValue

v3.0.7

* Fixed parse to allow buffers larger than 16 bytes to be used. [Thanks @hoylen]

v3.0.6

* Enable `avoid_dynamic_calls` linting and fix appropriately. (Thanks @devoncarew)

v3.0.5

* Global options were incorrectly being ignored. #76 (Thanks @Skycoder42)
* V4 Global Options were incorrectly named. #76 (Thanks @Skycoder42)
* Global state was static, not per instance. #76 (Thanks @Skycoder42)
* Additional tests to make sure the above doesn't regress. #76 (Thanks @Skycoder42)

v3.0.4

* `isValidUUID` now handles some Microsoft GUIDs better that only deviate in the Variant setting. (Thanks @FluentChange)
* Improve error output so that it better explains how to handle the above change in your code if you encounter it. (Thanks @FluentChange)
* Improve validation logic to better handle multiple validation cases, error output, and feedback to developers. (Thanks @FluentChange)

v3.0.3

* [Experimental] Fixed UuidValue to properly check things are valid. (Thanks @FlorianUlivi)
* [Experimental] Added new constructors `fromByteList` and `fromList` to `UuidValue`
* [Experimental] Added `==` operator override and hashcode override. (Thanks @giorgiofran for suggestion)
* Added `parseAsByteList` to offer a direct output to `Uint8List`
* \[Experimental\]\[BREAKING CHANGE\] Change `toBytes` in `UuidValue` to return `Uint8List` instead of `List<int>`
* \[Experimental\]\[BREAKING CHANGE\] `isValidUuid` function signature has changed, now takes 2 optional parameters `fromString` and `fromList` that will do the appropriate validation on different sources.

v3.0.2

* [Experimental] Add flags to UuidValue constructor and parse to disable validation of the UUID, primarily to allow Microsoft GUIDs to not break things.

v3.0.1

* Fix RNG to not need shuffling and improve performance/memory usage (Thanks @julemand101)

v3.0.0

* Release nullsafety version.

v3.0.0-nullsafety.1

* [BREAKING CHANGE] Changed `parse()` to throw a FormatException instead of returning NIL uuids or partially handled UUIDs.
* Changed `Uuid` constructor to be constant, and adjusted all the code accordingly.
* New `isValidUUID` function for validating UUIDs.
* [BREAKING CHANGE] `parse` and `unparse` are now static functions.
* [Exprimental] Object version of the UUID instead of a string or list of bytes.

v3.0.0-nullsafety.0

* Migrate package to null-safety, increase minimum SDK version to 2.12 (Thanks @simolus3)

v2.2.1 & v2.2.2

* Update pedantic analyzer options, fix linting issues, and increase SDK minimium to 2.2 to support set literals

v2.2.0

* fix v1 clock high to properly ignore c and d variants. (fixes #47)
* update example

v2.1.0

* Shuffle mathRNG bytes so that they don't generate duplicates. Will affect codes generated by a static seed.

v2.0.4

* Remove new keyword where not needed. (forgot to rerun before releasing 2.0.3)

v2.0.3

* Do some analyzer fixes and formatting/renaming.

v2.0.2

* Merge fix for time precision loss in V1 time based UUIDs.

v2.0.1

* Fix regression where CryptoRNG was default, moved back to MathRNG
* Added ability to set RNG globally to skip having to set it in every function call
* Allows you to set the v1 clock sequence, nodeID, and seed bytes to use cryptoRNG separately from globalRNG.

v2.0.0

* Fixup the API to split out Buffer and Non-buffer usages.
* Switch to build in Random.secure() and remove custom AES implementation.
* Less dependencies.
* Docs
* Cleanup

v1.0.3

* Fix SDK constraints to allow Dart 2.0 stable.

v1.0.2

* Fix constants breaking in Dart 1.x, need to be backwards compatible.

v1.0.1

* Fix constants to match Dart 2.0 spec

v1.0.0

* Cleanup and prep for dart 2.0
* Has been stable for a long time, upgrading to 1.0 version

v0.5.3

* Merged pull request to support crypto 2.0.0
* Support convert 2.0.0

v0.5.2

* Merged pull request to upgrade crypto library to 1.0.0.

v0.5.1

* Merged pull request for various updates and cleanup.

v0.5.0

* Reverted back to custom AES implementation. Moved RNG methods to UuidUtil (import 'package:uuid/uuid_util.dart')
* Fixed a potential bug with custom RNG method passing and added more ways to pass in custom RNG functions.
* Cleaned up and refactored some stuff. Using only v1 is only 67kb of js, Using only v4 is 97kb. Using crypt v4 is 118kb. Using both v1 and non-crypto v4 is 126kb.
* Default RNG for v4 is now the mathRNG function. If you wish to use cryptoRNG, import UuidUtil and pass in cryptoRNG.
* Updated README.md with more examples and usages.
* Updated Tests.

v0.4.1

* Changed initCipher location so that if you ever only use v1 UUIDs, you will get a very small Dart2JS output compared to v4 or v5 that do load it.

v0.4.0

* Use Cipher base.dart, as I don't need entropy generators, and this allows me to merge client/server together again
  and fix many issues this caused.

v0.3.2

* Fix import/library bug.

v0.3.1

* Update pubspec to allow installation of the latest Cipher 0.7.

v0.3.0

* Updated to latest Cipher at 0.6.0. This created a breaking change in the imports. Please make sure you update your code.
* Fixed problem when creating v4 UUIDs too fast, it would create duplicate UUIDs.

v0.2.2

* Pegging cipher to 0.4.0 temporarily for browser support

v0.2.1

* Using new version of cipher.

v0.2.0

* Dart 1.0 Readiness
* Switched from custom AES to [cipher](https://github.com/izaera/cipher) package AES.

v0.1.6

* Adjusting usage of constants.
* Fixing tests.

v0.1.5

* Stupid typo on import.

v0.1.4

* Fixing Crypto package move.

v0.1.3

* Fixing language changes.

v0.1.2

* Fix change of charCodes to codeUnits

v0.1.1

* Fixing syntax for upcoming breaking changes.

v0.1.0

* Cleanup, changes, and prep for M3.

v0.0.9

* Minor fix with a const RegExp
* Made sure everything builds on latest dart.
* Fixed pubspec to now import unittest from pub instead of sdk.

v0.0.8

* Changed to the new optional paramater syntaxes and usages.
* Adjusted tests for the new function call style due to parameter change.
* Fixed Import/Source/Library statements to the new format.

v0.0.7

* Made changes requested by the Google team to get my package up on pub.dartlang.org

v0.0.6

* Fixed up some code to make it possibly faster and using better Dart practices.
* Cleaned up some documentation.

v0.0.5

* Added Initial AES for Dart (untested if it actually works/matches other AES encryptors)
* Use AES cipher to create crypto strong bytes.

v0.0.4

* Issue wasn't Math.Random() but a bad reseed by me.
* Cleaned up for new Pub layout.

v0.0.3

* Added UUIDv5
* Fixed UUIDv4 bugs
* Added more unit tests
* Found bug in dart's Math.Random(), reported, waiting for fix to fix my code.

v0.0.2

* Initial tests
* Fixed some parser bugs.

v0.0.1

* Initial Release
* No tests
