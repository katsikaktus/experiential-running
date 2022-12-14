import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Circle, Polyline } from 'react-native-maps';
import { selectSavedCurrentPath, selectLocation } from '../slices/runSlice';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';


const MapRunning = () => {

    const position = useSelector(selectLocation);
    const path = useSelector(selectSavedCurrentPath);
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
                latitude:path[0]?.latitude || position?.position.coords.latitude || 59.32487,
                longitude:path[0]?.longitude || position?.position.coords.longitude || 18.07221,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            minZoomLevel={15}
            style={{flex:1, opacity: 1}}>
            {path?.map((host, i) => {
                if (host.latitude && host.longitude) {
                return(<Circle
                    key={i}
                    center={{
                    latitude: host.latitude,
                    longitude: host.longitude
                    }}
                    title={host.id}
                    radius={5}
                    fillColor= {colors.mapDrawTrack}
                    strokeColor= {colors.mapDrawTrack}
                    
                />)
                }
            })}
                    
        </MapView>

        
  
    </View>

  )
}

export default MapRunning

const styles = StyleSheet.create({
    container: {height: '100%', width: '100%'}
})

/*
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
*/