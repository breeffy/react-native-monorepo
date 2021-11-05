import { Children, cloneElement, useMemo } from 'react';
import { View } from 'react-native';
import type { PropsWithRequiredChildren } from '@breeffy/types';
import type { PropsWithSpreadStyle } from '@breeffy/types-react-native';
import type { ViewStyle, StyleProp } from 'react-native';

export interface LayoutProps<T> {
  gap?: number;
  childProps?: PropsWithSpreadStyle<Partial<T>>;
  style?: ViewStyle;
}

export const Layout = <T extends {}>({
  gap = 0,
  childProps,
  style,
  children: _children
}: PropsWithRequiredChildren<LayoutProps<T>>) => {
  const containerStyle = useMemo<ViewStyle>(() => {
    return style ?? { flexDirection: 'column' };
  }, [style]);

  const children = useMemo(() => {
    const flexDirection = containerStyle.flexDirection;
    const arrayChildren = Children.toArray(_children);
    return Children.map(arrayChildren, (child, index) => {
      const isLast = index === arrayChildren.length - 1;
      let childStyle: StyleProp<ViewStyle> = {};
      if (!isLast) {
        if (flexDirection === 'column' || flexDirection === undefined) {
          childStyle = { marginBottom: gap };
        } else if (flexDirection === 'row') {
          childStyle = { marginRight: gap };
        } else if (flexDirection === 'row-reverse') {
          childStyle = { marginLeft: gap };
        } else if (flexDirection === 'column-reverse') {
          childStyle = { marginTop: gap };
        }
      }

      // @ts-expect-error
      const originalChildStyle: ViewStyle = child?.props?.style;
      // @ts-expect-error
      const props: ViewStyle = child?.props;
      return cloneElement(child as React.ReactElement, {
        ...childProps,
        ...props,
        style: { ...childProps?.style, ...childStyle, ...originalChildStyle }
      });
    });
  }, [gap, containerStyle, _children, childProps]);

  return (
    <View style={containerStyle} collapsable={false}>
      {children}
    </View>
  );
};
