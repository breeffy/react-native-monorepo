import React from 'react';
import { View } from 'react-native';
import { CalendarSheet } from '../../components/calendarSheet';
import { useContainerStyle } from './hooks';

export const OneDaySelection = () => {
  const containerStyle = useContainerStyle();
  return <View style={containerStyle}>{<CalendarSheet />}</View>;
};
