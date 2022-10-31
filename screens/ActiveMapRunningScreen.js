import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import React, {useCallback, useEffect, useRef, useState}from 'react'
import {useNavigation} from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, {Circle, Marker} from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { calDistance, secondsToHm, calculatePace, pacePresentation, } from '../constants/calculations';
import { setTotalTime, setTotalDistance, selectTotalTime, selectTotalDistance } from '../slices/runSlice';
import MapRunning from '../components/MapRunning';

const ActiveMapRunningScreen = () => {
    const watchId = useRef(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    let totalTime = useSelector(selectTotalTime);
    let totalDistance = useSelector(selectTotalDistance);



    // This state keeps check whether the screen is in focus or not
    const [inFocus, setInFocus] = useState(true);

    const [position, setPosition] = useState(null);
    const [metricValue, setMetricValue] = useState('0.0');




    const getLocationUpdates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let oldLocation = null;
        let oldTime = null;
        // updates will only occur while the application is in the foreground.
        watchId.current = await Location.watchPositionAsync(
                {   
                    accuracy:Location.Accuracy.High,
                    timeInterval: 500,
                    distanceInterval: 0
                },

        
                position => {
                    console.log("insider", position);
                    let newDistance;
                    let newTime;
                    if (oldLocation == null) {
                        newDistance = '0.0';
                        totalDistance = 0.0;
                        newTime = 0;
                        totalTime = 0;
                        newTime = 0
                        oldTime = position.timestamp
                    } else {
                        newDistance = calDistance(
                        oldLocation.coords.latitude,
                        oldLocation.coords.longitude,
                        position.coords.latitude,
                        position.coords.longitude,
                        );
                        // change to timestamp
                        newTime = position.timestamp - oldTime
                    }
                    totalDistance = totalDistance + parseInt(newDistance);
                    setMetricValue(totalDistance);
                    totalTime = totalTime + newTime;
                    console.log("total time", totalTime)
                    oldLocation = position
                    setPosition(position)
                    dispatch(
                        setTotalTime({
                            time: totalTime
                        }),

                    )
                    dispatch(
                        setTotalDistance({
                            distance: totalDistance
                        })
                    
                    )

                },
                
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
        [navigation],);

  

  return (
    <KeyboardAvoidingView
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     style={styles.container}>
       <MapRunning/>
     </KeyboardAvoidingView>
    
  )
}

export default ActiveMapRunningScreen

const styles = StyleSheet.create({
    container: {height: '100%', width: '100%'},

})