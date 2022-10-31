import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { selectLocation } from '../slices/runSlice';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';



const MapLocation = () => {

    const position = useSelector(selectLocation);
 
  return (
    <View style={styles.container} >
        <MapView 
          mapType="mutedStandard"
        
        
          region={{
              latitude:position?.position.coords.latitude || 59.32487,
              longitude:position?.position.coords.longitude || 18.07221,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }} 
            //minZoomLevel={18}
            style={{flex:1, opacity: 1}}>
              <Marker
                coordinate={{
                    latitude:position?.position.coords.latitude || 59.32487,
                    longitude:position?.position.coords.longitude || 18.07221,
                }}
                pinColor={colors.mapPointerPin}
                
                />
            
            </MapView>
          
      </View>
  )
}

export default MapLocation

const styles = StyleSheet.create({
    container: {height: '100%', width: '100%'}
})