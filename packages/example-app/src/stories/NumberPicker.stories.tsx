import { useCallback } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { NumberPicker, Item, NumberPickerKind } from '@breeffy/pickers';
import { PickerDetails } from '../components/PickerInfo';
import type { ComponentStory, ComponentMeta } from '@storybook/react-native';
import type { NumberPickerProps } from '@breeffy/pickers';

const NumberFormat = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  signDisplay: 'never',
  useGrouping: false,
  minimumIntegerDigits: 2
});

const NumberPickerMeta: ComponentMeta<typeof NumberPicker> = {
  title: 'NumberPicker',
  component: NumberPicker,
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
    separatorSize: {
      control: {
        type: 'number'
      }
    },
    initialIndex: {
      control: {
        type: 'number'
      }
    },
    scrollComponentKind: {
      options: ['scrollview', 'flatlist'],
      control: {
        type: 'select'
      }
    }
  },
  args: {
    items: NumberPickerKind.Hours,
    itemWidth: 90,
    itemHeight: 100,
    scrollMode: 'anyOffset',
    separatorSize: 0,
    initialIndex: 12,
    scrollComponentKind: 'scrollview'
  }
};

export default NumberPickerMeta;

type NumberPickerStory = ComponentStory<typeof NumberPicker>;
type RenderItemCallback = NumberPickerProps<number | string>['renderItem'];

const Template: NumberPickerStory = args => {
  const value = useSharedValue(0);
  const index = useSharedValue(0);
  const rawIndex = useSharedValue(0);

  const keyExtractor = useCallback(
    (_: number | string, index: number) => `${index}`,
    []
  );

  const renderItem = useCallback<RenderItemCallback>(props => {
    return <Item {...props} />;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PickerDetails
        style={{ marginTop: 20, marginBottom: 20 }}
        value={value}
        index={index}
        rawIndex={rawIndex}
      />
      <NumberPicker
        {...args}
        currentValue={value}
        currentIndex={index}
        currentRawIndex={rawIndex}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export const NumberPickerStoryOne: NumberPickerStory = Template.bind({});
NumberPickerStoryOne.args = {
  ...NumberPickerMeta.args
};
NumberPickerStoryOne.storyName = 'horizontal';

export const NumberPickerWithStringItem: NumberPickerStory = Template.bind({});
NumberPickerWithStringItem.args = {
  ...NumberPickerMeta.args,
  items: NumberPickerKind.Hours.map(it => NumberFormat.format(it)),
  convertItemToNumber: item => Number.parseInt(item, 10)
};
NumberPickerWithStringItem.storyName = 'with string items';
