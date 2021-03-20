import React, { useMemo } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Switch, SwitchType } from '../../components/switch';

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useAppContext();

  const switchType = useMemo(() => {
    return theme === 'light' ? SwitchType.ENABLED : SwitchType.DISABLED;
  }, [theme]);

  return <Switch type={switchType} onPress={toggleTheme} />;
};
