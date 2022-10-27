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
  const origin = useSelector(selectOrigin)

  const mapRef = useRef(null);

  const zoomToMarkers = () => {
    const zoomTimer = setInterval(() => {
      mapRef.current?.fitToSuppliedMarkers(["origin"], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      });
      clearInterval(zoomTimer);
    }, 512);
  };

  useEffect(() => {
      zoomToMarkers();
  }, [origin]);

  


   return(
    <MapView  
      ref={mapRef}
      style={tw `flex-1`}
      mapType="mutedStandard"
      
      initialRegion={{
          latitude: origin.location.coords.latitude,
          longitude: origin.location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
      }}
    >

      {origin?.locatio.coords && (
          <Marker
              coordinate={{
                latitude: origin.location.coords.latitude,
                longitude: origin.location.coords.longitude,
              }}
              title="Origin"
              identifier="origin"
          />
      )}

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
