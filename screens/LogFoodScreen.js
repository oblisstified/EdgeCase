import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Modal,
  DeviceEventEmitter,
  TouchableOpacity,
  Switch,
} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import FoodView from "./components/FoodView";
import FoodLogModal from "./components/FoodLogModal";
import { useNavigation } from "@react-navigation/native";
import { findFoodObjects, findPresetObjects } from "../utils/searcher";
import { saveMeal } from "../utils/saver";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from 'react-native-vector-icons/AntDesign';

const LogFoodScreen = () => {
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
            marginTop: 5,
            marginLeft: 15,
            width: "100%",
          }}
        >
          <View style={{ width: "75%" }}>
            <Text style={{ fontSize: 28, color: "#FFF", fontWeight: "bold" }}>
              Log Food
            </Text>
          </View>
          <View style={{ width: "20%" }}>
            <TouchableOpacity
              onPress={() =>
                nav.push("FoodBasketScreen", { currentBasket: basket })
              }
              style={[
                styles.shadowProp,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              <Image
                source={require("./images/basket.png")}
                style={{ height: 40, width: 40 }}
              />
              <Text style={{ fontSize: 10, color: "#FFF", fontWeight: "bold" }}>
                View Basket
              </Text>
              <Text
                style={{ fontSize: 8, color: "#FFF", fontWeight: "normal" }}
              >
                {basket.length} items
              </Text>
              {saved && <Text style={{ color: "green" }}>Successfully saved!</Text>}
            </TouchableOpacity>
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
            placeholder="Start typing a food..."
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
          <AntDesign name = "search1" size = {25}  onPress={getMatches}> 
           
          </AntDesign>

        </View>
      </LinearGradient>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginTop: 0,
          marginBottom: 10,
        }}
      >
        <View style={{ width: "50%", alignItems: "flex-start" }}>
          <TouchableOpacity
            testID="foodSearch"
            onPress={getMatches}
            style={[
              styles.shadowProp,
              {
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
                marginLeft: 15,
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: "#FFF",
                textAlign: "center",
              }}
            >
              Search{"\n"}All Items
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <TouchableOpacity
            testID="searchPresetButton"
            onPress={() => {
              setBasket([]);
              setShowPresets(true);
              getPresetMatches();
            }}
            style={[
              styles.shadowProp,
              {
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
                marginRight: 15,
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: "#FFF",
                textAlign: "center",
              }}
            >
              Search{"\n"}Custom Presets
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
         
          setModalVisible(!modalVisible);
        }}
      >
        <FoodLogModal
          testID="foodModal"
          foodDetails={modalContent}
          hideButton={
            <Button
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
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  searchButton: {},
});
