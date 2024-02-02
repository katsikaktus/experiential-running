import { StyleSheet, View,Text,Pressable,TextInput,Keyboard,Dimensions, } from 'react-native'
import React, {useState, useRef, useEffect} from 'react';
import colors from '../constants/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MapView, { Circle, Polyline, Marker } from 'react-native-maps';


const PreviousMapRunSummary = ({route}) => {

  const props = route.params;
  console.log("props PreviousMapRunSummary", props)

  ;

  // State for the title of the run
  const [title, setTitle] = useState(props.timeOfDay + " Run");


  const hasPathData = props.savedPath && props.savedPath.length > 0;
  const initialLatitude = hasPathData ? props.savedPath[0].latitude : 59.32487; // default latitude
  const initialLongitude = hasPathData ? props.savedPath[0].longitude : 18.07221; // default longitude

  const titleChangeHandler = input => {
    setTitle(input);
  };

  const textInputRef = useRef();


  return (
    // Main Container
    <Pressable style={styles.mainContainer} onPress={() => Keyboard.dismiss()}>
      {/* Day-Time */}
      {/* TextInput- heading with pencil icon */}
      <Pressable
        style={styles.textInputContainer}
        onPress={() => textInputRef.current.focus()}>
        <TextInput
          value={title}
          onChangeText={titleChangeHandler}
          style={styles.textInput}
          ref={textInputRef}
        />
        <SimpleLineIcons name="pencil" size={20} />
      </Pressable>
      <View style={styles.container}>
        {hasPathData && (
          <MapView
            initialRegion={{
              latitude: initialLatitude,
              longitude: initialLongitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            minZoomLevel={15}
            style={{ flex: 1, opacity: 1 }}>
            {props.savedPath.map((host, i) => (
              <Circle
                key={i}
                center={{
                  latitude: host.latitude,
                  longitude: host.longitude
                }}
                radius={5}
                fillColor={colors.mapDrawTrack}
                strokeColor={colors.mapDrawTrack}
              />
            ))}
          </MapView>
        )}
      </View>
    </Pressable>
  )
}

export default PreviousMapRunSummary

const styles = StyleSheet.create({
  container: {height: '50%', width: '100%'},
  mainContainer: {
    backgroundColor: colors.summaryBackgroundColor,
    flex: 1,
    borderTopWidth: 1,
    borderColor: colors.summaryBorder,
    padding: 20,
  },
  subheading: {fontSize: 16, color: colors.summarySubheading},
  textInputContainer: {
    borderBottomWidth: 1,
    borderColor: colors.summaryBorder,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {fontSize: 24, fontWeight: 'bold', color: '#000'},
  kilometerValue: {fontSize: 80, fontWeight: 'bold'},
  kilometerMetric: {fontSize: 16, color: colors.summarySubheading},
  metricContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricValue: {fontSize: 24, fontWeight: 'bold'},
  metric: {color: colors.summaryMetric, fontSize: 16},
  ImageLogoContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {height: 100, width: 80, marginBottom: 12},
  nextLevelImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 25,
  },
  progressBarContainer: {
    borderRadius: 4,
    borderColor: '#fff',
    backgroundColor: '#ccc',
    width: '80%',
    borderWidth: 2,
  },
  progressBar: {
    borderRadius: 4,
    borderWidth: 2,
  },

})