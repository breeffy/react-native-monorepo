import React from 'react';
import { View } from 'react-native';
import { CalendarSheet } from '../../components/calendarSheet';
import { useContainerStyle } from './hooks';
import type { CalendarProps } from '@breeffy/react-native-calendar';

export interface ScrollModeProps {
  scrollMode: CalendarProps['scrollMode'];
}

export const ScrollMode = ({ scrollMode }: ScrollModeProps) => {
  const containerStyle = useContainerStyle();
  return (
    <View style={containerStyle}>
      {<CalendarSheet scrollMode={scrollMode} />}
    </View>
  );
};
