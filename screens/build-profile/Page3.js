import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getAuth } from "firebase/auth"
import { TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';



const Page3 = ({navigation}) => {
  // state for textinput
  let [activity, setActivity] = useState("")
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
      "activity": "${activity}"
    }`;

    navigation.navigate("Page4",{json})
}

const select = (id) => {
  setSelected(id);
  if(id === 1){
    setActivity("0 - 1 days a week of exercise")
  }
  else if(id === 2){
    setActivity("2 - 3 days a week of exercise")
  }
  else{
    setActivity("4+ days a week of exercise")
  }
}

  return (
    <View>
    <Text>How active are you weekly:</Text>
    <TouchableOpacity onPress={() => select(1)} style= {selected === 1? styles.selectedBtn : styles.button}>
      <View>
      <Text style={styles.customText}>0 - 1 days a week of exercise</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => select(2)} style= {selected === 2? styles.selectedBtn : styles.button}>
      <View>
        <Text style={styles.customText}> 2 - 3 days a week of exercise</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => select(3)} style= {selected === 3? styles.selectedBtn : styles.button}>
      <View>
        <Text style={styles.customText}> 4+ days a week of exercise</Text>
      </View>
    </TouchableOpacity>
    <Button title="Prev" onPress={() => navigation.goBack() }/>
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