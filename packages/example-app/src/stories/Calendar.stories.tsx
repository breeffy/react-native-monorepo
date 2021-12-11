import { useEffect, useMemo, useRef } from 'react';
import { Calendar } from '@breeffy/calendars';
import type { CalendarMethods } from '@breeffy/calendars';
import type { ComponentStory, ComponentMeta } from '@storybook/react-native';
import type { CalendarDisabledRange } from '@breeffy/calendars/src/types';

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
    selectionMode: 'singleDay',
    allowDeselectLastSelectedDate: true
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

export const CalendarWithRef: CalendarStory = args => {
  const calendarRef = useRef<CalendarMethods>(null);
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    calendarRef.current?.select({
      year: tomorrow.getFullYear(),
      month: tomorrow.getMonth() + 1,
      day: tomorrow.getDate()
    });
  }, []);
  return <Calendar ref={calendarRef} {...args} />;
};
CalendarWithRef.args = {
  ...CalendarMeta.args
};
CalendarWithRef.storyName = 'set tomorrow using ref';

export const CalendarWithSelectedDates: CalendarStory = args => {
  const initialSelectedDates = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return [
      {
        year: tomorrow.getFullYear(),
        month: tomorrow.getMonth() + 1,
        day: tomorrow.getDate()
      }
    ];
  }, []);
  return <Calendar {...args} initialSelectedDates={initialSelectedDates} />;
};
CalendarWithSelectedDates.args = {
  ...CalendarMeta.args
};
CalendarWithSelectedDates.storyName = 'set tomorrow using prop';

export const CalendarWithDisabledRanges: CalendarStory = args => {
  const initialSelectedDates = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return [
      {
        year: tomorrow.getFullYear(),
        month: tomorrow.getMonth() + 1,
        day: tomorrow.getDate()
      }
    ];
  }, []);

  const disabledRanges: CalendarDisabledRange[] = useMemo(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    // Range of three days is disabled (yesterday, today, tomorrow)
    // Intersected initial selected dates should also become disabled
    return [
      [
        {
          year: yesterday.getFullYear(),
          month: yesterday.getMonth() + 1,
          day: yesterday.getDate()
        },
        {
          year: dayAfterTomorrow.getFullYear(),
          month: dayAfterTomorrow.getMonth() + 1,
          day: dayAfterTomorrow.getDate()
        }
      ]
    ];
  }, []);

  return (
    <Calendar
      {...args}
      initialSelectedDates={initialSelectedDates}
      disabledDateRanges={disabledRanges}
    />
  );
};
CalendarWithDisabledRanges.args = {
  ...CalendarMeta.args
};
CalendarWithDisabledRanges.storyName = 'with disabled ranges';
