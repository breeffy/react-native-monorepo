import React, { PropsWithChildren } from 'react';
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  ViewStyle
} from 'react-native';
import { CardPicker } from '@breeffy/react-native-calendar';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';
import { useCallbackOne, useMemoOne } from 'use-memo-one';
import { Images } from './Images';
import type {
  CardItemProps,
  CardPickerProps
} from '@breeffy/react-native-calendar';

const windowWidth = Dimensions.get('window').width;

const Settings = {
  pickerSize: windowWidth,
  itemWidth: 200,
  itemHeight: 300,
  imageMargin: 40
};

export const CardPickerExampleOne = () => {
  const items: number[] = [...Array(10)];
  const index = useSharedValue(0);

  const keyExtractor = useCallbackOne((_: number, index: number) => {
    return String(index);
  }, []);

  const renderItem = useCallbackOne<CardPickerProps<number>['renderItem']>(
    props => {
      console.log(
        `images length: ${Images.length},props: ${JSON.stringify(
          props.itemIndex
        )}`
      );
      const index = (props.itemIndex + 1) % Images.length;
      console.log(`index is [${index}]`);
      const source = Images[index].source;

      return (
        <CardPickerItem {...props} style={styles.cardPickerItem}>
          <Image
            source={source}
            resizeMode='cover'
            style={{
              width: props.itemWidth,
              height: props.itemHeight
            }}
          />
          {/* <TextView itemIndex={props.itemIndex} /> */}
        </CardPickerItem>
      );
    },
    []
  );

  const itemScales = useMemoOne(() => [1, 0.9, 0.8, 0.7, 0.6], []);
  const getItemOffset = useCallbackOne(
    (_itemScale: number, _itemSize: number) => {
      return 20;
    },
    []
  );

  return (
    <CardPicker
      items={items}
      mode='horizontal'
      scrollMode='multipleItems'
      scrollComponentKind='scrollview'
      scrollModeDeceleration='fast'
      pickerSize={Settings.pickerSize}
      itemWidth={Settings.itemWidth}
      itemHeight={Settings.itemHeight}
      itemScales={itemScales}
      getItemOffset={getItemOffset}
      precision={null}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      currentIndex={index}
    />
  );
};

const styles = StyleSheet.create({
  cardPickerItem: {
    borderRadius: 16,
    backgroundColor: 'orange'
  }
});
