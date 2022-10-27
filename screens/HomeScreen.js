import { StyleSheet, Text,SafeAreaView, View } from 'react-native'
import NavOptions from '../components/NavOptions';
import React from 'react'
import tw from "twrnc";


const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-10`}>
            <Text>HomeScreen</Text>
            <NavOptions />
        </View>
    </SafeAreaView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({})