import { Button,TouchableOpacity, StyleSheet, FlatList, Image, Text, View } from 'react-native'
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';


import React from 'react'

// Data array
const data = [
    {
        id: "1",
        title: "Status",
        icon: "man",
        screen: "StatusScreen"

    },
    {
        id: "2",
        title: "Map",
        icon: "map",
        screen: "MapScreen"

    },
]

const NavOptions = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

  return (
    <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

            <TouchableOpacity 
            onPress={() => navigation.navigate(item.screen)}>
               
                <View style={styles.CircleShapeView}>
                
                    
                    <Text style={tw `p-1 mt-3 text-lg font-semibold`}> {item.title}</Text>
                    <Icon 

                    name= {item.icon} color="#f7f4e3" type='entypo'
                    size={60}
                    />
                    

                </View>
            </TouchableOpacity>
    )}
    />
  )
}

export default NavOptions

const styles = StyleSheet.create({
    CircleShapeView: {
        width: 120,
        height: 120,
        borderRadius: 120/2,
        backgroundColor: '#95e1d3',
        margin: 20,
        alignItems: 'center'
    
    },
})