import { useMemo } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import type { PropsWithChildren } from 'react';
import type { CardItemProps } from '@breeffy/pickers';
import type { PropsWithStyle } from '@breeffy/types-react-native';

export interface AnimatedItemWithAngleProps<T>
  extends PropsWithStyle<CardItemProps<T>> {}

export const AnimatedItemWithAngle = <T,>({
  itemIndex,
  itemWidth,
  itemHeight,
  currentRawIndex,
  translates,
  scales,
  style: _style,
  children
}: PropsWithChildren<AnimatedItemWithAngleProps<T>>) => {
  const style = useAnimatedStyle(() => {
    const offsetX = itemHeight / 2;
    const translateX = interpolate(
      currentRawIndex.value,
      [itemIndex - 1, itemIndex, itemIndex + 1],
      [offsetX, 0, -offsetX]
    );

    const angleNumber = interpolate(
      currentRawIndex.value,
      [itemIndex - 1, itemIndex, itemIndex + 1],
      [20, 0, -20]
    );

    const angleDeg = `${angleNumber}deg`;
    const opacity = interpolate(
      currentRawIndex.value,
      [
        itemIndex - 3,
        itemIndex - 2,
        itemIndex - 1,
        itemIndex,
        itemIndex + 1,
        itemIndex + 2,
        itemIndex + 3
      ],
      [0, 0.5, 0.5, 1, 0.5, 0.5, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      currentRawIndex.value,
      [
        itemIndex - 3,
        itemIndex - 2,
        itemIndex - 1,
        itemIndex,
        itemIndex + 1,
        itemIndex + 2,
        itemIndex + 3
      ],
      [
        scales[3],
        scales[2],
        scales[1],
        scales[0],
        scales[1],
        scales[2],
        scales[3]
      ],
      Extrapolate.EXTEND
    );

    return {
      width: itemWidth,
      height: itemHeight,
      overflow: 'hidden',
      opacity: opacity,
      transform: [
        { translateX: -translateX },
        { scale: scale },
        { rotate: angleDeg },
        { translateX: translateX }
      ]
    };
  }, [translates, scales]);

  const containerStyle = useMemo(() => {
    return [_style, style];
  }, [_style, style]);

  return <Animated.View style={containerStyle}>{children}</Animated.View>;
};
