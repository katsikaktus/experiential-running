import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import GhostRunningScreen from '../screens/GhostRunningScreen';
import GhostPausedScreen from '../screens/GhostPausedScreen';


const GhostRunningNav = () => {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator initialRouteName="GhostRunning" screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="GhostRunning"
          component={GhostRunningScreen}
        />
        <Stack.Screen 
          name="GhostPause" 
          component={GhostPausedScreen} />
      </Stack.Navigator>
    )
}

export default GhostRunningNav