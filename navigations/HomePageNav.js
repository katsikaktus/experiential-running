import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import React from 'react'

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import StatusScreen from '../screens/StatusScreen';


const HomePageNav = () => {

    const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen}
            options={{
              headerShown: false,}}
            />
            <Stack.Screen name="MapScreen" component={MapScreen}
            options={{
              headerShown: false,}}
            />
            <Stack.Screen name="StatusScreen" component={StatusScreen}
            options={{
              headerShown: false,}}
            />
          </Stack.Navigator>

        </SafeAreaProvider>
      </NavigationContainer>
  )
}

export default HomePageNav