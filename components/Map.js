import { StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location';
import { useState, useEffect } from "react";
import React from 'react'
import tw from "twrnc"

import MapView from 'react-native-maps';
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'


const Map = () => {

  const mapRef = useRef(null);
   const [position, setPosition] = useState(null);




   return(
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

export default Map

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});


/*const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);

useEffect(() => {
  (async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();
}, []);

let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location);
}

return (
  <View style={styles.container}>
    <Text style={styles.paragraph}>{text}</Text>
  </View>
);*/
