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
    <View style={{}}>
      {DATA.length == 0 ? (
        <View style={{alignItems: 'center', justifyContent: 'center', height:"100%", backgroundColor:"#6FA5B1"}}>
          <Text style={{fontSize: 24, color:"white", marginBottom:18}}>
            No Activity Found!
          </Text>
          <Text style={{fontSize: 36, color:"white",}}>
            Let's Start Running!
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