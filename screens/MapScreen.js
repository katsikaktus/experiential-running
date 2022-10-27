import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import NavOptions from '../components/NavOptions';
import {setOrigin } from '../slices/navSlice';


const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  

  return (
    <View>
      <View style={tw `h-1/2`}>
        <Map />
      </View>
      

      <View style={tw `h-1/2`}>
        
      </View>
        
    </View>
  );
};

export default MapScreen

const styles = StyleSheet.create({})