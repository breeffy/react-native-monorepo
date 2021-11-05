import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useCalendarInternal } from '../../hooks/useCalendarInternal';
import {
  calendarHeaderThemeToTextStyle,
  calendarYearAndMonthToMonths
} from '../../helpers';
import { getMonthInterpolateConfig, getStartOfEveryMonth } from '../../utils';
import { CalendarAnimatedHeader } from './CalendarAnimatedHeader';
import { styles } from './styles';
import { useCalendarTheme } from '../../hooks';
import type { ViewStyle } from 'react-native';

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

  const { arrayOfMonthText } = useMemo(() => {
    const _arrayOfMonthText = getStartOfEveryMonth(calendarInterval).map(dt =>
      dt.toFormat(monthFormatString)
    );
    return {
      arrayOfMonthText: _arrayOfMonthText
    };
  }, [calendarInterval]);

  const monthInterpolateConfig = useMemo(() => {
    return getMonthInterpolateConfig(
      calendarYearAndMonthToMonths(startCalendarYearAndMonth),
      calendarYearAndMonthToMonths(endCalendarYearAndMonth),
      height
    );
  }, [height, startCalendarYearAndMonth, endCalendarYearAndMonth]);

  const theme = useCalendarTheme();
  const textStyle = useMemo(
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
