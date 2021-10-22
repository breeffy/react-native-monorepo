import { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { CardPicker } from '@breeffy/pickers';
import {
  AnimatedItem,
  AnimatedItemWithAngle,
  AnimatedItemWithSeparator,
  PickerDetails,
  Images
} from '../components';
import type { PropsWithChildren } from 'react';
import type { CardItemProps, CardPickerProps } from '@breeffy/pickers';
import type { ComponentStory, ComponentMeta } from '@storybook/react-native';
import type {
  AnimatedItemProps,
  AnimatedItemWithAngleProps
} from '../components';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  animatedWrapper: {
    borderRadius: 16
  },
  pickerDetails: { marginTop: 20, marginBottom: 20 },
  container: { flex: 1 }
});

type CardPickerWithNumber = (props: CardPickerProps<number>) => JSX.Element;
type AnimatedComponent<
  T = number,
  W = AnimatedItemProps<T> | AnimatedItemWithAngleProps<T>
> = (props: PropsWithChildren<W>) => JSX.Element;

const CardPickerMeta: ComponentMeta<CardPickerWithNumber> = {
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
    scrollComponentKind: 'scrollview',
    // initialIndex: 6,
    mode: 'horizontal',
    pickerSize: windowWidth,
    itemScales: [1, 1, 1, 1, 1, 1],
    precision: null,
    getItemOffset: () => {
      return 100;
    }
  }
};

export default CardPickerMeta;

type CardPickerStory = ComponentStory<CardPickerWithNumber>;

const Template: CardPickerStory = args => {
  const items: number[] = [...Array(10)];

  const index = useSharedValue(0);
  const rawIndex = useSharedValue(0);

  const keyExtractor = useCallback(
    (_: number, index: number) => `${index}`,
    []
  );

  return (
    <View style={styles.container}>
      <PickerDetails
        style={styles.pickerDetails}
        index={index}
        rawIndex={rawIndex}
      />
      <CardPicker
        {...args}
        items={items}
        currentIndex={index}
        currentRawIndex={rawIndex}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const WithAnimatedWrapper =
  (AnimatedWrapper: AnimatedComponent) => (props: CardItemProps<number>) => {
    const index = props.itemIndex % Images.length;
    const source = Images[index].source;

    return (
      <AnimatedWrapper {...props} style={styles.animatedWrapper}>
        <Image
          source={source}
          resizeMode='cover'
          style={{
            width: props.itemWidth,
            height: props.itemHeight
          }}
        />
      </AnimatedWrapper>
    );
  };

export const NumberPickerWithCrossing: CardPickerStory = Template.bind({});
NumberPickerWithCrossing.args = {
  ...CardPickerMeta.args,
  renderItem: WithAnimatedWrapper(AnimatedItem)
};
NumberPickerWithCrossing.storyName = 'with crossing';

export const CardPickerWithScale: CardPickerStory = Template.bind({});
CardPickerWithScale.args = {
  ...CardPickerMeta.args,
  itemScales: [0.7, 0.8, 0.9, 1, 1, 1],
  renderItem: WithAnimatedWrapper(AnimatedItem)
};
CardPickerWithScale.storyName = 'with scale';

export const CardPickerWithAngle: CardPickerStory = Template.bind({});
CardPickerWithAngle.args = {
  ...CardPickerMeta.args,
  itemScales: [0.7, 0.8, 0.9, 1, 1, 1],
  renderItem: WithAnimatedWrapper(AnimatedItemWithAngle)
};
CardPickerWithAngle.storyName = 'with angle';

export const CardPickerWithSeparator: CardPickerStory = Template.bind({});
CardPickerWithSeparator.args = {
  ...CardPickerMeta.args,
  separatorSize: 20,
  itemScales: [1, 0.8, 1, 1, 1, 1],
  renderItem: WithAnimatedWrapper(AnimatedItemWithSeparator),
  getItemOffset: (
    itemScale: number,
    itemSize: number,
    separatorSize: number
  ) => {
    return itemSize * itemScale + separatorSize;
  }
};
CardPickerWithSeparator.storyName = 'with separator';
