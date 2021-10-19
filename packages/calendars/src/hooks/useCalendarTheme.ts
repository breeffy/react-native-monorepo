import { useContext } from 'react';
import { CalendarThemeContext } from '../contexts/theme';

export const useCalendarTheme = () => {
  return useContext(CalendarThemeContext);
};
