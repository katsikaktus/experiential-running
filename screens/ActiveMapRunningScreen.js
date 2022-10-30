import { StyleSheet, Text, View } from 'react-native'
import React, {useCallback, useEffect, useRef, useState}from 'react'
import {useNavigation} from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, {Circle, Marker} from 'react-native-maps';



const ActiveMapRunningScreen = () => {
    const watchId = useRef(null);
    const navigation = useNavigation();

    // This state keeps check whether the screen is in focus or not
    const [inFocus, setInFocus] = useState(true);

    const [position, setPosition] = useState(null);



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
                pos => console.log("insider", pos),
                loc => setPosition(loc)
                );


    }


    const removeLocationUpdates = async () => {
        if (watchId.current !== null) {
            watchId.current.remove();
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
    <View style={styles.container} pointerEvents="none">
        <MapView 
            
            region={{
                latitude:position?.coords.latitude || 59.32487,
                longitude:position?.coords.longitude || 18.07221,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }} 
            minZoomLevel={18}
            style={{flex:1, opacity: 0.3}}>
            <Circle
            center={{
                latitude:position?.coords.latitude || 59.32487,
                longitude:position?.coords.longitude || 18.07221,
            }}
            radius={3}
            fillColor="red"
            />         
        </MapView>
      
    </View>
  )
}

export default ActiveMapRunningScreen

const styles = StyleSheet.create({
    container: {height: '100%', width: '100%'},

})