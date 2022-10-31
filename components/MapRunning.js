import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Circle } from 'react-native-maps';
import { selectLocation } from '../slices/runSlice';
import { useSelector } from 'react-redux';


const MapRunning = () => {

    const position = useSelector(selectLocation);

  return (
    <View style={styles.container} pointerEvents="none">
        <MapView 
            //ref={watchId}
            region={{
                latitude:position?.position.coords.latitude || 59.32487,
                longitude:position?.position.coords.longitude || 18.07221,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            minZoomLevel={18}
            style={{flex:1, opacity: 1}}>
            
            {position?.position.coords && (
                <Circle
                center={{
                    latitude:position?.position.coords.latitude || 59.32487,
                    longitude:position?.position.coords.longitude || 18.07221,
                }}
                radius={3}
                fillColor="red"
                /> 
            )}
                    
        </MapView>
  
    </View>

  )
}

export default MapRunning

const styles = StyleSheet.create({
    container: {height: '100%', width: '100%'}
})