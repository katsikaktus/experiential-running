import { Pressable, StyleSheet, Image, Text, View, TextInput, KeyboardAvoidingView} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

import colors from '../constants/colors'
import { validateInput } from '../constants/distanceInputValidation'
import {useNavigation} from '@react-navigation/native';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';

import MapView, {Circle, Marker} from 'react-native-maps';
import MapLocation from '../components/MapLocation';
import { setLocation, setCurrentRun, saveCurrentPath, clearCurrentPath } from '../slices/runSlice';
import maps_page_icon from "../assets/maps_page_icon.png"
import tower_icon from "../assets/tower_icon.png"
import { current } from '@reduxjs/toolkit';
import MapGhostRun from '../components/MapGhostRun';

const GhostRunScreen = () => {
  // Ref for interval to update the location
  const interval = useRef(null);

  // Initialize navigation hook
  const navigation = useNavigation();

  const dispatch = useDispatch();
  

  // 4. Keeping track of position (lat and long)
  const [position, setPosition] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
      
    setPosition(location);
    //console.log("current location", location)
    dispatch(
      setLocation({
          position: location
      }),

    )

    dispatch(
      clearCurrentPath({
        savedPath: []
      }),

    )
    
  }


  // useEffect triggered whenever the screen is in focus
  useEffect(() => {
    navigation.addListener('focus', event => {
      interval.current = setInterval(() => getLocation(), 30000);
      getLocation();
      dispatch(
        setCurrentRun({
          distance: 0,
          time: 0,
          savedPath: []
        })
      );

     
      
    });

    return () => clearInterval(interval.current);
  }, [navigation]);

  // useEffect triggered whenever the screen is out of focus
  useEffect(() => {
    navigation.addListener('blur', event => {
      clearInterval(interval.current);
      interval.current = null;
    });
  }, [navigation]);

  
  return (
    <KeyboardAvoidingView
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     style={styles.container}>

      {/* Google maps */}
      <MapGhostRun/>
    
      <View style={{
          position:"absolute",
          bottom: 0,
          right: 0,
          ...styles.mainContainer
        }}>
        
        
        
        {/* Bottom navigation */}
        <View style={styles.bottomContainer}>
          
          <Pressable
            onPress = {() => 
              navigation.navigate("SightseeingRunScreen")}>
            <View style= {{
              backgroundColor: colors.sightseeingButton,
              ...styles.squareShapeView}}>
              <Image source={tower_icon} style={{ width: 29, height: 50, alignSelf:"center", marginTop:14}} />
            </View>

          </Pressable>

          <Pressable
            onPress = {() => 
              navigation.navigate("GhostRunningNav", {
                screen: "GhostRunning",
                
              })}
            style={styles.ghostButtonContainer}>
          
            <Text style={styles.startButtonTitle}> RUN </Text>
          </Pressable>

          <Pressable 
          onPress = {() => 
            navigation.navigate("GhostRunScreen")}>

            <View style= {{
              backgroundColor: '#9B77DA',
              ...styles.squareShapeView}}>
              <Image source={maps_page_icon} style={{ width: 48, height: 56, alignSelf:"center", marginTop:10 }} />
            </View>
            

          </Pressable>

          


          
        </View>

    

      </View>

    </KeyboardAvoidingView>
  )
}

export default GhostRunScreen

const styles = StyleSheet.create({
  container: {height: '100%', width: '100%'},


  mainContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

 






  bottomContainer: {
    justifyContent: 'space-between', 
    alignItems: 'center',
    flexDirection: 'row',
    position: "absolute",
    bottom:0
    
  },

 

  startButtonTitle: {
    fontSize: 28, 
    color: colors.mapRunScreenText, 
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  ghostButtonContainer: {
    height: 79,
    width: 162,
    backgroundColor: colors.ghostRunButton,
    borderColor: colors.ghostRunButton,
    paddingTop: 22,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 6,
    marginBottom: 32,
    marginLeft: 12,
    marginRight: 12,
    alignItems: 'center',
  },

  squareShapeView: {
    width: 73,
    height: 79,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 6,
    marginBottom: 32,

  }
})