import { CardPicker, CardPickerProps } from '@breeffy/pickers';
import { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { AnimatedItem, PickerDetails, Images } from '../components';
import type { ComponentStory, ComponentMeta } from '@storybook/react-native';

const windowWidth = Dimensions.get('window').width;
console.log(`windowWidth: ${windowWidth}`);

const styles = StyleSheet.create({
  animatedItem: {
    borderRadius: 16
    // backgroundColor: 'orange'
  }
});

const CardPickerMeta: ComponentMeta<typeof CardPicker> = {
  title: 'CardPicker',
  component: CardPicker,
  argTypes: {
    itemWidth: {
      control: {
        type: 'number'
      }
    },
    itemHeight: {
      control: {
        type: 'number'
      }
    },
    scrollMode: {
      options: ['oneItem', 'multipleItems', 'anyOffset'],
      control: {
        type: 'select'
      }
    },
    scrollComponentKind: {
      options: ['scrollview', 'flatlist'],
      control: {
        type: 'select'
      }
    },
    initialIndex: {
      control: {
        type: 'number'
      }
    },
    pickerSize: {
      control: {
        type: 'number'
      }
    }
  },
  args: {
    itemWidth: 200,
    itemHeight: 300,
    scrollMode: 'multipleItems',
    // scrollComponentKind: 'scrollview',
    scrollComponentKind: 'scrollview',
    // initialIndex: 6,
    mode: 'horizontal',
    pickerSize: windowWidth,
    // itemScales: [1, 0.9, 0.8, 0.7, 0.6],
    itemScales: [1, 1, 1, 1, 1, 1],
    precision: null
  }
};

export default CardPickerMeta;

type CardPickerStory = ComponentStory<typeof CardPicker>;
type RenderItemCallback = CardPickerProps<number>['renderItem'];

const Template: CardPickerStory = args => {
  // const items: number[] = [...Array(10)];
  // const items: number[] = [1, 2, 3, 4, 5];
  const items: number[] = [...Array(10)];

  const value = useSharedValue(0);
  const index = useSharedValue(0);
  const rawIndex = useSharedValue(0);

  const keyExtractor = useCallback(
    (_: number, index: number) => `${index}`,
    []
  );

  const getItemOffset = useCallback((_itemScale: number, _itemSize: number) => {
    return 100;
    // return _itemSize;
  }, []);

  const renderItem = useCallback<RenderItemCallback>(props => {
    // console.log(
    //   `images length: ${Images.length},props: ${JSON.stringify(
    //     props.itemIndex
    //   )}`
    // );
    // console.log(`pickerBorderDistance: ${props.pickerBorderDistance}`);
    // const index = (props.itemIndex + 1) % Images.length;
    const index = props.itemIndex % Images.length;
    // console.log(`index is [${index}]`);
    const source = Images[index].source;

    console.log(`index: ${index}, source: ${source}`);

    return (
      <AnimatedItem {...props} style={styles.animatedItem}>
        <Image
          source={source}
          resizeMode='cover'
          style={{
            width: props.itemWidth,
            height: props.itemHeight
          }}
        />
      </AnimatedItem>
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PickerDetails
        style={{ marginTop: 20, marginBottom: 20 }}
        value={value}
        index={index}
        rawIndex={rawIndex}
      />
      <CardPicker
        {...args}
        roundMode='floor'
        precision={0}
        items={items}
        currentIndex={index}
        currentRawIndex={rawIndex}
        keyExtractor={keyExtractor}
        getItemOffset={getItemOffset}
        renderItem={renderItem}
      />
    </View>
  );
};

export const NumberPickerStoryOne: CardPickerStory = Template.bind({});
NumberPickerStoryOne.args = {
  ...CardPickerMeta.args
};
NumberPickerStoryOne.storyName = 'horizontal';
