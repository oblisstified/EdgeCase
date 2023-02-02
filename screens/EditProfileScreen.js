import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomBar from "./components/BottomBar";

const EditProfileScreen = ({route, navigation}) => {
    let [name, setName] = useState("")
    let [gender, setGender] = useState("")
    let [age, setAge] = useState("")
    let [height, setHeight] = useState("")
    let [changeSaved, setChangeSaved] = useState(false)


    const user = getAuth();

    const handleSaveChanges = () => {
        

        let jsonProfile= 
        `{
            "name": "${name}", 
            "gender": "${gender}", 
            "age": "${age}", 
            "height": "${height}"
        }`;

        AsyncStorage.setItem(
            user.currentUser.email,
            jsonProfile,
            setChangeSaved(true)
        )
        

    }

    return(
        <View>
            <Text>Edit Profile Screen</Text>
            <TextInput placeholder="Name" onChangeText={setName}/>
            <TextInput placeholder="gender" onChangeText={setGender}/>
            <TextInput placeholder="age" onChangeText={setAge}/>
            <TextInput placeholder="height" onChangeText={setHeight}/>
            <Button title="save Changes" onPress={handleSaveChanges} />
            {changeSaved && <Text style={{color: "green"}}> Changes Saved!</ Text>}
            <BottomBar />       
        </View>
    )
}

export default EditProfileScreen


const styles = StyleSheet.create({
})