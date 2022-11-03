import { StyleSheet, FlatList, View } from 'react-native'
import {useSelector} from 'react-redux';
import HistoryRunCard from '../components/HistoryRunCard';

import React from 'react'
import { selectPreviousRun } from '../slices/runSlice';

const HistoryMapScreen = () => {

  const DATA = useSelector(selectPreviousRun);

  const renderItem = ({item}) => (

    <HistoryRunCard
      day={item.day}
      timeOfDay={item.timeOfDay}
      distance={item.distance}
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