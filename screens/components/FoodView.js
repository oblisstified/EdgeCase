import { React, useState } from "react";
import "react-native-gesture-handler";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FoodLogModal from "./FoodLogModal";

const FoodView = (props) => {
  const calories = props.foodDetails.item["Calories"];
  const protein = props.foodDetails.item["Protein"];
  const firstWord = props.foodDetails.item["Description"]
    .toLowerCase() // makes every letter lowercase
    .replace(/,/g, ", ") // replaces every "," with a ", "
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()); // capitilises the first letter of every word

  return (
    <View style={styles.displayInfo}>
      <View style={{ flex: 3, alignSelf: "flex-start", marginLeft: 10 }}>
        <View>
          <Text numberOfLines={1} style={styles.header}>{firstWord}</Text>
        </View>
        <View>
          <Text style={styles.details}>
            Calories: {calories}kcal, Protein: {protein}g
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>{props.button}</View>
    </View>
  );
};

export default FoodView;

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    paddingTop: 5,
    marginHorizontal: 5,
    marginTop: 12,
  },
  details: {
    fontSize: 12,
    opacity: 0.6,
    marginHorizontal: 5,
    paddingBottom: 5,
    marginTop: 5,
  },
  displayInfo: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#ededed",
    paddingLeft: 5,
    height: 70,
  },
});
