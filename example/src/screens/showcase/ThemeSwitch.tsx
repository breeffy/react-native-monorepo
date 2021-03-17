import React, { useCallback, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Switch, SwitchType } from '../../components/switch';

export const ThemeSwitch = () => {
  const [switchType, setSwitchType] = useState(SwitchType.ENABLED);
  const { toggleTheme } = useAppContext();

  const toggleSwitch = useCallback(() => {
    setSwitchType((prev) => {
      return prev === SwitchType.DISABLED
        ? SwitchType.ENABLED
        : SwitchType.DISABLED;
    });
  }, [setSwitchType]);

  const onSwitchPress = useCallback(() => {
    toggleSwitch();
    toggleTheme();
  }, [toggleSwitch, toggleTheme]);

  return <Switch type={switchType} onPress={onSwitchPress} />;
};
