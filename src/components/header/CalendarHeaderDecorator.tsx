import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useMemoOne } from 'use-memo-one';

export interface CalendarHeaderDecoratorProps {
  style?: ViewStyle;
}

export const CalendarHeaderDecorator = ({
  children,
  style
}: PropsWithChildren<CalendarHeaderDecoratorProps>) => {
  const containerStyle = useMemoOne(() => {
    return [styles.container, style];
  }, [styles.container, style]);

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
