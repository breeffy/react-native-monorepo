import React, { memo } from 'react';
import { usePickerTheme } from '../../hooks';
import { useMemoOne } from 'use-memo-one';
import { pickerItemThemeToTextStyle } from '../../helpers';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import type { PickerItemProps } from './types';
import type { TextStyle, StyleProp, ViewStyle } from 'react-native';

export type ItemProps<T> = PickerItemProps<T> & {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const ItemComponent = <T extends string | number>({
  item,
  itemIndex,
  currentIndex,
  containerStyle: _containerStyle,
  textStyle: _textStyle
}: ItemProps<T>) => {
  // console.log(`Picker: value [${item}], index [${itemIndex}]`);
  const theme = usePickerTheme();

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentIndex.value,
      [itemIndex - 2, itemIndex - 1, itemIndex, itemIndex + 1, itemIndex + 2],
      [0.3, 0.6, 1, 0.6, 0.3],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      currentIndex.value,
      [itemIndex - 2, itemIndex - 1, itemIndex, itemIndex + 1, itemIndex + 2],
      [0.8, 0.9, 1.2, 0.9, 0.8],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
      transform: [{ scale }]
    };
  }, []);

  const textStyle = useMemoOne<StyleProp<Text>[]>(() => {
    return [
      pickerItemThemeToTextStyle(theme.item),
      animatedTextStyle,
      _textStyle,
      {
        includeFontPadding: false,
        textAlign: 'center',
        textAlignVertical: 'center'
      }
    ];
  }, [_textStyle, theme.item, animatedTextStyle]);

  return <Animated.Text style={textStyle}>{String(item)}</Animated.Text>;
};

export const Item = memo(ItemComponent);
