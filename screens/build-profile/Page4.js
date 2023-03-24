import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getAuth } from "firebase/auth"
import { TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore/lite';
import { db } from "../../firebase"

const Page4 = ({navigation}) => {
  // state for textinput
  let [goal, setGoal] = useState("")
  const route = useRoute();
  var responseJson = JSON.parse(route.params.json);
  let[selected,setSelected] = useState(0)


  const user = getAuth()

  const saveDataandSwitch = () => {

    setDoc(doc(db,'users',user.currentUser.email),{
      email:user.currentUser.email, name: responseJson.name, age:responseJson.age, 
      friends:[], friendRequests:[], gender:responseJson.gender, height:responseJson.height, 
      weight:responseJson.weight, activity:responseJson.activity, goal:goal, redeemed:[], 
      likedPosts:[], numSavedRecipes: 0, timesCalGoalHit: 0, numPostsMade: 0
    });

    navigation.navigate("HomeScreen")
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