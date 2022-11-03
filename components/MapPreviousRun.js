import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Circle, Polyline, Marker } from 'react-native-maps';
import { selectSavedCurrentPath, selectLocation } from '../slices/runSlice';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';

const MapPreviousRun = () => {

    const path = useSelector(selectSavedCurrentPath);
    
  return (
    <View style={styles.container}>
        <MapView 
            //ref={watchId}
            initialRegion={{
                latitude:path[0].latitude || 59.32487,
                longitude:path[0].longitude || 18.07221,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            minZoomLevel={15}
            style={{flex:1, opacity: 1}}>
            {console.log("path", path)}

            {path.map((host, i) => {
                if (host.latitude && host.longitude) {
                return(<Circle
                    key={i}
                    center={{
                    latitude: host.latitude,
                    longitude: host.longitude
                    }}
                    title={host.id}
                    radius={8}
                    fillColor= {colors.mapDrawTrack}
                    strokeColor= {colors.mapDrawTrack}
                    
                />)
                }
            })}
                    
        </MapView>
  
    </View>
  )
}


export default MapPreviousRun

const styles = StyleSheet.create({
    container: {height: '50%', width: '100%'}
})

/*
<Polyline
                    coordinates={path} //specify our coordinates
                    strokeColor={"#000"}
                    strokeWidth={3}
                    lineDashPattern={[1]}
                /> */