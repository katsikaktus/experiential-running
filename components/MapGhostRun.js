import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Circle, Marker } from 'react-native-maps';
import { selectSavedCurrentPath, selectLocation } from '../slices/runSlice';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import { selectPreviousRun } from '../slices/runSlice';
import ghost_icon from "../assets/ghost_icon.png"


const MapGhostRun = () => {
    const position = useSelector(selectLocation);
    const path = useSelector(selectSavedCurrentPath);
    const DATA = useSelector(selectPreviousRun);

    console.log("position", position)
    //console.log("path", path[0])

    let ghostPath = null

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


    // mock ghost path
    if (path.length <= 5){
      console.log("path1",path?.slice(0, 1))


      ghostPath = path?.slice(0, 1)

    } else if (path.length <=10){
      ghostPath = path?.slice(1, 2)
      

    } else if (path.length <=15){

      ghostPath = path?.slice(2, 3)

    } else if (path.length <=20){

      ghostPath = path?.slice(3, 4)

    } else if (path.length <=25){

      ghostPath = path?.slice(4, 5)

    } else if (path.length <=30){

      ghostPath = path?.slice(5, 6)

    } else if (path.length <=35){

      ghostPath = path?.slice(6, 7)

    } else if (path.length <=40){

      ghostPath = path?.slice(7, 8)

    } else if (path.length <=45){

      ghostPath = path?.slice(8, 9)

    } else if (path.length <=50){

      ghostPath = path?.slice(9, 10)

    } else if (path.length <=55){

      ghostPath = path?.slice(10, 11)

    } else if (path.length <=60){

      ghostPath = path?.slice(11, 12)

    } else if (path.length <=65){

      ghostPath = path?.slice(13, 14)

    } else if (path.length <=90){

      ghostPath = path?.slice(15, 16)

    } else if (path.length <=120){

      ghostPath = path?.slice(17, 18)

    } else if (path.length <=150){

      ghostPath = path?.slice(19, 20)

    } else {
      ghostPath = path?.slice(20, 21)
    }


   const mapStyle = [
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
                return(
                <Circle
                  key={i}
                  center={{
                  latitude: host.latitude,
                  longitude: host.longitude
                  }}
                  title={host.id}
                  radius={5}
                  fillColor= {"white"}
                  strokeColor= {"white"}
                  />)
                }
            })}
           
            <Marker
                coordinate={{
                    latitude: ghostPath[0]?.latitude || position?.position.coords.latitude || 59.32487,
                    longitude: ghostPath[0]?.longitude || position?.position.coords.longitude || 18.07221,
                  }}
                  image={require("../assets/ghost_icon.png")}>

            </Marker>
                    
            {DATA[0].savedPath.map((host, i) => {
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