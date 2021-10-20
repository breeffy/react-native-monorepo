import { Calendar } from '@breeffy/calendars';
import type { ComponentStory, ComponentMeta } from '@storybook/react-native';

const CalendarMeta: ComponentMeta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    monthsBefore: {
      control: {
        type: 'number'
      }
    },
    monthsAfter: {
      control: {
        type: 'number'
      }
    },
    scrollMode: {
      options: ['oneMonth', 'multipleMonths', 'anyOffset'],
      control: {
        type: 'select'
      }
    },
    selectionMode: {
      options: ['singleDay', 'multipleDays'],
      control: {
        type: 'select'
      }
    },
    onPress: { action: 'pressed the button' }
  },
  args: {
    monthsBefore: 24,
    monthsAfter: 24,
    scrollMode: 'oneMonth',
    selectionMode: 'singleDay'
  }
};

export default CalendarMeta;

type CalendarStory = ComponentStory<typeof Calendar>;

const Template: CalendarStory = args => (
  <Calendar scrollModeDeceleration='fast' {...args} />
);

export const CalendarScrollOneMonth: CalendarStory = Template.bind({});
CalendarScrollOneMonth.args = {
  ...CalendarMeta.args
};
CalendarScrollOneMonth.storyName = 'horizontal';