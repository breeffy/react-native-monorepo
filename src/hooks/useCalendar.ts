import { useContext } from 'react';
import { CalendarContext } from '../contexts/external';

export const useCalendar = () => {
  return useContext(CalendarContext);
};
