import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../../hooks/useAppContext';
// import { Switch, SwitchType } from '../../components/switch';
import { ThemeSwitch } from './ThemeSwitch';

export const Header = () => {
  const { theme } = useAppContext();

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      { backgroundColor: theme === 'light' ? 'white' : 'black' }
    ];
  }, [theme]);

  const textStyle = useMemo(() => {
    return [styles.text, { color: theme === 'light' ? 'black' : 'white' }];
  }, [theme]);

  const text = useMemo(() => {
    const themeName = theme === 'light' ? 'Light' : 'Dark';
    return `${themeName} Theme`;
  }, [theme]);

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{text}</Text>
      <ThemeSwitch />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  text: { fontSize: 18 }
});
