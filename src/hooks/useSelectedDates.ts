import { useState } from 'react';
import { useCallbackOne } from 'use-memo-one';
import { isCalendarDatesEqual } from '../helpers';
import type { CalendarDate, CalendarSelectionMode } from '../types';

export type SelectedDates = CalendarDate[];

export const useSelectedDates = (
  selectionMode: CalendarSelectionMode
): [
  selectedDates: SelectedDates,
  selectDate: (day: CalendarDate) => void,
  deselectDate: (day: CalendarDate) => void
] => {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>([]);
  const selectDate = useCallbackOne(
    (day: CalendarDate) => {
      if (selectionMode === 'singleDay') {
        setSelectedDates([day]);
      } else if (selectionMode === 'multipleDays') {
        setSelectedDates((prevSelectedDates) => [...prevSelectedDates, day]);
      }
    },
    [selectionMode]
  );

  const deselectDate = useCallbackOne((day: CalendarDate) => {
    setSelectedDates((prevSelectedDates) =>
      prevSelectedDates.filter((it) => !isCalendarDatesEqual(it, day))
    );
  }, []);

  return [selectedDates, selectDate, deselectDate];
};
