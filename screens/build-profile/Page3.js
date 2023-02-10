import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomBar from "../components/BottomBar";
import { Platform,TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';



const Page3 = ({navigation}) => {
  // state for textinput
  let [activity, setActivity] = useState("")
  const route = useRoute();
  var responseJson = route.params.myJson;

  const user = getAuth()

  const saveDataandSwitch = () => {
        
    let json= 
    `{ 
      "activity": "${activity}"
    }`;

    let jsonProfile = responseJson.concat(json)
    console.log(jsonProfile)

    navigation.navigate("Page4",{jsonProfile})
}

  return (
    <View>
    <Text>How active are you weekly:</Text>
    <TouchableOpacity onPress={() => activity = "0 - 1 days a week of exercise"} style= {styles.button}>
      <View>
      <Text style={styles.customText}>0 - 1 days a week of exercise</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => activity = "1 - 2 days a week of exercise"} style= {styles.button}>
      <View>
        <Text style={styles.customText}> 2 - 3 days a week of exercise</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => activity = "4+ days a week of exercise"} style= {styles.button}>
      <View>
        <Text style={styles.customText}> 4+ days a week of exercise</Text>
      </View>
    </TouchableOpacity>
    <Button title="Prev" onPress={() => navigation.replace("Page2") }/>
    <Button title="Next" onPress={saveDataandSwitch}/>
    </View>
  );
}

export default Page3

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