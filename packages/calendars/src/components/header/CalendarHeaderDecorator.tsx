import { StyleSheet, View, ViewStyle } from 'react-native';
import { PropsWithChildren, useMemo } from 'react';

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
