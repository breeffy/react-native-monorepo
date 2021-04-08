# React Native Calendar

![GitHub package.json version](https://img.shields.io/github/package-json/v/breeffy/react-native-calendar?color=blue&style=flat-square)
![npm](https://img.shields.io/npm/v/@breeffy/react-native-calendar?color=yellow&label=npm%40latest&style=flat-square) [![npm](https://img.shields.io/github/license/breeffy/react-native-calendar?color=green&style=flat-square)](https://github.com/breeffy/react-native-calendar/blob/main/LICENSE) [![npm](https://img.shields.io/badge/types-Typescript-blue?style=flat-square)](https://www.npmjs.com/package/@gorhom/bottom-sheet)

## Overview

High-quality, modern, fast interactive calendar built specifically with performance in mind. Supports gestures and animations.

![React Native Calendar](./preview.gif)

## Main Features

| Feature                  |       Status       | Description                                                                                                         |
| ------------------------ | :----------------: | ------------------------------------------------------------------------------------------------------------------- |
| **Gregorian** calendar   | :heavy_check_mark: | Supports gregorian calendar                                                                                         |
| **Horizontal** calendar  |   :construction:   | Horizontal calendar, allows scrolling months horizontally                                                           |
| **Vertical** calendar    |        :x:         | Vertical calendar, allows scrolling months vertically                                                               |
| **Infinite** calendar    |   :construction:   | Allows rendering / scrolling practically infinite amount of months. You can show more than **12000 months**         |
| **Selection** mode       | :heavy_check_mark: | Supports `singleDay` (can select only one day in calendar) or `multipleDays` (can select multiple days in calendar) |
| **Pagination** mode      | :heavy_check_mark: | Supports pagination mode                                                                                            |
| **Themes**               | :heavy_check_mark: | Supports custom themes to customize calendar appearance                                                             |
| **Dark mode**            | :heavy_check_mark: | Supports dark mode by using `CalendarThemeDark` theme                                                               |
| **Blank-free** scrolling |   :construction:   | If scrolling is happening faster than calendar can render months, it will replace them with `month-year` text       |
| **Gestures**             | :heavy_check_mark: | Supports gestures / swipes to scroll calendar                                                                       |
| **Animations**           | :heavy_check_mark: | Supports high-performant native animations based on scroll position                                                 |

:heavy_check_mark: - done
:construction: - in progress
:x: - not supported

## Supported Versions
> React Native ecosystem is evolving rapidly, fixing and introducing many bugs. For example **react-native-calendar** [doesn't work for React Native `0.63.3`](https://github.com/facebook/react-native/issues/30533) because this version doesn't support **ScrollView** `contentOffset` property for Android, while [`0.63.4` should work](https://github.com/facebook/react-native/commit/ed29ba13f97f240c91fdf6c0ef3fb601046697b9). 

Because of this we provide a table of supported versions.
| Calendar                   |       React Native        |   React Native Reanimated   | React Native Gesture Handler |
| :------------------------: | :-----------------------: | :-------------------------: | :--------------------------: |
| **0.3.0**, **0.4.0**                   | 0.64.0                | 2.1.0                   | 1.10.3                   |

> [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) are **peerDependencies** and need to be installed beforehand.

## Usage

```ts
import React from 'react';
import { View } from 'react-native';
import { Calendar } from '@breeffy/react-native-calendar';

export const CalendarSheet = () => {
  return (
    <Calendar
      selectionMode="singleDay"
      scrollMode="oneMonth"
      monthsBefore={12}
      monthsAfter={24}
    />
  );
};
```

## Calendar properties

```ts
type CalendarProps = {
  /**
   * Initial month to be shown.
   * If not provided, year and month of current local datetime will be selected.
   */
  initialCalendarYearAndMonth?: CalendarYearAndMonth;

  /**
   * Amount of months, before initial year and month,
   * which will be shown in a calendar.
   * @defaultValue `50`
   */
  monthsBefore?: number;

  /**
   * Amount of months, after initial year and month,
   * which will be shown in a calendar.
   * @defaultValue `50`
   */
  monthsAfter?: number;

  /**
   * How much days can be selected simultaneously.
   * @defaultValue `singleDay`
   */
  selectionMode?: 'singleDay' | 'multipleDays';

  /**
   * How much months can be scrolled over.
   * @defaultValue `multipleMonths`
   */
  scrollMode?: 'oneMonth' | 'multipleMonths' | 'anyOffset';

  /**
   * How quickly the calendar scrolling decelerates after the user lifts their finger.
   * @defaultValue `normal`
   */
  scrollModeDeceleration?: FlatListProps<any>['decelerationRate'];

  /**
   * Active (current) calendar day.
   * If provided, will be highlighted in active color.
   */
  activeCalendarDay?: CalendarDate;

  /**
   * Theme object to customize calendar appearance
   */
  theme?: CalendarTheme;

  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>;
};
```

Copyright © 2020-2021, [Victor Malov](https://github.com/likern).
