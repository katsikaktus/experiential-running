import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MapTabNav from './MapTabNav';
import MapRunningNav from './MapRunningNav';
import StatusScreen from '../screens/StatusScreen';
import PreviousMapRunSummary from '../screens/PreviousMapRunSummary';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Pressable} from 'react-native';
import GhostRunScreen from '../screens/GhostRunScreen';
import SightseeingRunScreen from '../screens/SightseeingRunScreen';
import StartUpScreen from '../screens/StartUpScreen';
import MenuNav from './MenuNav';


const HomePageNav = () => {

    const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
           <Stack.Screen name="StartUpScreen" component={StartUpScreen}
            options={{
              headerShown: false,}}
            />
          <Stack.Screen name="MenuNav" component={MenuNav}
          options={{
            headerShown: false,
          }}/>

          </Stack.Navigator>

        </SafeAreaProvider>
      </NavigationContainer>
  )
}

export default HomePageNav