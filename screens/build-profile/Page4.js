import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomBar from "../components/BottomBar";
import { Platform,TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';

const Page4 = ({navigation}) => {
  // state for textinput
  let [goal, setGoal] = useState("")
  const route = useRoute();
  var responseJson = route.params.jsonProfile;

  const user = getAuth()

  const saveDataandSwitch = () => {
        
    let json= 
    `{ 
      "goal": "${goal}"
    }`;

    let myJson = responseJson.concat(json)

    console.log(myJson)

    AsyncStorage.setItem(
        user.currentUser.email,
        myJson
    )

    navigation.replace("HomeScreen")
    console.log(AsyncStorage.getItem(user.currentUser.email))
}

  return (
    <View>
    <Text>What is your fitness goal:</Text>
    <TouchableOpacity onPress={() => goal = "Lose Weight"} style= {styles.button}>
      <View>
      <Text style={styles.customText}>Lose Weight</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => goal = "Gain Weight"} style= {styles.button}>
      <View>
        <Text style={styles.customText}> Gain Weight</Text>
      </View>
    </TouchableOpacity>
    <Button title="Prev" onPress={() => navigation.replace("Page3") }/>
    <Button title="Submit" onPress={saveDataandSwitch}/>
    </View>
  );
}

export default Page4

const styles = StyleSheet.create({
  button:{
    backgroundColor:"#8cc5fa",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius:20,
    padding:15,
    marginVertical:15,
    borderWidth:1,
  },
  customText:{
    color:"white",   
  }
})