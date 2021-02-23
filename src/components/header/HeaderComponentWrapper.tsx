import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useMemoOne } from 'use-memo-one';
import type { PropsWithChildren } from 'react';

export interface HeaderComponentWrapperProps {
  height: NonNullable<ViewStyle['height']>;
}

export const HeaderComponentWrapper = ({
  height,
  children
}: PropsWithChildren<HeaderComponentWrapperProps>) => {
  const style = useMemoOne<StyleProp<ViewStyle>>(
    () => ({
      flexGrow: 0,
      flexShrink: 1,
      height,
      justifyContent: 'center',
      alignItems: 'center'
    }),
    [height]
  );
  return <View style={style}>{children}</View>;
};
