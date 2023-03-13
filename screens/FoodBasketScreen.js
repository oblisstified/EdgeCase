import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, DeviceEventEmitter, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { getAuth } from 'firebase/auth'
import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';


const FoodBasketScreen = props => {

    const auth = getAuth();
    const user = auth.currentUser;

    const nav = useNavigation();
    // verbose inside te
    let [food, setFood] = useState((props.route && props.route.params.currentBasket) || props.currentBasket)
    let [description, setDescription] = useState("")
    let [presetNameError, setPresetNameError] = useState(false)
    let [presetSaved, setPresetSaved] = useState(false)

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
        DeviceEventEmitter.emit("event.saveBasket", JSON.stringify(food))
        nav.pop()
    }w
    async function savePreset(){
        if(description.length == 0){
            setPresetNameError(true);
            return;
        };
        try{
            // prevent duplicate entries
            if(saving) return;
            saving = true;

            let presetRef = doc(db, 'presets', "presetList");
            const presetSnapshot = await getDoc(presetRef);
            const data = presetSnapshot.data();
            let newPresets = await data.presets;

            if(newPresets == undefined){
                newPresets = []
            }

            let label = {name: description}
            let temp = food;
            food.push(label)

            newPresets.push({preset : temp});

            console.log(temp.name)

            await updateDoc(presetRef, {presets:newPresets})
            .then(() => console.log("succ"))

        } catch (error){
            console.log(error)
        }

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
            <TextInput placeholder="preset name" onChangeText={setDescription}/>
            {presetNameError && <Text style={{color:"red"}}>Preset needs a name to be saved</Text> }
            {presetSaved && <Text style={{color:"green"}}>Preset saved!</Text> }

        </View>
    )
}

export default FoodBasketScreen