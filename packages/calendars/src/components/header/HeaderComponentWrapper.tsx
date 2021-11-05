import { useMemo } from 'react';
import { View } from 'react-native';
import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface HeaderComponentWrapperProps {
  height: NonNullable<ViewStyle['height']>;
}

export const HeaderComponentWrapper = ({
  height,
  children
}: PropsWithChildren<HeaderComponentWrapperProps>) => {
  const style = useMemo<StyleProp<ViewStyle>>(
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
