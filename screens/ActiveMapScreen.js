import { Pressable, StyleSheet, Text, View, TextInput, KeyboardAvoidingView} from 'react-native'
import React, { useState, useRef } from 'react'
import tw from "twrnc"
import Map from '../components/Map'
import colors from '../constants/colors'
import { validateInput } from '../constants/distanceInputValidation'
import GeoLocation from 'react-native-geolocation-service';

import MapView, {Circle} from 'react-native-maps';


const ActiveMapScreen = () => {

  // Ref for interval
  const interval = useRef(null);
  const mapRef = useRef(null);


  // Initialize navigation hook
  //const navigation = useNavigation();

  // States:
  // 1. For metric value
  const [metricValue, setMetricValue] = useState('1.0');
  // 2. Toggling
  const [Toggle, setToggle] = useState('Distance');
  // 3. Metric Unit
  const [MetricUnit, setMetricUnit] = useState('Kilometers');

  // 4. Keeping track of position (lat and long)
  const [position, setPosition] = useState(null);


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
    if (Toggle == 'Distance') {
      setToggle('Time');
      setMetricUnit('Hours : Minutes');
      setMetricValue('01:00');
    } else {
      setToggle('Distance');
      setMetricUnit('Kilometers');
      setMetricValue('1.0');
    }
  };


  return (
    <KeyboardAvoidingView
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     style={styles.container}>

      {/* Google maps */}
      {/* pointerEvents="none" freezes the map */}
      <View style={styles.container} pointerEvents="none">
        <MapView 
        
        
          initialRegion={{
              latitude: 59.32487,
              longitude: 18.07221,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }} 
            minZoomLevel={18}
            style={{flex:1, opacity: 0.3}}>
            <Circle
              center={{
                latitude: 59.32487,
                longitude: 18.07221,
              }}
              radius={3}
              fillColor="red"
            />
            </MapView>
          
      </View>
        

      <View style={{
        position:"absolute",
        bottom: 0,
        right: 0,
        ...styles.mainContainer
        }}>
        {/* Set the distance or time to run */}
        <View>
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
            onPress = {() => console.log ("run")}
            style={styles.startButtonContainer}>
            <Text style={styles.startButtonTitle}> RUN </Text>
          </Pressable>

          <Pressable 
            onPress = {toggleHandler}
            style={styles.toggleContainer}>
            <Text style={styles.toggleTitle}>{Toggle}</Text>
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

  metricValue: {
    fontSize: 52,
    fontWeight: 'bold',
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
    width: 100,
    padding: 12,
    borderWidth: 2,
    borderRadius: 28,
    borderColor: colors.toggleButtonBorder,
    marginTop: 28,
    marginBottom: 6,
    backgroundColor: colors.toggleButtonBackground,
  },

  toggleTitle: {fontSize: 16, fontWeight: 'bold', alignSelf: 'center',},


  bottomContainer: {
    justifyContent: 'space-between', 
    alignItems: 'center'},

  startButtonTitle: {
    fontSize: 28, 
    color: colors.mapRunScreenText, 
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  startButtonContainer: {
    height: 70,
    width: 150,
    backgroundColor: colors.startButton,
    borderColor: colors.startButton,
    paddingTop: 16,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 6,
    marginBottom: 6,

    alignItems: 'center',
  },

})


/*<View style={tw `h-full`}>
        <Map />
        
</View>*/