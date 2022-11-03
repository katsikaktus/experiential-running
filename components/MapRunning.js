import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Circle, Polyline } from 'react-native-maps';
import { selectCurrentPath, selectLocation } from '../slices/runSlice';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';


const MapRunning = () => {

    const position = useSelector(selectLocation);
    const path = useSelector(selectCurrentPath);
    //console.log("whats up Maprunning", path)

    const currentPoint = {
        latitude:position?.position.coords.latitude || 59.32487,
        longitude:position?.position.coords.longitude || 18.07221,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    
    const previousPoint = {
        latitude:position?.oldLocation?.coords.latitude || 59.32487,
        longitude:position?.oldLocation?.coords.longitude || 18.07221,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const pathPoints = {
        latitude:path?.latitude || 59.32487,
        longitude:path?.longitude || 18.07221,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

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
            minZoomLevel={15}
            style={{flex:1, opacity: 1}}>

            <Polyline
                    coordinates={[pathPoints]} //specify our coordinates
                    strokeColor={"#000"}
                    strokeWidth={3}
                    lineDashPattern={[1]}
                />
            
            {position?.position.coords && (
                <Circle
                center={{
                    latitude:position?.position.coords.latitude || 59.32487,
                    longitude:position?.position.coords.longitude || 18.07221,
                }}
                radius={12}
                fillColor= {colors.mapPointerCircle}
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