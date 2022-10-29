import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
import Map from '../components/Map'
import ActiveMapScreen from './ActiveMapScreen'
import HistoryMapScreen from './HistoryMapScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



const MapScreen = () => {
  const Tab = createMaterialTopTabNavigator();


  return (
      <Tab.Navigator style={tw `pt-11`}>
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

export default MapScreen

const styles = StyleSheet.create({})
