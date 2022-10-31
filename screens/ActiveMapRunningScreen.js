import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable } from 'react-native'
import React, {useCallback, useEffect, useRef, useState}from 'react'
import {useNavigation} from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, {Circle, Marker} from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../constants/colors'
import { calDistance, secondsToHm, calculatePace, pacePresentation, } from '../constants/calculations';
import { setTotalTime, setTotalDistance, selectTotalTime, selectTotalDistance } from '../slices/runSlice';
import MapRunning from '../components/MapRunning';
import { Avatar } from '@rneui/base';


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

    const [metric, setMetric] = useState('Kilometers');

    const [progress, setProgress] = useState('0%');
    const [currentPace, setCurrentPace] = useState('-\'--"');
    const [calories, setCalories] = useState('--');
    // Target value set by the user
    const [targetValue, setTargetValue] = useState('0.0');

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
       <View style={{
          position:"absolute",
          bottom: 0,
          right: 0,
          ...styles.mainContainer
        }}>
            


            {/* Progress bar */}
            <View style={styles.innerContainers}>


                <View style= {{
                    backgroundColor: colors.timeView,
                    ...styles.timeShapeView}}>
                    {/* Elapsed time */}
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricValue}>{metricValue}</Text>
                        <Text style={styles.metric}>ELAPSED TIME (HH:MM:SS)</Text>
                    </View>

                </View>

                <View style= {{
                    backgroundColor: colors.distanceView,
                    ...styles.distanceShapeView}}>
                    {/* Covered distance */}
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricValue}>{metricValue}</Text>
                        <Text style={styles.metric}>DISTANCE (KM)</Text>
                    </View>

                </View>

                <View style={styles.paceCalContainer}>
                    <View style= {{
                        backgroundColor: colors.currentPaceView,
                        ...styles.paceShapeView}}>
                        {/* Current Pace */}
                        <View style={styles.metricContainer}>
                            <Text style={styles.metricValue}>{currentPace}</Text>
                            <Text style={styles.metric}>CURRENT PACE</Text>
                        </View>

                    </View>
                    

                    <View style= {{
                        backgroundColor: colors.averagePaceView,
                        ...styles.paceShapeView}}>
                        {/* Averagege Pace */}
                        <View style={styles.metricContainer}>
                            <Text style={styles.metricValue}>{currentPace}</Text>
                            <Text style={styles.metric}>AVERAGE PACE</Text>
                        </View>

                    </View>
                
                </View>
                {/* Pause Button */}
                <View>
                    <Avatar
                    size={62}
                    rounded
                    icon={{name: 'pause'}}
                    onPress={() =>
                        navigation.navigate('Pause', {
                        calories: calories,
                        progressPercentage: progress,
                        })
                    }
                    activeOpacity={0.7}
                    titleStyle={styles.avatarTitle}
                    containerStyle={{backgroundColor: colors.pauseButton}}
                    />
                </View>
                
            
            </View>
            
        </View>

     </KeyboardAvoidingView>
    
  )
}

export default ActiveMapRunningScreen

const styles = StyleSheet.create({
    container: {height: '100%', width: '100%'},

    mainContainer: {
        height: '50%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
       
        marginBottom: 12,
    },

    
    paceCalContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        
        
    },

    // running information inside the boxes
    metricContainer: {justifyContent: 'center', alignItems: 'center'},
    metricValue: {fontSize: 40, fontWeight: 'bold', color: '#fff'},
    metric: {fontSize: 15, fontWeight: "100", color: '#fff'},

    // boxes around pace
    paceShapeView: {
       
        alignItems: 'center',
        
        paddingVertical:12,
        paddingHorizontal:24,
        borderRadius: 20,
        
        marginLeft:6,
        marginRight:6,
        marginBottom: 6,
    
    },

    // boxes around pace
    distanceShapeView: {
        
        alignItems: 'center',
        paddingVertical:12,
        paddingHorizontal:112,
        borderRadius: 20,
        marginLeft:6,
        marginRight:6,
        marginBottom: 6,
    
    },

    timeShapeView: {
        
        alignItems: 'center',
        paddingVertical:12,
        paddingHorizontal:70,
        borderRadius: 20,
 
        marginLeft:6,
        marginRight:6,
        marginBottom: 6,
    
    },


    innerContainers: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginBottom: 12,
    },


    

})