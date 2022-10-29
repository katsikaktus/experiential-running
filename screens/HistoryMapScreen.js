import { StyleSheet, FlatList, View } from 'react-native'
import {useSelector} from 'react-redux';
import HistoryRunCard from '../components/HistoryRunCard';
import { DATA } from "../constants/dummyData"

import React from 'react'

const HistoryMapScreen = () => {

  const renderItem = ({item}) => (

    <HistoryRunCard
      day={item.day}
      timeOfDay={item.timeOfDay}
      kilometer={item.kilometer}
      avgPace={item.avgPace}
      time={item.time}
    />
  );
  
  return (
    <View style={{paddingHorizontal: 12}}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default HistoryMapScreen

const styles = StyleSheet.create({})