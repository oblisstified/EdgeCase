import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
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
        "age": "${age}"
    }`;

    navigation.navigate('Page2',{jsonProfile})
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tell me more...</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text_footer}>What is your name:</Text>
        <View style={styles.displayInfo}>
        <TextInput style={styles.TextInput} placeholder="Name" onChangeText={setName}/>
        </View>
        <Text style={styles.text_footer}>What is your age:</Text>
        <View style={styles.displayInfo}>
        <TextInput style={styles.TextInput} placeholder="Age" onChangeText={setAge} keyboardType='numeric' maxLength={3} />
        </View>
        <Text style={styles.text_footer}>What is your gender:</Text>
        <View style={styles.displayInfo}>
        <TextInput style={styles.TextInput} placeholder="Gender" onChangeText={setGender}/>
        </View>
        <TouchableOpacity onPress={saveDataandSwitch} style={styles.touchableStyle}>
              <Text style={[styles.textSign, {color: '#00a46c'}]}>Next</Text>
        </TouchableOpacity> 
      </View>
    </View >
  );
}

export default Page1

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00a46c'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 20,
      paddingHorizontal: 30
  },
  text_footer: {
    color: 'grey',
    marginTop:5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  displayInfo: {
    fontSize: 27,
    marginVertical: 30,
    minHeight: 50,
    borderRadius: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  selectedBtn:{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 15,
    backgroundColor:"#cefffb",
  },
  textinput: {
    fontSize: 20,
    paddingVertical: 5,
    marginTop: 5,
    borderWidth:1,
    padding:10,
    margin:15,
    borderRadius:20,
    paddingVertical:10,
},
touchableStyle: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  borderColor: '#009387',
  borderWidth: 1,
  marginTop: 15
}
})