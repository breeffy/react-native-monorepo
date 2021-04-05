import React from 'react';
import { View } from 'react-native';
import { CalendarSheet } from '../../components/calendarSheet';
import { useContainerStyle } from './hooks';
import type { CalendarProps } from '@breeffy/react-native-calendar';

export interface SelectionModeModeProps {
  selectionMode: CalendarProps['selectionMode'];
}

export const SelectionMode = ({ selectionMode }: SelectionModeModeProps) => {
  const containerStyle = useContainerStyle();
  return (
    <View style={containerStyle}>
      {<CalendarSheet selectionMode={selectionMode} />}
    </View>
  );
};
