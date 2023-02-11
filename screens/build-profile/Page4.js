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
  var responseJson = JSON.parse(route.params.json);
  let[selected,setSelected] = useState(0)


  const user = getAuth()

  const saveDataandSwitch = () => {
        
    let json= 
    `{
      "name": "${responseJson.name}", 
      "gender": "${responseJson.gender}", 
      "age": "${responseJson.age}", 
      "height": "${responseJson.height}",
      "weight": "${responseJson.weight}",
      "activity": "${responseJson.activity}",
      "goal": "${goal}"
    }`;

    AsyncStorage.setItem(
        user.currentUser.email,
        json
    )

    navigation.replace("HomeScreen")
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    })
}

const select = (id) => {
  setSelected(id);
  if(id === 1){
    setGoal("Lose Weight")
  }
  else{
    setGoal("Gain Weight")
  }
}

  return (
    <View>
    <Text>What is your fitness goal:</Text>
    <TouchableOpacity onPress={() => select(1)} style= {selected === 1? styles.selectedBtn : styles.button}>
      <View>
      <Text style={styles.customText}>Lose Weight</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => select(2)} style= {selected === 2? styles.selectedBtn : styles.button}>
      <View>
        <Text style={styles.customText}> Gain Weight</Text>
      </View>
    </TouchableOpacity>
    <Button title="Prev" onPress={() => navigation.goBack() }/>
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
  selectedBtn:{
    backgroundColor:"#5591c9",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius:20,
    padding:15,
    marginVertical:15,
    borderWidth:1,
  },
  customText:{
    color:"white",   
  },
  headerBackTitleVisible: false
})