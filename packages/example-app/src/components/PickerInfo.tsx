import { useMemo } from 'react';
import { Text, View } from 'react-native';
import AnimateableText from 'react-native-animateable-text';
import { useAnimatedProps } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import type { ViewStyle, TextStyle, StyleProp } from 'react-native';
import type { PropsWithStyle } from '@breeffy/types-react-native';

interface Props {
  value?: SharedValue<number>;
  index?: SharedValue<number>;
  rawIndex?: SharedValue<number>;
}

export interface PickerDetailsProps extends PropsWithStyle<Props> {}

export const PickerDetails = ({
  value,
  index,
  rawIndex,
  style
}: PickerDetailsProps) => {
  const propsForValue = useAnimatedProps(() => {
    return {
      text: String(value !== undefined ? value.value : '')
    };
  });

  const propsForIndex = useAnimatedProps(() => {
    return {
      text: String(index !== undefined ? index.value : '')
    };
  });

  const propsForRawIndex = useAnimatedProps(() => {
    return {
      text: String(rawIndex !== undefined ? rawIndex.value : '')
    };
  });

  const containerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      {
        alignSelf: 'stretch',
        // width: '100%',
        flexDirection: 'column',
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: 'rgba(68, 82, 95, 1)'
        // backgroundColor: 'lightgrey'
      },
      style
    ];
  }, [style]);

  const wrapperStyle = useMemo<ViewStyle>(() => {
    return {
      flexDirection: 'column'
    };
  }, []);

  const textStyle = useMemo<TextStyle>(() => {
    return {
      fontSize: 28,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: 'rgba(68, 82, 95, 1)'
    };
  }, []);

  const animatedTextStyle = useMemo<TextStyle>(() => {
    return {
      fontSize: 22,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: 'rgba(68, 82, 95, 1)'
    };
  }, []);
  return (
    <View style={containerStyle}>
      {value !== undefined && (
        <View style={wrapperStyle}>
          <Text style={textStyle}>Value</Text>
          <AnimateableText
            animatedProps={propsForValue}
            style={animatedTextStyle}
          />
        </View>
      )}
      {index !== undefined && (
        <View style={wrapperStyle}>
          <Text style={textStyle}>Index</Text>
          <AnimateableText
            animatedProps={propsForIndex}
            style={animatedTextStyle}
          />
        </View>
      )}
      {rawIndex !== undefined && (
        <View style={wrapperStyle}>
          <Text style={textStyle}>Raw Index</Text>
          <AnimateableText
            animatedProps={propsForRawIndex}
            style={animatedTextStyle}
          />
        </View>
      )}
    </View>
  );
};
