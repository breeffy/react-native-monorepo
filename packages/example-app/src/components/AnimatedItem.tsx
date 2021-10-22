import { PropsWithChildren, useMemo } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import type { CardItemProps } from '@breeffy/pickers';
import type { PropsWithStyle } from '@breeffy/types-react-native';

export interface AnimatedItemProps<T>
  extends PropsWithStyle<CardItemProps<T>> {}

export const AnimatedItem = <T,>({
  itemIndex,
  itemWidth,
  itemHeight,
  currentRawIndex,
  translates,
  scales,
  pickerBorderDistance,
  style: _style,
  children
}: PropsWithChildren<AnimatedItemProps<T>>) => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentRawIndex.value,
      [
        itemIndex - 3,
        itemIndex - 2,
        itemIndex - 1,
        itemIndex,
        itemIndex + 1,
        itemIndex + 2
      ],
      [0, 1, 1, 1, 0.2, 0],
      Extrapolate.CLAMP
    );

    // const scale = interpolate(
    //   currentRawIndex.value,
    //   [
    //     itemIndex - 3,
    //     itemIndex - 2,
    //     itemIndex - 1,
    //     itemIndex,
    //     itemIndex + 1,
    //     itemIndex + 2,
    //     itemIndex + 3
    //   ],
    //   [scales[3], scales[2], scales[1], scales[0], 0.8],
    //   Extrapolate.EXTEND
    // );

    // console.log(
    //   `item index [${itemIndex}]: indexes: ${[
    //     itemIndex - 4,
    //     itemIndex - 3,
    //     itemIndex - 2,
    //     itemIndex - 1,
    //     itemIndex,
    //     itemIndex + 1
    //   ]}`
    // );
    // console.log(
    //   `item index [${itemIndex}]: translates: ${[
    //     0,
    //     translates[3],
    //     translates[2],
    //     translates[1],
    //     translates[0],
    //     -pickerBorderDistance
    //   ]}`
    // );

    const translateX = interpolate(
      currentRawIndex.value,
      [
        itemIndex - 4,
        itemIndex - 3,
        itemIndex - 2,
        itemIndex - 1,
        itemIndex,
        itemIndex + 1
      ],
      [
        0,
        translates[3],
        translates[2],
        translates[1],
        translates[0],
        -pickerBorderDistance
      ],
      Extrapolate.CLAMP
    );

    if (itemIndex === 2) {
      console.log(`translates: ${JSON.stringify(translates)}`);
      console.log(
        `rawIndex [${currentRawIndex.value}], item [${itemIndex}]: translateX [${translateX}]`
      );
    }

    return {
      width: itemWidth,
      height: itemHeight,
      overflow: 'hidden',
      opacity: opacity,
      transform: [
        {
          translateX: translateX
        }
      ]
      // transform: [
      //   {
      //     translateX: translateX
      //   },
      //   { scale: scale }
      // ]
    };
  }, [translates, scales]);

  const containerStyle = useMemo(() => {
    return [_style, style];
  }, [_style, style]);

  return <Animated.View style={containerStyle}>{children}</Animated.View>;
};
