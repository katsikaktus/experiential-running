import { StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location';
import { useState, useEffect } from "react";
import React from 'react'
import MapView from 'react-native-maps';

const Map = () => {

   return(
    <MapView>
      
    </MapView>
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
