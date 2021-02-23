import { useContext } from 'react';
import { CalendarInternalContext } from '../contexts/internal';

export const useCalendarInternal = () => {
  return useContext(CalendarInternalContext);
};
