import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { useMemoOne } from 'use-memo-one';
import { useCalendarInternal } from '../../hooks/useCalendarInternal';
import {
  calendarHeaderThemeToTextStyle,
  calendarYearAndMonthToMonths
} from '../../helpers';
import {
  getYearInterpolateConfig,
  getUniqueYearsInInterval
} from '../../utils';
import { CalendarAnimatedHeader } from './CalendarAnimatedHeader';
import { styles } from './styles';
import { useCalendarTheme } from '../../hooks';

export interface CalendarHeaderYearProps {
  height?: number;
  yearFormatString?: string;
  inverseAnimation?: boolean;
  style?: ViewStyle;
}

export const CalendarHeaderYear = ({
  height = 50,
  yearFormatString = 'yyyy',
  inverseAnimation,
  style
}: CalendarHeaderYearProps) => {
  const {
    startCalendarYearAndMonth,
    endCalendarYearAndMonth,
    calendarInterval
  } = useCalendarInternal();

  const { arrayOfYearText } = useMemoOne(() => {
    const _arrayOfYearText = getUniqueYearsInInterval(calendarInterval).map(
      (dt) => {
        return dt.toFormat(yearFormatString);
      }
    );
    return { arrayOfYearText: _arrayOfYearText };
  }, [calendarInterval]);

  const yearInterpolateConfig = useMemoOne(() => {
    return getYearInterpolateConfig(
      calendarYearAndMonthToMonths(startCalendarYearAndMonth),
      calendarYearAndMonthToMonths(endCalendarYearAndMonth),
      height
    );
  }, [height, startCalendarYearAndMonth, endCalendarYearAndMonth]);

  const theme = useCalendarTheme();
  const textStyle = useMemoOne(
    () => [
      styles.headerText,
      calendarHeaderThemeToTextStyle(theme.header.year)
    ],
    [styles.headerText, theme]
  );

  return (
    <View style={style}>
      <CalendarAnimatedHeader
        height={height}
        interpolateConfig={yearInterpolateConfig}
        inverseAnimation={inverseAnimation}
      >
        {arrayOfYearText.map((yearText, index) => {
          return (
            <Text key={`${index}-${yearText}`} style={textStyle}>
              {yearText}
            </Text>
          );
        })}
      </CalendarAnimatedHeader>
    </View>
  );
};
