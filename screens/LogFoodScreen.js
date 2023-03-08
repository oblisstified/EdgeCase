import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView, Modal, Touchable, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import BottomBar from "./components/BottomBar";
import { findFoodObjects, findPresetObjects } from "../utils/searcher";
import { FlatList, TextInput } from "react-native-gesture-handler";

import { getAuth } from 'firebase/auth'
import FoodView from "./components/FoodView"
import FoodLogModal from "./components/FoodLogModal";
import { useNavigation } from "@react-navigation/native";

import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';

const LogFoodScreen = () => {
    const nav = useNavigation();
    const auth = getAuth();
    const user = auth.currentUser;

    let [searchValue, setSearchValue] = useState("") 
    let [matches, setMatches] = useState([]);
    let [modalVisible, setModalVisible] = useState(false)
    let [modalContent, setModalContent] = useState(null)
    let [presetMatches, setPresetMatches] = useState([])
    let [showPresets, setShowPresets] = useState(false)

    let [basket, setBasket] = useState([]);
    
    let basketSaved = false;


    // Remove basket on basket screen triggers and event here, persisting an item removal
    DeviceEventEmitter.addListener("event.removeItem", (eventData) => {setBasket(JSON.parse(eventData))});

    // Save button on basket screen triggers an event here telling the program to save the basket remotely
    DeviceEventEmitter.addListener("event.saveBasket", (eventData) => {setBasket(JSON.parse(eventData)); saveBasket()});

    
    async function saveBasket(){
        try {
            if(user && !basketSaved && basket.length > 0){
                let email = user["email"];
                let userRef = doc(db, 'users', email);
                const userSnapshot = await getDoc(userRef);
                const userData = userSnapshot.data();
                let newMealList = await userData.mealList;

                if(newMealList == undefined){
                    newMealList = []
                }
                newMealList.push({meal : basket});

                if(!basketSaved){
                    basketSaved = true; 
                    await updateDoc(userRef, {mealList:newMealList})
                    .then(() => setBasket([]))
                }
            }
          } 
          catch (error) {
            console.error(error);
          }
    }


    function addToBasket(food){
        // this ugliness is to ensure no duplicate items are added

        let temp = []
        let isContained = false;
        let addVal = food;
        
        for(let i = 0; i < basket.length; i++){
            if(basket[i]["foodObject"]["Description"] == food["foodObject"]["Description"]){
                let concatenateObj = basket[i];
                concatenateObj.weight += food.weight;
                temp.push(concatenateObj)
                isContained=true;
            } else {
                temp.push(basket[i]);
            }
        }
        isContained || temp.push(addVal)
        setBasket(temp)
    }


    function getMatches(){
        setShowPresets(false);
        setMatches([])

        let myFoods = findFoodObjects(searchValue)
        setMatches(myFoods.slice(0, 100))
    }

    async function getPresetMatches(){
        let presets = []
        setShowPresets(true);
        setPresetMatches([])
        try{
            presets = await findPresetObjects(searchValue)
        } catch(error){
            console.log(error)
        }

        setPresetMatches(presets)
    }

    return(
        <View style={{flex:1, alignContent: "center", justifyContent: "center"}}>

            {/* search bar */}
            <Text>Food Screen</Text>
            <TextInput testID="foodSearchBar" onChangeText={ (text) => {setSearchValue(text); getMatches()} } />
            <Button testID="foodSearch" title="search" onPress={ getMatches } />
            <Button title="search custom presets" onPress={ getPresetMatches } />
            <Button title="View Basket" onPress={() => nav.push("FoodBasketScreen", {currentBasket: basket})} />
            <Text>{basket.length} items</Text>

            {/* list of matches */}
            {!showPresets &&
                <FlatList
                    testID="foodResultList"
                    data={ matches }
                    keyExtractor = {(item) => item["Description"]}
                    renderItem={(match) => (
                        <FoodView 
                            foodDetails={ match }
                            // these buttons are rendered in the FoodView component
                            button={<View style={{flexDirection:"row", flexGrow:2, alignItems:"space-between", alignSelf: "center"}}>
                                        <Button title='i' />
                                        <Button title="Add" onPress={() => {setModalContent(match); setModalVisible(true)}} />
                                    </View>} />
                    )}
            />}
            {showPresets &&
                <FlatList 
                    data = { presetMatches }
                    keyExtractor={(item) => (item["Description"])}
                    renderItem={(item) => (
                        <Text>{ item.item["Description"] }</Text>
                    )
                    }

                />

            }

            {/* Popup for the modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                
                <FoodLogModal
                    testID="foodModal"
                    foodDetails={modalContent} 
                    hideButton={ <Button title="Hide Modal" onPress={() => {setModalVisible(false)}} /> }
                    // this prop will be used as a callback to update the basket from the modal
                    addToBasket={(f) => addToBasket(f)}
                    />
            </Modal>


            <BottomBar />       
        </View>
    )

}


export default LogFoodScreen


const styles = StyleSheet.create({
})