import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CalendarThemeDark,
  CalendarThemeLight
} from '@breeffy/react-native-calendar';
import { useAppContext } from '../../hooks';

export const BottomSheetHandle = () => {
  const { theme } = useAppContext();
  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor:
          theme === 'light'
            ? CalendarThemeLight.sheet.backgroundColor
            : CalendarThemeDark.sheet.backgroundColor
      }
    ];
  }, [theme]);

  const itemStyle = useMemo(() => {
    return [
      styles.item,
      {
        backgroundColor:
          theme === 'light'
            ? CalendarThemeLight.daysOfWeek.textColor
            : CalendarThemeDark.daysOfWeek.textColor
      }
    ];
  }, [theme]);

  return (
    <View style={containerStyle}>
      <View style={itemStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    backgroundColor: 'orange'
  },
  item: {
    width: 40,
    height: 4,
    borderRadius: 4
  }
});
