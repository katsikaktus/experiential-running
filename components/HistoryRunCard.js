import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import { calculatePace, pacePresentation, secondsToHm } from '../constants/calculations';

const HistoryRunCard = (props) => {
    

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() =>console.log()}>
      {/* Inner Container 1 */}
      <View style={styles.innerContainer1}>
        {/* Image */}
        <Image
          source={{uri: 'https://i.stack.imgur.com/ddX9U.png'}}
          style={styles.image}
        />
        <View style={styles.headingContainer}>
          {/* Heading */}
          <Text style={styles.heading}>{props.day}</Text>
          {/* Subheading */}
          <Text style={styles.subheading}>
            {props.day} {props.timeOfDay} Run
          </Text>
        </View>
      </View>
      {/* Inner Container 2*/}
      <View style={styles.innerContainer2}>
        {/* Kilometer */}
        <View>
          <Text style={styles.metricValue}>{props.kilometer}</Text>
          <Text style={styles.metric}>Kilometer</Text>
        </View>
        {/* Avg pace */}
        <View>
          <Text style={styles.metricValue}>{props.avgPace}
          </Text>
          <Text style={styles.metric}>Avg. Pace</Text>
        </View>
        {/* Time */}
        <View>
          <Text style={styles.metricValue}>
            {props.time}
          </Text>
          <Text style={styles.metric}>Time</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default HistoryRunCard

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 12,
        backgroundColor: colors.cardBackground,
        marginVertical: 8,
        padding: 16,
        elevation: 1,
      },
      innerContainer1: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      image: {width: 40, height: 40, borderRadius: 8},
      headingContainer: {marginLeft: 12},
      heading: {color: colors.cardHeading},
      subheading: {color: colors.cardSubHeading},
      innerContainer2: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      metricValue: {fontWeight: 'bold'},
      metric: {color: colors.cardMetric},
})