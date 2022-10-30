import { StyleSheet, Text, View } from 'react-native'
import React, {useCallback, useEffect, useRef, useState}from 'react'
import {useNavigation} from '@react-navigation/native';
import * as Location from 'expo-location';


const ActiveMapRunningScreen = () => {
    const watchId = useRef(null);
    const navigation = useNavigation();

    // This state keeps check whether the screen is in focus or not
    const [inFocus, setInFocus] = useState(true);


    const getLocationUpdates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        
        // updates will only occur while the application is in the foreground.
        watchId.current = await Location.watchPositionAsync(
            {accuracy:Location.Accuracy.High,
            timeInterval: 3000,
            distanceInterval: 0},
            position => {

                console.log(position)
            });
      


    }

     // Function to remove location updates api
    const removeLocationUpdates = () => {
        if (watchId.current !== null) {
            watchId.current.remove()
        }
    };


    // This useEffect add listener to focus event
    useEffect(
        () =>
        navigation.addListener('focus', event => {
            setInFocus(true);
            getLocationUpdates();
        }),[navigation],);

    // This useEffect add listener to blur event
    useEffect(
        () =>
        navigation.addListener('blur', event => {
            setInFocus(false);
            removeLocationUpdates();
        }),
        [navigation],
    );


  return (
    <View>
      <Text>ActiveMapRunningScreen</Text>
    </View>
  )
}

export default ActiveMapRunningScreen

const styles = StyleSheet.create({})