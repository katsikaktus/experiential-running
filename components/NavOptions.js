import { Dimensions,Pressable, StyleSheet, KeyboardAvoidingView, Image, Text, View } from 'react-native'
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
import MapLocation from './MapLocation';



const NavOptions = () => {
    const navigation = useNavigation();

  return (

    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>

        <View style={{height: '120%', width: '150%', left:-50, top: -40,backgroundColor: "#4E6B9F", borderTopColor:"black", borderTopWidth:1}}>

        </View>
        
        <View style={{
                    position:"absolute",
                    bottom: 0,
                    right: 0,
                    ...styles.mainContainer
                }}>

            <View style = {styles.innerContainer}>
                
                <View style={{
                    position:"absolute",
                    transform: [{ rotate: "-90deg" }],
                    top:78,
                    ...styles.line
                }}></View>

                <View style={{
                    position:"absolute",
                    transform: [{ rotate: "-40deg" }],
                    right:60,
                    top:120,
                    ...styles.line
                }}></View>

                <View style={{
                    position:"absolute",
                    transform: [{ rotate: "-160 deg" }],
                    right:60,
                    bottom:110,
                    ...styles.line
                }}></View>

                <View style={{
                    position:"absolute",
                    transform: [{ rotate: "-120 deg" }],
                    right:100,
                    bottom:60,
                    ...styles.line
                }}></View>

                <View style={{
                    position:"absolute",
                    transform: [{ rotate: "120 deg" }],
                    left:100,
                    bottom:60,
                    ...styles.line
                }}></View>

                <View style={{
                    position:"absolute",
                    transform: [{ rotate: "160 deg" }],
                    left:60,
                    bottom:110,
                    ...styles.line
                }}></View>


                <View style={{
                    position:"absolute",
                    transform: [{ rotate: "40deg" }],
                    left:60,
                    top:120,
                    ...styles.line
                }}></View>



                <View style={{position:"absolute", top:100, ...styles.shadowWrapperLarge}}>

                    <Pressable  style={{ backgroundColor: "#9B77DA",...styles.largeBubbleContainer}} 
                    onPress={() => navigation.navigate("StartUpScreen") }>
                            <Image source={start_page_icon} style={{height:56, width:50}} />
                    </Pressable>

                </View>

                
                <View style={{position:"absolute",bottom:Dimensions.get('window').width * 0.6, top: -35,...styles.shadowWrapperSmall}}>
                    <Pressable  style={{backgroundColor: "#6FA5B1",...styles.smallBubbleContainer}} 
                    onPress={() => navigation.navigate("ProfilePageScreen") }>
                            <Image source={profile_page_icon} style={{height:54, width:54, }} />
                    </Pressable>
                </View>

                
                

                <View style = {{position:"absolute",bottom:Dimensions.get('window').width * 0.6, right: -20, top:30, ...styles.shadowWrapperSmall}}>
                    <Pressable style={{backgroundColor: "#F39DE5",...styles.smallBubbleContainer}} 
                    onPress={() => navigation.navigate("ChallengesPageScreen")}>
                        <Image source={challenges_page_icon} style={{height:60, width:54}} />
                    </Pressable>
                </View>

                

                <View style = {{position:"absolute",bottom:Dimensions.get('window').width * 0.6, right: -30, bottom:50, ...styles.shadowWrapperSmall}}>
                    <Pressable style={{backgroundColor: "#F5A17D",...styles.smallBubbleContainer}}
                    onPress={() => navigation.navigate("GoalsPageScreen")}>
                        <Image source={goals_page_icon} style={{height:50, width:60}} />
                    </Pressable>
                </View>
                
                
                
                <View style = {{position:"absolute",bottom:Dimensions.get('window').width * 0.6, right: 40, bottom: -50,...styles.shadowWrapperSmall}}>
                    <Pressable style={{backgroundColor: "#27BE88",...styles.smallBubbleContainer}}
                    onPress={() => navigation.navigate("MapTabNav")}>
                        <Image source={maps_page_icon} style={{height:60, width:52, }} />
                    </Pressable>
                </View>

                


                <View style = {{position:"absolute",bottom:Dimensions.get('window').width * 0.6, left: 40, bottom: -50, ...styles.shadowWrapperSmall}}>
                    <Pressable style={{backgroundColor: "#A798D5",...styles.smallBubbleContainer}}
                    onPress={() => navigation.navigate("HistoryPageScreen")}>
                            <Image source={history_page_icon} style={{height:50, width:50, }} />
                    </Pressable>
                </View>

            

                <View style = {{position:"absolute",bottom:Dimensions.get('window').width * 0.6, left: -30, bottom:50, ...styles.shadowWrapperSmall}}>
                    <Pressable style={{backgroundColor: "#F57D7D",...styles.smallBubbleContainer}}
                    onPress={() => navigation.navigate("HistoryPageScreen")}>
                        <Image source={adventure_page_icon} style={{height:40, width:70}} />
                    </Pressable>
                </View>

               

                <View style = {{position:"absolute",bottom:Dimensions.get('window').width * 0.6, left: -20, top:30,  ...styles.shadowWrapperSmall}}>
                    <Pressable style={{backgroundColor: "#5391EE",...styles.smallBubbleContainer}} 
                    onPress={() => navigation.navigate("HistoryPageScreen")}>
                        <Image source={leaderboard_page_icon} style={{height:30, width:50, }} />
                    </Pressable>
                </View>

                
                        
            </View>

        </View>

    </KeyboardAvoidingView>

    
    

    
    
  )
}

export default NavOptions

const styles = StyleSheet.create({

    container: {height: '100%', width: '100%',},

    mainContainer: {
        marginTop: -30, 
        height: '100%', 
        width: '100%', 
        justifyContent:"center",
        alignItems:"center",
        
    },
    
    innerContainer: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
        borderWidth:1,
        borderColor:"#4E6B9F",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -60
    
    
    },
    
    smallBubbleContainer : { 
        width: "100%",
        height: "100%",
        borderRadius: 100/2,
        justifyContent: 'center',
        alignItems: 'center', 
    },

    shadowWrapperSmall:{
        width: 100,
        height: 100,
        borderRadius: 100/2,
        
        justifyContent: 'center',
        alignItems: 'center', 
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        
        elevation: 11,
    },

    largeBubbleContainer : { 
        width: "100%",
        height: "100%",
        borderRadius: 140/2,
        justifyContent: 'center',
        alignItems: 'center', 
        
    },

    shadowWrapperLarge:{
        width: 130,
        height: 130,
        borderRadius: 130/2,
        
        justifyContent: 'center',
        alignItems: 'center', 
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        
        elevation: 0,
    },

    line: {
        width: 40,
        height: 4,
        backgroundColor: "black",
       
      },


    
})