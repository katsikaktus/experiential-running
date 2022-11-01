import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable, Alert } from 'react-native'
import React from 'react'
import MapRunning from '../components/MapRunning';

import { useDispatch, useSelector } from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import { setLocation, setTotalTime, setTotalDistance, selectLocation, selectTotalTime, selectTotalDistance } from '../slices/runSlice';
import { Avatar } from '@rneui/base';
import Toast from 'react-native-root-toast';




const PausedMapRunningScreen = ({route}) => {
  const elapsedTimeValue = useSelector(selectTotalTime)
  const coveredDistanceValue = useSelector(selectTotalDistance)
  const navigation = useNavigation();

  const {currentPace, averagePace} = route.params;
  

  
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
                        <Text style={styles.metricValue}>{elapsedTimeValue.time}</Text>
                        <Text style={styles.metric}>ELAPSED TIME (HH:MM:SS)</Text>
                    </View>

                </View>

                <View style= {{
                    backgroundColor: colors.distanceView,
                    ...styles.distanceShapeView}}>
                    {/* Covered distance */}
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricValue}>{coveredDistanceValue.distance}</Text>
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
                <View style={styles.playPauseCalContainer}>
                  <View style= {{marginRight:6}}>
                      <Avatar
                      size={62}
                      rounded
                      icon={{name: 'play'}}
                      onPress={() =>
                        navigation.goBack()
                      }
                      activeOpacity={0.7}
                      titleStyle={styles.avatarTitle}
                      containerStyle={{backgroundColor: colors.playButton}}
                      />
                  </View>
                  <View style= {{marginLeft:6}}>
                      <Avatar
                      size={62}
                      rounded
                      icon={{name: 'stop'}}
                      //onLongPress={saveRun}
                      onPress={() =>
                          Toast.show('Press the button for 5 seconds to save and exit your run.', {
                          duration: Toast.durations.LONG,
                        })
                      }
                      activeOpacity={0.7}
                      titleStyle={styles.avatarTitle}
                      containerStyle={{backgroundColor: colors.stopButton}}
                      />
                  </View>

                </View>
                
                
                
            
            </View>
            
        </View>

     </KeyboardAvoidingView>
    
  )
}

export default PausedMapRunningScreen

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


  playPauseCalContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal:6
    
    
  },


  

})