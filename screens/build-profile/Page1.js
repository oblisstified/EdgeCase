import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"

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
        "age": ${age}
    }`;

    navigation.navigate('Page2',{jsonProfile})
}

  return (
    <View>
      <Text>What is your name:</Text>
      <View style={styles.displayInfo}>
      <TextInput style={styles.input} placeholder="Name" onChangeText={setName}/>
      </View>
      <Text>What is your age:</Text>
      <View style={styles.displayInfo}>
      <TextInput style={styles.input} placeholder="Age" onChangeText={setAge} keyboardType='numeric' maxLength={3} />
      </View>
      <Text>What is your gender:</Text>
      <View style={styles.displayInfo}>
      <TextInput style={styles.input} placeholder="Gender" onChangeText={setGender}/>
      </View>
      <Button title="Next" onPress={saveDataandSwitch}/>
    </View>
  );
}

export default Page1

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