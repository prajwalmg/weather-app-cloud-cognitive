/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/Home';
import Country from './screens/Country';
import Weather from './screens/Weather';
import NotFound from './screens/NotFound';

export type StackNavigatorParamsList = {
  Home: undefined;
  Country: {
    flag: string;
    capital: string;
    population: string;
    latitude: string;
    longitude: string;
  };
  Weather: {
    weather_icon: string;
    temperature: string;
    precipitation: string;
    wind_speed: string;
  };
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParamsList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Country"
          component={Country}
          options={{headerTitleStyle: {fontWeight: '400', fontSize: 18}}}
        />
        <Stack.Screen
          name="Weather"
          component={Weather}
          options={{headerTitleStyle: {fontWeight: '400', fontSize: 18}}}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFound}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
