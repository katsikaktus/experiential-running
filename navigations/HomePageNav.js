import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import MapTabNav from './MapTabNav';
import StatusScreen from '../screens/StatusScreen';
import PreviousMapRunSummary from '../screens/PreviousMapRunSummary';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Pressable} from 'react-native';


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
              headerTitle: "Summary",
              headerStyle: {backgroundColor: colors.summaryHeader},
              headerRight: () => (
                <Pressable onPress={() => alert('Share this run')}>
                  <Fontisto name="share" size={20} style={{marginRight: 12}} />
                </Pressable>
              ),
            }}
            />
          </Stack.Navigator>

        </SafeAreaProvider>
      </NavigationContainer>
  )
}

export default HomePageNav