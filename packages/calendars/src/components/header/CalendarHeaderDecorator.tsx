import { StyleSheet, View } from 'react-native';
import { useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';

export interface CalendarHeaderDecoratorProps {
  style?: ViewStyle;
}

export const CalendarHeaderDecorator = ({
  children,
  style
}: PropsWithChildren<CalendarHeaderDecoratorProps>) => {
  const containerStyle = useMemo(() => {
    return [styles.container, style];
  }, [style]);

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
