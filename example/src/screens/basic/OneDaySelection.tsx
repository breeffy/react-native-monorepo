import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppContext } from '../../hooks';
import { CalendarSheet } from '../../components/calendarSheet';

export const OneDaySelection = () => {
  const { theme } = useAppContext();
  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor:
          theme === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.9)'
      }
    ];
  }, [theme]);
  console.log(`OneDaySelection: theme is ${theme}`);
  return <View style={containerStyle}>{<CalendarSheet />}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: 'orange'
  },
  title: {
    fontSize: 46,
    lineHeight: 46,
    fontWeight: '800'
  },
  headerContainer: {
    paddingVertical: 24,
    backgroundColor: 'white'
  },
  buttonContainer: {
    marginBottom: 6
  }
});
