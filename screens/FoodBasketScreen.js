import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, DeviceEventEmitter, TextInput } from 'react-native';
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
        <View testID="basketList">
            { food && food.map((o) => o &&
                <View key={o.foodObject.Description}>
                    <Text>
                        {o.foodObject.Description + ": " + o.weight}
                    </Text>
                    <Button testID={o.foodObject.Description + "button"} title="remove" onPress={()=>handleRemove(o)}/>
                </View>
            ) }

            <Button  testID="saveButton" title="save" onPress={saveBasket} />
            <Button testID="savePresetButton" title="Save Preset" onPress={savePreset} />
            <TextInput testID="nameBar" placeholder="preset name" onChangeText={setDescription}/>
            {presetNameError && <Text style={{color:"red"}}>Preset needs a name to be saved</Text> }
            {presetSaved && <Text style={{color:"green"}}>Preset saved!</Text> }

        </View>
    )
}

export default FoodBasketScreen