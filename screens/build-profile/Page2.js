import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"
import { useRoute } from '@react-navigation/native';



const Page2 = ({navigation}) => {
  // state for textinput
  let [height, setHeight] = useState("")
  let [weight, setWeight] = useState("")

  const route = useRoute();
  var responseJson = JSON.parse(route.params.jsonProfile);

  const user = getAuth()
  

  const saveDataandSwitch = () => {
        
    let json= 
    `{ 
      "name": "${responseJson.name}", 
      "gender": "${responseJson.gender}", 
      "age": ${responseJson.age}, 
      "height": ${height},
      "weight": ${weight}
    }`;

    navigation.navigate("Page3",{json})
}


  return (
    <View>
      <Text>What is your height (in meters):</Text>
      <View style={styles.displayInfo}>
      <TextInput style={styles.input} placeholder="Height" onChangeText={setHeight} keyboardType='number-pad' maxLength={5}/>
      </View>
      <Text>What is your weight (in kilograms):</Text>
      <View style={styles.displayInfo}>
      <TextInput style={styles.input} placeholder="Weight" onChangeText={setWeight} keyboardType='number-pad' maxLength={5}/>
      </View>
      <Button title="Prev" onPress={() => navigation.goBack() }/>
      <Button title="Next" onPress={saveDataandSwitch}/>
    </View>
  );
}

export default Page2

const styles = StyleSheet.create({
  displayInfo : {
      flex:1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 30,
      marginVertical: 30,
      minHeight: 50,
      borderWidth: 2,
      borderRadius: 15,
      borderColor: "purple"
  }
})