import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from "../constants/colors";


const StartUpScreen = () => {
  const navigate = useNavigation()
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigate.navigate("MenuNav")}>
            <Fontisto name="nav-icon-a" size={60} style={styles.menuContainer} />
          </Pressable>
        </View>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://64.media.tumblr.com/387de89519554c486a51178d3cb07184/48b89fdcd1addec0-c7/s500x750/cca7c61ec3c063e144fd5b03b17220388da95321.jpg",
          }}
        />
        
        <View style={styles.body}>
          <Text style={styles.nameText}>Blai Dee</Text>
          <View style={styles.bodyContent}>
            {/* <Text style={styles.name}>John Doe</Text>
            <Text style={styles.info}>UX Designer / Mobile developer</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text> */}

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Challenges</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Goals</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    );
  }

export default StartUpScreen;



const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFD1D6",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
    alignItems: "center",
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#FFF1D8",
  },
  nameText: {
    fontSize: 22,
    color: "#000444",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    fontWeight: "bold",
  },

  menuContainer: {
    marginTop: 80,
    marginLeft: 24,
    color: colors.iconColor
    
  },
});


