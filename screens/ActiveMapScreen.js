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
import ghost_icon from "../assets/ghost_icon.png"
import tower_icon from "../assets/tower_icon.png"
import { current } from '@reduxjs/toolkit';



const ActiveMapScreen = () => {

  const CHANGE_TIME_PROMPT = "Change to time goal"
  const CHANGE_DISTANCE_PROMPT = "Change to distance goal"
  const SET_TIME_PROMPT = "Hours : Minutes"

  //const SET_TIME_PROMPT = "Set timer (HH:MM)"
  const SET_DISTANCE_PROMPT = "Set distance (km)"


  // Ref for interval to update the location
  const interval = useRef(null);

  // Initialize navigation hook
  const navigation = useNavigation();

  const dispatch = useDispatch();
  



  // States:
  // 1. For metric value
  const [metricValue, setMetricValue] = useState('1.0');
  // 2. Toggling
  const [Toggle, setToggle] = useState(CHANGE_TIME_PROMPT);
  // 3. Metric Unit
  const [MetricUnit, setMetricUnit] = useState(SET_DISTANCE_PROMPT);

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

  // TODO update this function
  const changeMetricValueHandler = input => {
    if (validateInput(input, Toggle)) {
      if (input[0] == '.' || input[0] == ':') {
        input = '0' + input;
  
      }
      if (input[input.length - 1] == '.' || input[input.length - 1] == ':') {
        input = input + '0';
      }
      setMetricValue(input);
    }
  };

  // Toggle Function
  const toggleHandler = () => {
    if (Toggle == CHANGE_TIME_PROMPT) {
      setToggle(CHANGE_DISTANCE_PROMPT);
      setMetricUnit(SET_TIME_PROMPT);
      setMetricValue('01:00');
    } else {
      setToggle(CHANGE_TIME_PROMPT);
      setMetricUnit(SET_DISTANCE_PROMPT);
      setMetricValue('1.0');
    }
  };


  return (
    <KeyboardAvoidingView
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     style={styles.container}>

      {/* Google maps */}
      <MapLocation/>
    
      <View style={{
          position:"absolute",
          bottom: 0,
          right: 0,
          ...styles.mainContainer
        }}>
        {/* Set the distance or time to run */}
    
        <View style={styles.topContainer}>
          <Pressable 
              onPress = {toggleHandler}
              style={styles.toggleContainer}>
              <Text style={styles.toggleTitle}>{Toggle}</Text>
            </Pressable> 
          <TextInput
            style={styles.metricValue}
            keyboardType="decimal-pad"
            value={metricValue}
            onChangeText={changeMetricValueHandler}
          />
          <Text style={styles.metricUnit}>{MetricUnit}</Text>
        </View>
         
        
        
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
            navigation.navigate("MapRunningNav", {
              screen: "Running",
              params: {targetValue: metricValue, metric: Toggle},
              
            })}
            style={styles.startButtonContainer}>
          
            <Text style={styles.startButtonTitle}> RUN </Text>
          </Pressable>

          <Pressable 
          onPress = {() => 
            navigation.navigate("GhostRunScreen")}>

            <View style= {{
              backgroundColor: colors.ghostRunInitialButton,
              ...styles.squareShapeView}}>
              <Image source={ghost_icon} style={{ width: 40, height: 38, alignSelf:"center", marginTop:20 }} />
            </View>
            

          </Pressable>

          


          
        </View>

    

      </View>

    </KeyboardAvoidingView>


  )
}

export default ActiveMapScreen

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

  topContainer: {
    justifyContent: 'space-between', 
    alignItems: 'center'
  },

  metricValue: {
    fontSize: 48,
    //fontWeight: 'bold',
    borderBottomWidth: 2,
    marginBottom: 4,
    alignSelf: 'center',
    flexShrink: 1,
    color: '#000',
    
  },

  metricUnit: {
    alignSelf: 'center', 
    fontSize: 18, 
    fontWeight: 'bold'
  },

  toggleContainer: {

    height: 46,
    width: 220,
    padding: 12,
    borderRadius: 28,
    borderColor: colors.toggleButtonBorder,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 6,
    backgroundColor: colors.toggleButtonBackground,
    
  },

  toggleTitle: {fontSize: 16, fontWeight: 'bold', alignSelf: 'center', color:colors.startRunButton},


  bottomContainer: {
    justifyContent: 'space-between', 
    alignItems: 'center',
    flexDirection: 'row',
    
  },

 

  startButtonTitle: {
    fontSize: 28, 
    color: colors.mapRunScreenText, 
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  startButtonContainer: {
    height: 79,
    width: 162,
    backgroundColor: colors.startRunButton,
    borderColor: colors.startRunButton,
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

