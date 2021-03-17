import React, { useCallback, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import { AppearanceProvider } from './components/appearanceProvider';
import { Showcase, ThemeSwitch } from './screens/showcase';
import { OneDaySelection } from './screens/basic/OneDaySelection';
import { WithBottomSheet } from './screens/basic/WithBottomSheet';
import { AppProvider } from './contexts/internal';
import type { AppContextState } from './contexts/internal';
import type { AppStackParamsList } from './types';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Switch } from './components/switch';
import { Header } from './screens/showcase/Header';

const Stack = createStackNavigator<AppStackParamsList>();

// const Showcase = () => {
//   return (
//     <View style={{ width: '100%', height: '100%', backgroundColor: 'orange' }}>
//       <Text>Some text!</Text>
//     </View>
//   );
// };

export const App = () => {
  const [state, setState] = useState<AppContextState>({
    theme: 'light',
    toggleTheme: () => {}
  });

  const toggleTheme = useCallback(() => {
    setState((prev) => {
      return { ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' };
    });
  }, []);

  const appContextVariables = useMemo(
    () => ({
      ...state,
      toggleTheme
    }),
    [state, toggleTheme]
  );

  const foregroundStyles = useMemo<TextStyle>(() => {
    return {
      color: state.theme === 'light' ? 'black' : 'white'
    };
  }, [state.theme]);

  const headerStyles = useMemo<ViewStyle>(() => {
    return {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: state.theme === 'light' ? 'white' : 'black'
    };
  }, [state.theme]);

  return (
    <AppProvider value={appContextVariables}>
      <AppearanceProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Showcase"
            screenOptions={{
              headerStyle: headerStyles,
              headerTitleStyle: foregroundStyles,
              headerTintColor: foregroundStyles.color
            }}
          >
            <Stack.Screen
              name="Showcase"
              getComponent={() => Showcase}
              options={{
                header: Header
              }}
            />
            {/* static examples */}
            <Stack.Screen
              name="OneDaySelection"
              options={{
                title: 'Selection Mode'
              }}
              getComponent={() => OneDaySelection}
            />
            <Stack.Screen
              name="Basic/WithBottomSheet"
              options={{
                title: 'With BottomSheet'
              }}
              getComponent={() => WithBottomSheet}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  switch: {
    marginRight: 24
  }
});
