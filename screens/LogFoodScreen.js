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
              {saved && (
                <Text style={{ color: "green" }}>Successfully saved!</Text>
              )}
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
          <Image
            source={require("./images/search.png")}
            style={{ height: 20, width: 20 }}
          />
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
          style={{ borderTopColor: "#e4e4e4", borderTopWidth: 1 }}
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
                    alignItems: "center",
                    marginTop: 15,
                    marginLeft: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalContent(match);
                      setInfoModal(true);
                    }}
                    style={[styles.shadowProp, { marginRight: 10 }]}
                  >
                    <Image
                      source={require("./images/info.png")}
                      style={{ height: 15, width: 15 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalContent(match);
                      setModalVisible(true);
                    }}
                    style={styles.shadowProp}
                  >
                    <Image
                      source={require("./images/add.png")}
                      style={{ height: 40, width: 40 }}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
          )}
        />
      )}

      {/* list of presets */}

      {showPresets && (
        <FlatList
          style={{ borderTopColor: "#e4e4e4", borderTopWidth: 1 }}
          data={presetMatches}
          keyExtractor={(item) => JSON.stringify(item)}
          renderItem={(item) => (
            <View style={[styles.displayInfo, {flexDirection: "row"}]}>
              <View
                style={{ flex: 3, alignSelf: "flex-start", marginLeft: 10 }}
              >
                <View>
                  <Text style={[styles.header, {marginTop: 20}]}>
                    {item.item.metaData.presetName}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                    marginLeft: 35,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      saveItem(item.item, true);
                    }}
                    style={styles.shadowProp}
                  >
                    <Image
                      source={require("./images/add.png")}
                      style={{ height: 40, width: 40 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {/* Popup for logging modal */}
      <Modal
        style={{}}
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
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
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
                  fontSize: 26,
                  color: "#FFF",
                  textAlign: "center",
                }}
              >
                Hide
              </Text>
            </TouchableOpacity>
          }
          // this prop will be used as a callback to update the basket from the modal
          addToBasket={(f) => addToBasket(f)}
        />
      </Modal>

      <Modal
        style={{paddingTop:50}}
        animationType="slide"
        transparent={true}
        visible={infoModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setInfoModal(!modalVisible);
        }}
      >
          <View style={styles.infoModal}>
            <View style={styles.displayInfo}>
              <View>
                <Text style={[styles.infoText, {textDecorationLine: 'underline'}]}>
                  {modalContent && modalContent.item["Description"]
                    .toLowerCase() // makes every letter lowercase
                    .replace(/,/g, ", ") // replaces every "," with a ", "
                    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())} (per 100g)
                </Text>
                <Text style={styles.infoText}>Calories: {modalContent && modalContent.item["Calories"]}</Text>
                <Text style={styles.infoText}>Protein: {modalContent && modalContent.item["Protein"]}</Text>
                <Text style={styles.infoText}>Sugar: {modalContent && modalContent.item["Sugar"]}</Text>
                <Text style={styles.infoText}>Fiber: {modalContent && modalContent.item["Fiber"]}</Text>
                <Text style={styles.infoText}>
                  Monounsaturated Fat:{" "}
                  {modalContent && modalContent.item["Monounsaturated Fat"]}
                </Text>
                <Text style={styles.infoText}>
                  Polyunsaturated Fats:{" "}
                  {modalContent && modalContent.item["Polyunsaturated Fats"]}
                </Text>
                <Text style={styles.infoText}>
                  Saturated Fat: {modalContent && modalContent.item["Saturated Fat"]}
                </Text>
              </View>
              <TouchableOpacity
                testID="searchPresetButton"
                onPress={() => {
                  setInfoModal(false);
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
                    fontSize: 26,
                    color: "#FFF",
                    textAlign: "center",
                  }}
                >
                Hide
              </Text>
            </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default LogFoodScreen;

const styles = StyleSheet.create({
  infoModal: {
    flex:1,
    marginTop: 200,
  },
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
  header: {
    fontSize: 14,
    paddingTop: 5,
    marginHorizontal: 5,
    marginTop: 12,
  },
  displayInfo: {
    flex: 1.2,
    flexDirection: "column",
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#ededed",
    paddingLeft: 5,
    height: 70,
    justifyContent:"space-around",
  },
  infoText: {
    fontSize:20,
    paddingLeft: 20
  }
});
