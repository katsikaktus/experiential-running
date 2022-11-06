import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable, Alert } from 'react-native'
import React, {useCallback, useEffect, useRef, useState}from 'react'
import {useNavigation} from '@react-navigation/native';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../constants/colors'
import { calDistance, secondsToHm, calculatePace, pacePresentation, getDayName, } from '../constants/calculations';
import { setLocation,  selectCurrentRun, setCurrentRun, saveCurrentPath } from '../slices/runSlice';
import MapGhostRun from '../components/MapGhostRun';
import { Avatar } from '@rneui/base';

const GhostRunningScreen = () => {
    const watchId = useRef(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Getting the passed parameters from the ActiveMapScreen 

    // get data from redux store

    let currentRun = useSelector(selectCurrentRun);
    let totalTime = currentRun.time;
    let totalDistance = currentRun.distance;

    // This state keeps check whether the screen is in focus or not
    const [inFocus, setInFocus] = useState(true);

    const [position, setPosition] = useState(null);

    const [coveredDistanceValue, setCoveredDistanceValue] = useState('0.00');
    const [elapsedTimeValue, setElapsedTimeValue] = useState('00:00:00');
    
    // not visually included so far
    const [progress, setProgress] = useState('0%');
    const [currentPace, setCurrentPace] = useState('0:00');
    const [averagePace, setAveragePace] = useState('0:00');

    
    // Target value set by the user
    const [targetValue, setTargetValue] = useState('0.0');

    const saveCoords = (position) => {
        dispatch(
            saveCurrentPath({
                
                id: new Date().toLocaleDateString(),
                timestamp: position?.timestamp || 0,
                latitude: position?.coords.latitude || 59.32487,
                longitude: position?.coords.longitude || 18.07221,
            }),
         
        );
      };

  
    const backButtonCallback = useCallback(
        event => {
          // prevent default behavior
          event.preventDefault();
    
          // Alert to confirm his action
          Alert.alert(
            'Discarding Run',
            'Are you sure you want to discard this run?',
            [
              {text: 'No', style: 'cancel', onPress: () => {}},
              {
                text: 'Yes',
                style: 'destructive',
                onPress: () => navigation.dispatch(event.data.action),
              },
            ],
          );
        },[navigation],
    );

      // UseEffect runs only when the navigation back button is pressed
    useEffect(() => {
        if (inFocus) navigation.addListener('beforeRemove', backButtonCallback);
        return () => navigation.removeListener('beforeRemove', backButtonCallback);
    }, [navigation, inFocus]);

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
                    timeInterval: 1000,
                    distanceInterval: 0
                },

        
                position => {
                    let newDistance;
                    let newTime;
                    if (oldLocation == null || oldTime == null) {
                        newDistance = 0;
                        newTime = 0;
                        oldTime = position.timestamp
                    } else {
                        newDistance = calDistance(
                            oldLocation.coords.latitude,
                            oldLocation.coords.longitude,
                            position.coords.latitude,
                            position.coords.longitude,
                        );
                        newTime = position.timestamp - oldTime
                    }
                    totalDistance = totalDistance + parseFloat(newDistance);
                    setCoveredDistanceValue(totalDistance.toFixed(2));

                    totalTime = totalTime + newTime;
                
                    setElapsedTimeValue(secondsToHm(totalTime))

                    setAveragePace(pacePresentation(calculatePace(totalDistance, totalTime)))
                    setCurrentPace(pacePresentation(calculatePace(newDistance, 1000)))
             
                    oldTime = position.timestamp
                    oldLocation = position
                    
                    setPosition(position)
                    saveCoords(position)


                    dispatch(
                        setCurrentRun({
                            distance: totalDistance,
                            time: totalTime,
                            savedPath: []
                        })
                    )

                    dispatch(
                        setLocation({
                            oldLocation: oldLocation,
                            position: position
                        }),
                    
                    )


                },
                
            );

        


    }


    const removeLocationUpdates = async () => {
        if (watchId.current !== null) {
            watchId.current.remove();
            watchId.current = null;
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
       <MapGhostRun/>
       <View style={{
          position:"absolute",
          bottom: 0,
          right: 0,
          ...styles.mainContainer
        }}>
            


            <View style={styles.innerContainers}>

                <View style= {{
                    backgroundColor: colors.timeView,
                    ...styles.timeShapeView}}>
                    {/* Elapsed time */}
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricValue}>{elapsedTimeValue}</Text>
                        <Text style={styles.metric}>ELAPSED TIME (HH:MM:SS)</Text>
                    </View>

                </View>

                <View style= {{
                    backgroundColor: colors.distanceView,
                    ...styles.distanceShapeView}}>
                    {/* Covered distance */}
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricValue}>{coveredDistanceValue}</Text>
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
                            <Text style={styles.metricValue}>{averagePace}</Text>
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
                        navigation.navigate('GhostPause', {
                        currentPace: currentPace,
                        averagePace: averagePace
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

export default GhostRunningScreen

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