import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppearanceProvider from './components/appearanceProvider';
import type { AppStackParamsList } from './types';
import RootScreen from './screens/Root';
import { FlatListExampleScreen } from './screens/basic/BasicExamples';

const Stack = createStackNavigator<AppStackParamsList>();
function App() {
  return (
    <AppearanceProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Root">
          <Stack.Screen
            name="Root"
            getComponent={() => RootScreen}
            options={{ headerShown: false }}
          />
          {/* static examples */}
          <Stack.Screen
            name="Basic/FlatListExample"
            options={{
              title: 'Selection Mode'
            }}
            getComponent={() => FlatListExampleScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default App;
