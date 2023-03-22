import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  Modal,
  Touchable,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import BottomBar from "./components/BottomBar";

import { FlatList, TextInput } from "react-native-gesture-handler";

import { getAuth } from "firebase/auth";
import FoodView from "./components/FoodView";
import FoodLogModal from "./components/FoodLogModal";
import { useNavigation } from "@react-navigation/native";

import { findFoodObjects, findPresetObjects } from "../utils/searcher";
import { saveMeal } from "../utils/saver";
import { LinearGradient } from "expo-linear-gradient";

const LogFoodScreen = ({ navigation }) => {
  const nav = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  let [searchValue, setSearchValue] = useState("");
  let [matches, setMatches] = useState([]);
  let [modalVisible, setModalVisible] = useState(false);
  let [modalContent, setModalContent] = useState(null);
  let [presetMatches, setPresetMatches] = useState([]);
  let [showPresets, setShowPresets] = useState(false);
  let [infoModal, setInfoModal] = useState(false);

  let [basket, setBasket] = useState([]);
  let [saved, setSaved] = useState(false);

  let saving = false;

  // Remove basket on basket screen triggers and event here, persisting an item removal
  DeviceEventEmitter.addListener("event.removeItem", (eventData) => {
    setBasket(JSON.parse(eventData));
  });

  // Save button on basket screen triggers an event here telling the program to save the basket remotely
  DeviceEventEmitter.addListener("event.saveBasket", (eventData) => {
    setBasket(JSON.parse(eventData));
    saveBasket();
  });

  function addToBasket(food) {
    // this ugliness is to ensure no duplicate items are added
    let temp = [];
    let isContained = false;
    let addVal = food;

    for (let i = 0; i < basket.length; i++) {
      if (
        basket[i]["foodObject"]["Description"] ==
        food["foodObject"]["Description"]
      ) {
        let concatenateObj = basket[i];
        concatenateObj.weight += food.weight;
        temp.push(concatenateObj);
        isContained = true;
      } else {
        temp.push(basket[i]);
      }
    }
    isContained || temp.push(addVal);
    setBasket(temp);
  }

  function getMatches() {
    setShowPresets(false);
    setMatches([]);

    let myFoods = findFoodObjects(searchValue);
    setMatches(myFoods.slice(0, 100));
  }

  async function getPresetMatches() {
    let presets = [];
    setShowPresets(true);
    setPresetMatches([]);
    try {
      presets = await findPresetObjects(searchValue);
    } catch (error) {
      console.log(error);
    }

    setPresetMatches(presets);
  }

  async function saveItem(foodObject, isPreset) {
    const email = user.email;

    let success = false;
    // if(saving) return;

    console.log(foodObject);
    saving = true;
    if (!isPreset) {
      if (basket.length == 0) return;
      success = saveMeal(basket, email, isPreset);
    } else {
      success = saveMeal(foodObject, email, isPreset);
    }
  }

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "#00a46c",
          height: "19%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
            marginLeft: 15,
            width: "100%",
          }}
        >
          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 28, color: "#FFF", fontWeight: "bold" }}>
              Log Food
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <LinearGradient
        colors={["rgba(0,164,109,0.4)", "transparent"]}
        style={{
          left: 0,
          right: 0,
          height: 80,
          marginTop: -41,
        }}
      >
        {/* Search Bar */}
        <View style={[styles.searchBar, styles.shadowProp]}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#737373"
            testID="foodSearchBar"
            onChangeText={(text) => {
              setSearchValue(text);
              getMatches();
            }}
            style={{
              fontWeight: "bold",
              fontSize: 16,
              width: 260,
            }}
          />
          <Image
            source={require("./images/search.png")}
            style={{ height: 20, width: 20 }}
          />
        </View>
      </LinearGradient>

      {/* Search Options */}
      <Button testID="foodSearch" title="search" onPress={getMatches} />
      <Button
        testID="searchPresetButton"
        title="search custom presets"
        onPress={() => {
          setBasket([]);
          setShowPresets(true);
          getPresetMatches();
        }}
      />
      <Button
        title="View Basket"
        onPress={() => nav.push("FoodBasketScreen", { currentBasket: basket })}
      />
      <Text testID="basketSize">{basket.length} items</Text>
      {saved && <Text style={{ color: "green" }}>Successfully saved!</Text>}

      {/* list of matches */}
      {!showPresets && (
        <FlatList
          testID="foodResultList"
          data={matches}
          keyExtractor={(item) => item["Description"]}
          renderItem={(match) => (
            <FoodView
              foodDetails={match}
              // these buttons are rendered in the FoodView component
              button={
                <View
                  
                  style={{
                    flexDirection: "row",
                    flexGrow: 2,
                    alignItems: "space-between",
                    alignSelf: "center",
                  }}
                >
                  <Button
                    title="i"
                    onPress={() => {
                      setModalContent(match);
                      setInfoModal(true);
                    }}
                  />
                  <Button
                    testID={ match.item["Description"] }
                    title="Add"
                    onPress={() => {
                      setModalContent(match);
                      setModalVisible(true);
                    }}
                  />
                </View>
              }
            />
          )}
        />
      )}

      {/* list of presets */}

      {showPresets && (
        <FlatList
          data={presetMatches}
          keyExtractor={(item) => JSON.stringify(item)}
          renderItem={(item) => (
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={{ alignSelf: "flex-start" }}>
                <Text>{item.item.metaData.presetName}</Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    flexGrow: 2,
                    alignItems: "space-between",
                    alignSelf: "center",
                  }}
                >
                  <Button
                    title="Add"
                    onPress={() => {
                      saveItem(item.item, true);
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        />
      )}

      {/* Popup for logging modal */}
      <Modal
        style={styles.infoModal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <FoodLogModal
          testID="foodModal"
          foodDetails={modalContent}
          hideButton={
            <Button
              testID="hideModal"
              title="Hide Modal"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          }
          // this prop will be used as a callback to update the basket from the modal
          addToBasket={(f) => addToBasket(f)}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={infoModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setInfoModal(!modalVisible);
        }}
      >
        <Text>Values per 100g</Text>
        <Text>
          Name: {modalContent && modalContent.item["Description"]}
          {modalContent && console.log(modalContent)}
        </Text>
        <Text>Calories: {modalContent && modalContent.item["Calories"]}</Text>
        <Text>Protein: {modalContent && modalContent.item["Protein"]}</Text>
        <Text>Sugar: {modalContent && modalContent.item["Sugar"]}</Text>
        <Text>Fiber: {modalContent && modalContent.item["Fiber"]}</Text>
        <Text>
          Monounsaturated Fat:{" "}
          {modalContent && modalContent.item["Monounsaturated Fat"]}
        </Text>
        <Text>
          Polyunsaturated Fats":{" "}
          {modalContent && modalContent.item["Polyunsaturated Fats"]}
        </Text>
        <Text>
          Saturated Fat: {modalContent && modalContent.item["Saturated Fat"]}
        </Text>
        <Button title="hide" onPress={() => setInfoModal(false)} />
      </Modal>
    </View>
  );
};

export default LogFoodScreen;

const styles = StyleSheet.create({
  infoModal: {},
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  searchBar: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});
