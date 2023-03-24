import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, DeviceEventEmitter, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { getAuth } from 'firebase/auth'
import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';
import { setStatusBarBackgroundColor } from "expo-status-bar";

import { saveMeal, createPreset } from "../utils/saver";

const FoodBasketScreen = props => {

    const auth = getAuth();
    const user = auth.currentUser;

    const nav = useNavigation();

    let [food, setFood] = useState((props.route && props.route.params.currentBasket) || props.currentBasket)
    let [description, setDescription] = useState("")
    let [presetNameError, setPresetNameError] = useState(false)
    let [presetSaved, setPresetSaved] = useState(false)
    let [mealSaved, setMealSaved] = useState(false);

    let saving = false;

    function handleRemove(o){
        let temp = [];

        for(let i = 0; i < food.length; i++){
            if(o != food[i]) temp.push(food[i])
        }
        setFood(temp);
        
        DeviceEventEmitter.emit("event.removeItem", JSON.stringify(temp))
    }

    function saveBasket(){
        if(mealSaved) return;
        setMealSaved(true);

        const email = user.email;
        saveMeal(food, email, false);
    }

    async function savePreset(){
        if(description.length == 0){
            setPresetNameError(true);
            return;
        }
        if(food.length == 0){
            return;
        }

        createPreset(food, description, user.email).then(() => {setPresetSaved(true); nav.pop()});
    }

    return (
        <SafeAreaView>
            <View style={{marginTop:40, marginBottom:40}} testID="basketList">
            <View style={{height:300}}>
            { food && food.map((o) => o &&
                <View style={[{flex: 1, width: "100%", height:40, alignItems:"center", flexDirection:"row"}]} key={o.foodObject.Description}>
                    <Text style={{padding:15}}> {
                        o.foodObject["Description"].toLowerCase() // makes every letter lowercase
                                                    .replace(/,/g, ", ") // replaces every "," with a ", "
                                                    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
                    } </Text>
                    <TouchableOpacity
                        testID={o.foodObject.Description + "button"} 
                        onPress={
                            () => handleRemove(o)
                        }
                        style={[
                        styles.shadowProp,
                        {
                            backgroundColor: "#00a46c",
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 15,
                            marginRight: 15,
                            marginTop: 15,
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
                        Remove Ingredient
                        </Text>
                        
                    </TouchableOpacity>
                </View>
            )}
            </View>
            <TouchableOpacity
                    testID="saveButton"
                    onPress={() => {
                        saveBasket
                    }}
                    style={[
                      styles.shadowProp,
                      {
                        backgroundColor: "#00a46c",
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 15,
                        marginRight: 15,
                        marginTop: 15,
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
                      Save As Meal
                    </Text>
                  </TouchableOpacity>

            <TouchableOpacity
                    testID="savePresetButton"
                    onPress={() => {
                        onPress={savePreset}
                    }}
                    style={[
                      styles.shadowProp,
                      {
                        backgroundColor: "#00a46c",
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 15,
                        marginRight: 15,
                        marginTop: 15,
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
                      Save Preset
                    </Text>
                  </TouchableOpacity>
            <TextInput testID="nameBar" placeholder="preset name" onChangeText={setDescription}/>
            {presetNameError && <Text style={{color:"red"}}>Preset needs a name to be saved</Text> }
            {presetSaved && <Text style={{color:"green"}}>Preset saved!</Text> }
            {mealSaved && <Text style={{color:"green"}}>Meal saved!</Text> }

            </View>
        </SafeAreaView>
    )
}

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
    shadowProp: {
        shadowColor: "#171717",
        shadowOffset: { width: -4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
  });
  

export default FoodBasketScreen