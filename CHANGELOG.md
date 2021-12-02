> **Legend:** :boom: _Breaking Change_ | :fire: _Major Feature_ | :rocket: _Feature_ | :bug: _Bug_

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/breeffy/react-native-monorepo/compare/v0.8.0...HEAD)

> No changes

## [v0.8.0](https://github.com/breeffy/react-native-monorepo/compare/v0.7.0...v0.8.0)

## Packages

### @breeffy/pickers

- :rocket: **New:** `convertItemToNumber` property to allow items to be strings convertible to numbers [142](https://github.com/breeffy/react-native-monorepo/issues/142)

## Storybook

- :rocket: **Add:** Showcase `convertItemToNumber` with `Intl.NumberFormat` API

## [v0.7.0](https://github.com/breeffy/react-native-monorepo/compare/v0.6.2...v0.7.0)

## Packages

### @breeffy/calendars

- :rocket: **New:** `initialSelectedDates` property to pass initial selected dates [136](https://github.com/breeffy/react-native-monorepo/issues/136)
- :rocket: **New:** `allowDeselectLastSelectedDate` to enable unselection of last selected date [138](https://github.com/breeffy/react-native-monorepo/issues/138)

## Storybook

- :rocket: **Add:** Showcase `initialSelectedDates` calendar property

## [v0.6.2](https://github.com/breeffy/react-native-monorepo/compare/v0.6.1...v0.6.2)

## Packages

### @breeffy/calendars

- :bug: **Fix:** Allow `select` and `unselect` dates using ref [132](https://github.com/breeffy/react-native-monorepo/issues/132)
- :rocket: **New:** `animatedFlatListRef` property to get internal native animated FlatList, which is responsible for scrolling [132](https://github.com/breeffy/react-native-monorepo/issues/132)

## Storybook

- :rocket: **Add:** Showcase how to `select` dates (programmatically) on **Calendar** component using `ref`

## [v0.6.1](https://github.com/breeffy/react-native-monorepo/compare/v0.6.0...v0.6.1)

## Packages

### @breeffy/icons

- :bug: **Fix:** **Icon** don't throw exception if `testID` property is passed [127](https://github.com/breeffy/react-native-monorepo/issues/127).

## [v0.6.0](https://github.com/breeffy/react-native-monorepo/compare/v0.5.0...v0.6.0)

## Packages

### @breeffy/icons

- :fire: **New:** **Icon** component to show [FontAwesome](https://fontawesome.com) icons. Supports **duotone** icons.

### @breeffy/elements

- :rocket: **New:** **Layout** component to easily build grid-like layouts. It's usage can be found in [Icon](https://github.com/breeffy/react-native-monorepo/blob/d5e040d0d4a4a1aed7625062ccf44ecf88374367/packages/example-app/src/stories/Icon.stories.tsx#L25) story.

### @breeffy/utils

- :rocket: **New:** `enableLogging` function to enable logging for debugging purposes.
- :rocket: **New:** `configureLogger` logger factory to print debug information (_disabled_ in release builds)

## Storybook

- :fire: **Add:** preview **Icon** component.

## License

Add [MIT license mention](https://github.com/breeffy/react-native-monorepo/blob/d5e040d0d4a4a1aed7625062ccf44ecf88374367/LICENSE#L183) for code derived from [react-native-fontawesome](https://github.com/FortAwesome/react-native-fontawesome).

## [v0.5.0](https://github.com/breeffy/react-native-monorepo/compare/v0.4.1...v0.5.0)

## Packages

### @breeffy/calendars

> No changes

### @breeffy/pickers

- :fire: **New:** generic **ItemPicker** component which allows to create custom _cross-based_ pickers. _NumberPicker_ and _CardPicker_ components are based on it.
- :fire: **New:** wheel-picker **NumberPicker** to show _any number ranges_, including major time intervals.
- :fire: **New:** carousel **CardPicker** component _with custom interpolations / effects_.

### @breeffy/elements

- :fire: **New:** _stateless (programmatic)_ **Toggle** component, which is _fully interruptuble_ with animations and smooth color transitions between states.
- :fire: **New:** _stateful_ **ToggleWithState** component, which is _fully interruptuble_ with animations and smooth color transitions between states.

## Storybook

- :fire: **Add:** preview **Calendar** component.
- :fire: **Add:** preview **NumberPicker** component _with hours_.
- :fire: **Add:** preview **CardPicker** component with images and _different animation effects_ (interpolations).
- :fire: **Add:** preview **Toggle** component.
- :fire: **Add:** preview **ToggleWithState** component.
