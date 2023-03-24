import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
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
      "age": "${responseJson.age}", 
      "height": "${height}",
      "weight": "${weight}"
    }`;

    navigation.navigate("Page3",{json})
}

return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Further Details</Text>
    </View>

    <View style={styles.footer}>
      <Text style={styles.text_footer}>What is your height (in meters):</Text>
      <View style={styles.displayInfo}>
      <TextInput style={styles.TextInput} placeholder="Height" onChangeText={setHeight} keyboardType='numberic' maxLength={4}/>
      </View>
      <Text style={styles.text_footer}>What is your weight (in kilograms):</Text>
      <View style={styles.displayInfo}>
      <TextInput style={styles.TextInput} placeholder="Weight" onChangeText={setWeight} keyboardType='numeric' maxLength={3}/>
      </View>

      <View>
        <TouchableOpacity onPress={saveDataandSwitch} style={styles.touchableStyle}>
              <Text style={[styles.textSign, {color: '#00a46c'}]}>Next</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.touchableStyle}>
              <Text style={[styles.textSign, {color: '#00a46c'}]}>Prev</Text>
        </TouchableOpacity> 
      </View>

    </View>
  </View >
);
}

export default Page2

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
})