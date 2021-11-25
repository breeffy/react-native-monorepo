import { useCallback, useMemo, useState } from 'react';
import { invariant } from '@breeffy/invariants';
import { isCalendarDatesEqual } from '../helpers';
import type { CalendarDate, CalendarSelectionMode } from '../types';

export type SelectedDates = CalendarDate[];

export const useSelectedDates = (
  selectionMode: CalendarSelectionMode,
  initialSelectedDates: CalendarDate[]
): [
  selectedDates: SelectedDates,
  isLastSelectedDate: boolean,
  selectDate: (day: CalendarDate) => void,
  deselectDate: (
    day: CalendarDate,
    allowDeselectLastSelectedDate?: boolean
  ) => void
] => {
  invariant(
    selectionMode === 'multipleDays' ||
      (selectionMode === 'singleDay' &&
        Array.isArray(initialSelectedDates) &&
        initialSelectedDates.length <= 1),
    `selectionMode [${selectionMode}] and initialSelectedDates [${initialSelectedDates}] are incompatible`
  );

  const [selectedDates, setSelectedDates] =
    useState<SelectedDates>(initialSelectedDates);

  const isLastSelectedDate = useMemo(() => {
    return selectedDates.length === 1;
  }, [selectedDates]);

  const selectDate = useCallback(
    (day: CalendarDate) => {
      if (selectionMode === 'singleDay') {
        setSelectedDates([day]);
      } else if (selectionMode === 'multipleDays') {
        setSelectedDates(prevSelectedDates => [...prevSelectedDates, day]);
      }
    },
    [selectionMode]
  );

  const deselectDate = useCallback(
    (day: CalendarDate, allowDeselectLastSelectedDate: boolean = true) => {
      setSelectedDates(prevSelectedDates => {
        const allowDeselect =
          allowDeselectLastSelectedDate || !isLastSelectedDate;
        if (allowDeselect) {
          return prevSelectedDates.filter(it => !isCalendarDatesEqual(it, day));
        }
        return prevSelectedDates;
      });
    },
    [isLastSelectedDate]
  );

  return [selectedDates, isLastSelectedDate, selectDate, deselectDate];
};
