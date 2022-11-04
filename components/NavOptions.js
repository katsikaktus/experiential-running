import { Dimensions,Pressable, StyleSheet, FlatList, Image, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

import start_page_icon from "../assets/start_page_icon.png"
import profile_page_icon from "../assets/profile_page_icon.png"
import challenges_page_icon from "../assets/challenges_page_icon.png"
import goals_page_icon from "../assets/goals_page_icon.png"
import maps_page_icon from "../assets/maps_page_icon.png"
import history_page_icon from "../assets/history_page_icon.png"
import adventure_page_icon from "../assets/adventure_page_icon.png"
import leaderboard_page_icon from "../assets/leaderboard_page_icon.png"



const NavOptions = () => {
    const navigation = useNavigation();

  return (

    
    <View style = {styles.mainContainer}>
        
        <View style={{justifyContent:"center",alignItems:"center"}}>

            <View
            style = {styles.innerContainer}
            //underlayColor = '#5391EE'
            >

            <Pressable  style={{position:"absolute", top:100, backgroundColor: "#9B77DA",...styles.largeBubbleContainer}} 
            onPress={() => navigation.navigate("StartUpScreen") }>
                    <Image source={start_page_icon} style={{height:56, width:50, }} />
            </Pressable>
            
            <Pressable  style={{position:"absolute",bottom:Dimensions.get('window').width * 0.6, backgroundColor: "#6FA5B1",...styles.smallBubbleContainer}} 
            onPress={() => navigation.navigate("ProfilePageScreen") }>
                    <Image source={profile_page_icon} style={{height:54, width:54, }} />
            </Pressable>

            <Pressable style={{position:"absolute",bottom:Dimensions.get('window').width * 0.6, right: -20, top:30, backgroundColor: "#F39DE5",...styles.smallBubbleContainer}} 
            onPress={() => navigation.navigate("ChallengesPageScreen")}>
                <Image source={challenges_page_icon} style={{height:60, width:54}} />
            </Pressable>

            <Pressable style={{position:"absolute",bottom:Dimensions.get('window').width * 0.6, right: -30, bottom:50, backgroundColor: "#F5A17D",...styles.smallBubbleContainer}}
            onPress={() => navigation.navigate("GoalsPageScreen")}>
                <Image source={goals_page_icon} style={{height:50, width:60}} />
            </Pressable>

            <Pressable style={{position:"absolute",bottom:Dimensions.get('window').width * 0.6, right: 40, bottom: -60, backgroundColor: "#27BE88",...styles.smallBubbleContainer}}
            onPress={() => navigation.navigate("MapTabNav")}>
                <Image source={maps_page_icon} style={{height:60, width:52, }} />
            </Pressable>

            <Pressable style={{position:"absolute",bottom:Dimensions.get('window').width * 0.6, left: 40, bottom: -60, backgroundColor: "#A798D5",...styles.smallBubbleContainer}}
            onPress={() => navigation.navigate("HistoryPageScreen")}>
                    <Image source={history_page_icon} style={{height:50, width:50, }} />
            </Pressable>

            <Pressable style={{position:"absolute",bottom:Dimensions.get('window').width * 0.6, left: -30, bottom:50, backgroundColor: "#F57D7D",...styles.smallBubbleContainer}}
            onPress={() => navigation.navigate("HistoryPageScreen")}>
                <Image source={adventure_page_icon} style={{height:40, width:70}} />
            </Pressable>

            <Pressable style={{position:"absolute",bottom:Dimensions.get('window').width * 0.6, left: -20, top:30, backgroundColor: "#5391EE",...styles.smallBubbleContainer}} 
            onPress={() => navigation.navigate("HistoryPageScreen")}>
                <Image source={leaderboard_page_icon} style={{height:30, width:50, }} />
            </Pressable>
            
                    
            </View>
        </View>

    </View>
    

    
    
  )
}

export default NavOptions

const styles = StyleSheet.create({
    mainContainer: {marginTop: -30, height: '100%', width: '100%', justifyContent:"center",alignItems:"center",},


    innerContainer: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
        borderWidth:1,
        borderColor:"white",
        justifyContent: 'center',
        alignItems: 'center'
    
    },
    smallBubbleContainer : { 
        width: 100,
        height: 100,
        borderRadius: 100/2,
        justifyContent: 'center',
        alignItems: 'center', 
    },

    largeBubbleContainer : { 
        width: 140,
        height: 140,
        borderRadius: 140/2,
        justifyContent: 'center',
        alignItems: 'center', 
    }
})