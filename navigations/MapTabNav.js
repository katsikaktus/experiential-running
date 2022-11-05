import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
import ActiveMapScreen from '../screens/ActiveMapScreen'
import HistoryMapScreen from '../screens/HistoryMapScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



const MapTabNav = () => {
  const Tab = createMaterialTopTabNavigator();


  return (
      <Tab.Navigator>
        <Tab.Screen name="ActiveMapScreen" component={ActiveMapScreen} 
        options={{
          tabBarLabel: "Active",
          tabBarLabelStyle:{fontWeight:"bold"}}}/>

        <Tab.Screen name="HistoryMapScreen" component={HistoryMapScreen}
        options={{
          tabBarLabel: "History",
          tabBarLabelStyle:{fontWeight:"bold"}}} />
      </Tab.Navigator>
  );
};

export default MapTabNav

const styles = StyleSheet.create({})
