import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeScreen,
  PickersScreen,
  CalendarsScreen,
  ElementsScreen
} from './screens';
import StorybookUIRoot from './storybook/Storybook';
import type { RootStackParamList } from './types';

/**
 * Side-effect import, which registers FontAwesome icons
 * as library. This allows to use these icons using simple
 * icon names, without importing them directly.
 */
import './configs/fontAwesome';

const Stack = createNativeStackNavigator<RootStackParamList>();

// @ts-ignore
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          // @ts-ignore
          headerStyle: { elevation: 0 },
          headerTitleStyle: {
            fontFamily: 'OpenSans-Regular',
            fontSize: 22
          },
          headerShadowVisible: false
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name='Pickers' component={PickersScreen} />
        <Stack.Screen name='Elements' component={ElementsScreen} />
        <Stack.Screen name='Calendars' component={CalendarsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// export default App;
export { StorybookUIRoot as default };
