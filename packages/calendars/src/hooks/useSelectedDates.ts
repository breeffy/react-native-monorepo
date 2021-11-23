import { useCallback, useState } from 'react';
import { invariant } from '@breeffy/invariants';
import { isCalendarDatesEqual } from '../helpers';
import type { CalendarDate, CalendarSelectionMode } from '../types';

export type SelectedDates = CalendarDate[];

export const useSelectedDates = (
  selectionMode: CalendarSelectionMode,
  initialSelectedDates: CalendarDate[]
): [
  selectedDates: SelectedDates,
  selectDate: (day: CalendarDate) => void,
  deselectDate: (day: CalendarDate) => void
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

  const deselectDate = useCallback((day: CalendarDate) => {
    setSelectedDates(prevSelectedDates =>
      prevSelectedDates.filter(it => !isCalendarDatesEqual(it, day))
    );
  }, []);

  return [selectedDates, selectDate, deselectDate];
};
