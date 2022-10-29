import { StyleSheet, Text,SafeAreaView, View } from 'react-native'
import NavOptions from '../components/NavOptions';
import React from 'react'
import tw from "twrnc";



const HomeScreen = () => {
    // push information to data layout


  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-10`}>
        
            
            <NavOptions />
        </View>
    </SafeAreaView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({})