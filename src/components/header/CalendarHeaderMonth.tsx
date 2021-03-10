import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { useMemoOne } from 'use-memo-one';
import { useCalendarInternal } from '../../hooks/useCalendarInternal';
import {
  calendarHeaderThemeToTextStyle,
  calendarYearAndMonthToMonths
} from '../../helpers';
import { getMonthInterpolateConfig, getStartOfEveryMonth } from '../../utils';
import { CalendarAnimatedHeader } from './CalendarAnimatedHeader';
import { styles } from './styles';
import { useCalendarTheme } from '../../hooks';

export interface CalendarHeaderMonthProps {
  height?: number;
  monthFormatString?: string;
  yearFormatString?: string;
  inverseAnimation?: boolean;
  style?: ViewStyle;
}

export const CalendarHeaderMonth = ({
  height = 50,
  inverseAnimation = false,
  monthFormatString = 'LLLL',
  style
}: CalendarHeaderMonthProps) => {
  const {
    startCalendarYearAndMonth,
    endCalendarYearAndMonth,
    calendarInterval
  } = useCalendarInternal();

  const { arrayOfMonthText } = useMemoOne(() => {
    const _arrayOfMonthText = getStartOfEveryMonth(calendarInterval).map((dt) =>
      dt.toFormat(monthFormatString)
    );
    return {
      arrayOfMonthText: _arrayOfMonthText
    };
  }, [calendarInterval]);

  const monthInterpolateConfig = useMemoOne(() => {
    return getMonthInterpolateConfig(
      calendarYearAndMonthToMonths(startCalendarYearAndMonth),
      calendarYearAndMonthToMonths(endCalendarYearAndMonth),
      height
    );
  }, [height, startCalendarYearAndMonth, endCalendarYearAndMonth]);

  const theme = useCalendarTheme();
  const textStyle = useMemoOne(
    () => [
      styles.headerText,
      calendarHeaderThemeToTextStyle(theme.header.month)
    ],
    [styles.headerText, theme]
  );

  return (
    <View style={style}>
      <CalendarAnimatedHeader
        height={height}
        interpolateConfig={monthInterpolateConfig}
        inverseAnimation={inverseAnimation}
      >
        {arrayOfMonthText.map((monthText, index) => {
          return (
            <Text key={`${index}-${monthText}`} style={textStyle}>
              {monthText}
            </Text>
          );
        })}
      </CalendarAnimatedHeader>
    </View>
  );
};
