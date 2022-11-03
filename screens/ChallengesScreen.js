import React from "react";

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";

const challenges = [
  {
    id: "1",
    name: "Halloween Run",
    length: "5 km",
    objective:
      "Complete the Halloween run! Dress up in a spooky outfit and run 5 km. Send in a selfie for proof of costume. Most creative outfits will earn costume badges. Trick or Treat!",
  },
  {
    id: "2",
    name: "Sightseeing run - level 1",
    length: null,
    objective: "Run past 2 monuments in a city of your choice in a single run.",
  },
  {
    id: "3",
    name: "1 km every day for a week",
    length: "1*7 km",
    objective:
      "Game's in the name. Run 1 km daily for a week to complete the challenge. For ranked, run as fast as possible.",
  },
  {
    id: "4",
    name: "Eat a shoe challenge!",
    length: "3 km",
    objective:
      "You heard us. The run is 3 km, but every 1 km you have to stop and eat one of your shoes.",
  },
  {
    id: "5",
    name: "Barefoot run",
    length: "1, 3 or 5 km",
    objective:
      "Barefoot running strengthens specific muscles in your feet and legs which otherwise do not get activated. Run barefoot for 1, 3 or 5 km.",
  },
  {
    id: "6",
    name: "Sightseeing run - level 2",
    length: null,
    objective: "Run past 4 monuments in a city of your choice in a single run.",
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={challenges}
        renderItem={({ item }) => (
          <Text style={styles.item} onPress={() => alert(item.objective)}>
             {item.name}
          </Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
  item: {
    backgroundColor: "#FFD580",
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});
