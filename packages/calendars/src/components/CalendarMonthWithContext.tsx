import { useCalendarInternal } from '../hooks/useCalendarInternal';
import { CalendarMonth } from './CalendarMonth';
import type { CalendarYearAndMonth } from '../types';

export interface CalendarMonthWithContextProps {
  calendarYearAndMonth: CalendarYearAndMonth;
}

/**
 * We pass most parameters, except `calendarYearAndMonth`,
 * using Context
 */
export const CalendarMonthWithContext = ({
  calendarYearAndMonth
}: CalendarMonthWithContextProps) => {
  const {
    activeCalendarDay,
    selectedDates,
    disabledDateRanges,
    onCalendarDayStateChange
  } = useCalendarInternal();

  return (
    <CalendarMonth
      calendarYearAndMonth={calendarYearAndMonth}
      activeCalendarDay={activeCalendarDay}
      selectedDates={selectedDates}
      disabledDateRanges={disabledDateRanges}
      onCalendarDayPress={onCalendarDayStateChange}
    />
  );
};
