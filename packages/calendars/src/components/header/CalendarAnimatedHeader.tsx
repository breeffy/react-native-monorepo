import React, { useMemo } from 'react';
import Animated, {
  interpolate,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useDerivedValue
} from 'react-native-reanimated';
import { HeaderComponentWrapper } from './HeaderComponentWrapper';
import { useCalendarAnimated } from '../../hooks/useCalendarAnimated';
import { PointPropType, StyleSheet } from 'react-native';
import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { InterpolateConfig, InterpolateOutput } from '../../utils';

export interface CalendarAnimatedHeaderProps {
  height?: number;
  interpolateConfig: InterpolateConfig;
  inverseAnimation?: boolean;
}

export const CalendarAnimatedHeader = ({
  height = 50,
  interpolateConfig: _interpolateConfig,
  inverseAnimation = false,
  children
}: PropsWithChildren<CalendarAnimatedHeaderProps>) => {
  const interpolateConfig: InterpolateConfig = useMemo(() => {
    const [originalInput, originalOutput, originalType] = _interpolateConfig;
    const output = inverseAnimation
      ? ([...originalOutput].reverse() as InterpolateOutput)
      : originalOutput;
    return [originalInput, output, originalType];
  }, [_interpolateConfig, inverseAnimation]);

  const { calendarAnimatedCommonEraMonth } = useCalendarAnimated();
  const scrollViewRef = useAnimatedRef();
  const scrollY = useDerivedValue(() => {
    return interpolate(
      calendarAnimatedCommonEraMonth.value,
      ...interpolateConfig
    );
  }, [interpolateConfig]);

  useAnimatedReaction(
    () => {
      return scrollY.value;
    },
    positionY => {
      scrollTo(scrollViewRef, 0, positionY, false);
    },
    [interpolateConfig, inverseAnimation]
  );

  const style = useMemo<StyleProp<ViewStyle>>(
    () => [styles.animetedScrollViewStyle, { height }],
    [height]
  );

  const contentOffset = useMemo<PointPropType>(() => {
    return {
      x: 0,
      y: scrollY.value
    };
  }, []);

  const elements = useMemo(() => {
    const arrayOfElements = React.Children.toArray(children);
    if (inverseAnimation) {
      arrayOfElements.reverse();
    }
    return arrayOfElements.map((element, index) => {
      return (
        <HeaderComponentWrapper key={`index-${index}`} height={height}>
          {element}
        </HeaderComponentWrapper>
      );
    });
  }, [children, inverseAnimation]);

  return (
    <Animated.ScrollView
      // @ts-expect-error
      ref={scrollViewRef}
      style={style}
      bounces={false}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      contentOffset={contentOffset}
    >
      {elements}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  animetedScrollViewStyle: { flexDirection: 'column', flexGrow: 0 }
});
