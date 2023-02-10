import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomBar from "../components/BottomBar";
import { useRoute } from '@react-navigation/native';



const Page2 = ({navigation}) => {
  // state for textinput
  let [height, setHeight] = useState("")
  let [weight, setWeight] = useState("")

  const route = useRoute();
  var responseJson = route.params.jsonProfile;

  const user = getAuth()
  

  const saveDataandSwitch = () => {
        
    let json= 
    `{ 
      "height": "${height}",
      "weight": "${weight}"
    }`;

    let myJson = responseJson.concat(json)
    console.log(myJson)

    navigation.navigate("Page3",{myJson})
}


  return (
    <View style={styles.displayInfo}>
      <Text>What is your height:</Text>
      <TextInput style={styles.input} placeholder="Height" onChangeText={setHeight}/>
      <Text>What is your weight:</Text>
      <TextInput style={styles.input} placeholder="Weight" onChangeText={setWeight}/>
      <Button title="Prev" onPress={() => navigation.replace("Page1") }/>
      <Button title="Next" onPress={saveDataandSwitch}/>
    </View>
  );
}

export default Page2

const styles = StyleSheet.create({
    displayInfo : {
    }
})