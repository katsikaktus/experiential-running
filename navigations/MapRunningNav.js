import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import ActiveMapRunningScreen from '../screens/ActiveMapRunningScreen';
import PausedMapRunningScreen from '../screens/PausedMapRunningScreen';

const MapRunningNav = () => {
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Running" screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="Running"
        component={ActiveMapRunningScreen}
      />
      <Stack.Screen 
        name="Pause" 
        component={PausedMapRunningScreen} />
    </Stack.Navigator>
  )
}

export default MapRunningNav