# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/breeffy/react-native-calendar/compare/0.4.1...HEAD)

### Wheel Pickers

> New **NumberPicker** and **ItemPicker** wheel picker components are introduced in this release.

- :rocket: **Add:** `currentRawIndex` property to provide raw index without precision loss or rounding. ([#62](https://github.com/breeffy/react-native-calendar/pull/62))
- :rocket: **Add:** `roundMode` property to round `currentIndex` if it's integer (`precision` is `0`). ([#64](https://github.com/breeffy/react-native-calendar/pull/64))
