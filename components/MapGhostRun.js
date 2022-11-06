import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Circle, Polyline } from 'react-native-maps';
import { selectSavedCurrentPath, selectLocation } from '../slices/runSlice';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';

const MapGhostRun = () => {
    const position = useSelector(selectLocation);
    const path = useSelector(selectSavedCurrentPath);

    mapStyle = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ]

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
            customMapStyle={mapStyle}
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
                    fillColor= {"#F5A17D"}
                    strokeColor= {"#F5A17D"}
                    
                />)
                }
            })}
                    
        </MapView>

        
  
    </View>

  )
}

export default MapGhostRun

const styles = StyleSheet.create({
    container: {height: '100%', width: '100%'}
})