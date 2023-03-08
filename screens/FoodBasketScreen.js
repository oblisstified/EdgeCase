import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, DeviceEventEmitter, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs, updateDoc, doc,getDoc, setDoc } from 'firebase/firestore/lite';


const FoodBasketScreen = props => {

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
        console.log(food)
        DeviceEventEmitter.emit("event.saveBasket", JSON.stringify(food))
        nav.pop()
    }

    async function savePreset(){
        if(description.length == 0){
            setPresetNameError(true);
            return;
        };
        try{
            // prevent duplicate entries
            if(saving) return;
            saving = true;

            
            let userRef = doc(db, 'presets', "presetList");
            const presetList = await getDoc(userRef);
            const presetData = presetList.data();

            newPreset = createPreset();
            oldPresetList = await presetData.allPresets
            oldPresetList.push(newPreset)

            console.log(oldPresetList);

            await updateDoc(userRef, {allPresets:oldPresetList}).then(()=>{setPresetSaved(true)})
        } catch (error){
            console.log(error)
        }
        
        let newPreset = createPreset(description);

    }

    function createPreset(){
        let presetObject = {
            "Name": description,
            "Ingredients": [],
            "Calories": 0,
            "Protein": 0,
            "Carbohydrate": 0,
            "Fiber": 0,
            "Sugar": 0,
            "Saturated Fat": 0,
            "Monounsaturated Fat": 0,
            "Polyunsaturated Fats": 0,
            "Weight": 0,
        };

        

        for(let i = 0; i < food.length; i++){
            presetObject["Ingredients"].push((food[i]["foodObject"]["Description"]), food[i]["weight"]);
            presetObject["Weight"] += food[i]["weight"]
            presetObject["Protein"] += food[i]["foodObject"]["Protein"]
            presetObject["Carbohydrate"] += food[i]["foodObject"]["Carbohydrate"]
            presetObject["Fiber"] += food[i]["foodObject"]["Fiber"]
            presetObject["Sugar"] += food[i]["foodObject"]["Sugar"]
            presetObject["Saturated Fat"] += food[i]["foodObject"]["Saturated Fat"]
            presetObject["Polyunsaturated Fats"] += food[i]["foodObject"]["Polyunsaturated Fats"]
            presetObject["Monounsaturated Fat"] += food[i]["foodObject"]["Monounsaturated Fat"]
        }
        return presetObject;
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
            <Button title="Save Preset" onPress={savePreset} />
            <TextInput placeholder="preset name" onChangeText={setDescription}/>
            {presetNameError && <Text style={{color:"red"}}>Preset needs a name to be saved</Text> }
            {presetSaved && <Text style={{color:"green"}}>Preset saved!</Text> }

        </View>
    )
}

export default FoodBasketScreen