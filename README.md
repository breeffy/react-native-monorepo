# React Native Calendar

[![npm](https://img.shields.io/github/license/breeffy/react-native-calendar)](https://github.com/breeffy/react-native-calendar/blob/main/LICENSE) ![github](https://img.shields.io/badge/license-Commercial-orange) [![npm](https://img.shields.io/badge/types-included-blue)](https://www.npmjs.com/package/@gorhom/bottom-sheet)

## Overview

High-quality, modern, fast interactive calendar built specifically with performance in mind. Supports gestures and animations.

## Main Features

| Feature                  |       Status       | Description                                                                                                         |
| ------------------------ | :----------------: | ------------------------------------------------------------------------------------------------------------------- |
| **Gregorian** calendar   | :heavy_check_mark: | Supports gregorian calendar                                                                                         |
| **Horizontal** calendar  |   :construction:   | Horizontal calendar, allows scrolling months horizontally                                                           |
| **Vertical** calendar    |        :x:         | Vertical calendar, allows scrolling months vertically                                                               |
| **Infinite** calendar    |   :construction:   | Allows rendering / scrolling practically infinite amount of months. You can show more than **12000 months**         |
| **Selection** mode       | :heavy_check_mark: | Supports `singleDay` (can select only one day in calendar) or `multipleDays` (can select multiple days in calendar) |
| **Pagination** mode      | :heavy_check_mark: | Supports pagination mode                                                                                            |
| **Themes**               |        :x:         | Supports custom themes to customize calendar appearance                                                             |
| **Dark mode**            |        :x:         | Supports dark mode                                                                                                  |
| **Blank-free** scrolling |   :construction:   | If scrolling is happening faster than calendar can render months, it will replace them with `month-year` text       |
| **Gestures**             | :heavy_check_mark: | Supports gestures / swipes to scroll calendar                                                                       |
| **Animations**           | :heavy_check_mark: | Supports high-performant native animations based on scroll position                                                 |

:heavy_check_mark: - done
:construction: - in progress
:x: - not supported

## Dependencies

Under the hood **react-native-calendar** uses [react-native-reanimated v2](https://github.com/software-mansion/react-native-reanimated) and [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler). These packages need to be installed before using **react-native-calendar**.

## Licenses

**react-native-calendar** is licensed under dual [GNU AGPL-3.0](LICENSE) and **Commercial** licenses.
If you want to use **Commercial** license, contact at sales@breeffy.com.

Copyright © 2020-2021, [Victor Malov](https://github.com/likern).
