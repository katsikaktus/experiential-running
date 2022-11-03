import { StyleSheet, FlatList, View, Text } from 'react-native'
import {useSelector} from 'react-redux';
import HistoryRunCard from '../components/HistoryRunCard';

import React from 'react'
import { selectPreviousRun } from '../slices/runSlice';

const HistoryMapScreen = () => {

  const DATA = useSelector(selectPreviousRun);
  console.log("data History screen", DATA)


  const renderItem = ({item}) => (

    <HistoryRunCard
      day={item.day}
      timeOfDay={item.timeOfDay}
      distance={item.distance}
      time={item.time}
      savedPath = {item.savedPath}
    />
  );
  
  return (
    <View style={{paddingHorizontal: 12}}>
      {DATA.length == 0 ? (
        <View style={{alignItems: 'center', justifyContent: 'center', height:"100%"}}>
          <Text style={{fontSize: 24}}>
            No Activity Found! Let's Start Running!
          </Text>
        </View>
      ) : (
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

export default HistoryMapScreen

const styles = StyleSheet.create({})