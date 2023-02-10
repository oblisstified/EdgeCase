import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomBar from "../components/BottomBar";


const Page1 = ({navigation}) => {
  // state for textinput
  let [name, setName] = useState("")
  let [gender, setGender] = useState("")
  let [age, setAge] = useState("")

  const user = getAuth()

  const saveDataandSwitch = () => {
        
    let jsonProfile= 
    `{
        "name": "${name}", 
        "gender": "${gender}", 
        "age": "${age}", 
    }`;

    navigation.navigate('Page2',{jsonProfile})
}

  return (
    <View style={styles.displayInfo}>
      <Text>What is your name:</Text>
      <TextInput style={styles.input} placeholder="Name" onChangeText={setName}/>
      <Text>What is your age:</Text>
      <TextInput style={styles.input} placeholder="Age" onChangeText={setAge}/>
      <Text>What is your gender:</Text>
      <TextInput style={styles.input} placeholder="Gender" onChangeText={setGender}/>
      <Button title="Next" onPress={saveDataandSwitch}/>
    </View>
  );
}

export default Page1

const styles = StyleSheet.create({
    displayInfo : {
    }
})