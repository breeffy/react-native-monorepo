# ChangeLog

### [0.4.1](https://github.com/breeffy/react-native-svg-icons/compare/v0.4.0...v0.4.1) (2020-01-08)

### Added

- Additional assertions to SvgIcon were added
- Declare to be compatible with react-native-svg 11.x and 12.x versions

### Internal

- Use Typescript 3.8.3
- Jest tests refactoring
- New jest assertion test was added
- Use Typescript for Jest tests
- GitHub Actions additionally tests compatibility against react-native-svg 11.x and 12.x versions

### [0.4.0](https://github.com/breeffy/react-native-svg-icons/compare/v0.3.0...v0.4.0-alpha.0) (2020-01-08)

### BREAKING CHANGE

- FontAwesomeIcon was renamed to SvgIcon

### [0.3.3](https://github.com/breeffy/react-native-svg-icons/compare/v0.3.2...v0.3.3) (2020-01-06)

### Bug Fixes

- errors in ci build ([1281e41](https://github.com/breeffy/react-native-svg-icons/commit/1281e41e6bcc403579bb04c364911462f2ea2753))

### [0.3.2](https://github.com/breeffy/react-native-svg-icons/compare/v0.3.1...v0.3.2) (2020-01-06)

### Bug Fixes

- publish package to GitHub Packages automatically ([470276f](https://github.com/breeffy/react-native-svg-icons/commit/470276fea864e961acd44091d1abc94512fe7692))

### [0.3.1](https://github.com/breeffy/react-native-svg-icons/compare/v0.3.0...v0.3.1) (2020-01-06)

### Bug Fixes

- update ci to generate changelog ([ef9041e](https://github.com/breeffy/react-native-svg-icons/commit/ef9041ed13779922b9530c59f0465f5e936aeda2))

## [0.3.0](https://github.com/breeffy/react-native-svg-icons/releases/tag/v0.3.0) - 2020-01-06

### Added

- Code was rewritten using Typescript
- Project was relicensed from MIT to Apache-2.0
- Property "style" supports array of styles

### Changed

- Extra properties to FontAwesomeIcon are not supported (AssertionError is thrown)
- Property "icon" is required (AssertionError is thrown)

### Removed

- Properties "width" and "height" were removed, use "size" property instead

## [0.2.0](https://github.com/breeffy/react-native-svg-icons/releases/tag/0.2.0) - 2019-12-13

### Added

- TypeScript definition file #17

### Changed

- Loosened peer dependencies to prevent incorrect version warnings

## [0.1.0](https://github.com/breeffy/react-native-svg-icons/releases/tag/0.1.0) - 2019-01-07

### Changed

- Add color prop
  -- Delete color property on style object after resolving the fill color to avoid ambiguity
  -- Remove any fill="currentColor" attributes returned by fontawesome-svg-core

- Add size prop
  -- Deprecate height and width props

## [0.0.4](https://github.com/breeffy/react-native-svg-icons/releases/tag/0.0.4) - 2018-10-13

### Changed

- Internal clean-up, leveraging recent developments in react-native-svg

## [0.0.3](https://github.com/breeffy/react-native-svg-icons/releases/tag/0.0.3) - 2018-10-11

### Added

- Add support for masking and power transforms

## [0.0.2](https://github.com/breeffy/react-native-svg-icons/releases/tag/0.0.2) - 2018-10-11

### Added

- Add style prop with initial special-case support for setting icon color

- Re-initialize example app to allow for using it with `react-native-svg` 7.x

## [0.0.1](https://github.com/breeffy/react-native-svg-icons/releases/tag/0.0.1) - 2018-10-08

### Added

- Initial, minimal implementation, based on [@fortawesome/react-fontawesome](https://github.com/FortAwesome/react-fontawesome/)
