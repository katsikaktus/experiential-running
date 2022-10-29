import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import MapTabNav from './MapTabNav';
import StatusScreen from '../screens/StatusScreen';
import PreviousMapRunSummary from '../screens/PreviousMapRunSummary';
import ActiveMapScreen from '../screens/ActiveMapScreen';


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
            <Stack.Screen name="MapTabNav" component={MapTabNav}
            options={{
              headerShown: false,}}
            />
            <Stack.Screen name="StatusScreen" component={StatusScreen}
            options={{
              headerShown: false,}}
            />
            <Stack.Screen name="PreviousMapRunSummary" component={PreviousMapRunSummary}
            options={{
              headerShown: false,}}
            />
          </Stack.Navigator>

        </SafeAreaProvider>
      </NavigationContainer>
  )
}

export default HomePageNav