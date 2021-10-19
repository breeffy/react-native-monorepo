import { useContext } from 'react';
import { CalendarAnimatedContext } from '../contexts/animated';

export const useCalendarAnimated = () => {
  return useContext(CalendarAnimatedContext);
};
