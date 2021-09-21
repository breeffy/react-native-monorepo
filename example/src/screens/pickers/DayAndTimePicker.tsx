import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { useCallbackOne, useMemoOne } from 'use-memo-one';
import {
  NumberPicker,
  NumberPickerKind,
  NumberPickerProps,
  Item
} from '@breeffy/react-native-calendar';
import { useContainerStyle } from '../basic/hooks';
import AnimateableText from 'react-native-animateable-text';

interface DayAndTimePickerProps {
  kind: keyof typeof NumberPickerKind;
}

export const DayAndTimePicker = ({ kind }: DayAndTimePickerProps) => {
  const value = useSharedValue(0);
  const index = useSharedValue(0);
  const rawIndex = useSharedValue(0);

  const defaultContainerStyle = useContainerStyle();

  const propsForValue = useAnimatedProps(() => {
    return {
      text: String(value.value)
    };
  });

  const propsForIndex = useAnimatedProps(() => {
    return {
      text: String(index.value)
    };
  });

  const propsForRawIndex = useAnimatedProps(() => {
    return {
      text: String(rawIndex.value)
    };
  });

  const keyExtractor = useCallbackOne(
    (_: number, index: number) => `${index}`,
    []
  );

  const renderItem = useCallbackOne<NumberPickerProps<number>['renderItem']>(
    (props) => {
      return <Item {...props} />;
    },
    []
  );

  const containerStyle = useMemoOne(() => {
    return [defaultContainerStyle, styles.container];
  }, [defaultContainerStyle, styles.container]);

  return (
    <View style={containerStyle}>
      <NumberPicker
        items={NumberPickerKind[kind]}
        itemWidth={90}
        itemHeight={100}
        precision={2}
        separatorSize={0}
        currentValue={value}
        currentIndex={index}
        currentRawIndex={rawIndex}
        initialIndex={12}
        scrollMode="anyOffset"
        scrollComponentKind="flatlist"
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Value: </Text>
        <AnimateableText animatedProps={propsForValue} style={styles.text} />
        <Text style={styles.text}>Index: </Text>
        <AnimateableText animatedProps={propsForIndex} style={styles.text} />
        <Text style={styles.text}>Raw Index: </Text>
        <AnimateableText animatedProps={propsForRawIndex} style={styles.text} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  text: {
    fontSize: 20
  }
});
