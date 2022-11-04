import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet } from 'react-native';

import MapTabNav from './MapTabNav';
import MapRunningNav from './MapRunningNav';
import StatusScreen from '../screens/StatusScreen';
import PreviousMapRunSummary from '../screens/PreviousMapRunSummary';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Pressable} from 'react-native';
import GhostRunScreen from '../screens/GhostRunScreen';
import SightseeingRunScreen from '../screens/SightseeingRunScreen';
import MenuScreen from '../screens/MenuScreen';

const MenuNav = () => {
    const Stack = createStackNavigator();

    return (
          <SafeAreaProvider>
            <Stack.Navigator>
              <Stack.Screen name="MenuScreen" component={MenuScreen}
              options={{
                title: (
                    <View style={styles.headerContainer}>
                      <Text style={styles.topLineHeader}>
                        {"EXPERIENTIAL"}
                      </Text>
                      <Text style={styles.secondLineHeader}>{"RUNNING"}</Text>
                    </View>
                  
                ),
                headerTitleAlign:"center",
                headerLeft: null,
                headerStyle: {height:120, backgroundColor: "white"},
              }}
              />
              <Stack.Screen name="StatusScreen" component={StatusScreen}
              options={{
                headerShown: false,}}
              />
              <Stack.Screen name="MapTabNav" component={MapTabNav}
              options={{
                headerShown: false,}}
              />
              <Stack.Screen name="MapRunningNav" component={MapRunningNav}
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
  
            <Stack.Screen name="GhostRunScreen" component={GhostRunScreen}
            options={{
              headerTitle: "Ghost Run"
            }}/>
  
            <Stack.Screen name="SightseeingRunScreen" component={SightseeingRunScreen}
            options={{
              headerTitle: "Sightseeing Run"
            }}/>
  
            </Stack.Navigator>
  
          </SafeAreaProvider>
    )
}

export default MenuNav

const styles = StyleSheet.create({

  headerContainer:{

  },

  topLineHeader:{

    fontSize:20, 
    color:"#9B77DA", 
    fontStyle:"Poppins", 
    fontWeight: 'bold', 
    textAlign: "center",
  
  },
  secondLineHeader:{
    fontSize:14, 
    color:"#9B77DA", 
    fontStyle:"Poppins", 
    textAlign: "center",
    marginBottom: 0

  }
})