import { StyleSheet, Text,SafeAreaView, View } from 'react-native'
import NavOptions from '../components/NavOptions';
import React from 'react'
import tw from "twrnc";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { setDestination, setOrigin } from '../slices/navSlice';




const HomeScreen = () => {
    // push information to data layout
    const dispatch = useDispatch();
    const [location, setOrigin] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
      
          let currentLocation = await Location.getCurrentPositionAsync({});
          //setLocation(location);
          dispatch(
            setOrigin({
              location: currentLocation,
            })
          )
          
        })();
      }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location.location.coords.latitude);
    }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-10`}>
            <Text>{text}</Text>
            
            <NavOptions />
        </View>
    </SafeAreaView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({})