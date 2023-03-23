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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>More Details</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.text_footer}>How active are you weekly:</Text>
            
            <TouchableOpacity 
                        onPress={() => select(1)} 
                        style={selected === 1? styles.selectedBtn : styles.touchableStyle}
                    >
              <Text style={[styles.textSign, {color: '#009387'}]}>0 - 1 days a week of exercise</Text>
            </TouchableOpacity> 
            
            <TouchableOpacity 
                        onPress={() => select(2)} 
                        style={selected === 2? styles.selectedBtn : styles.touchableStyle}
                    >
              <Text style={[styles.textSign, {color: '#009387'}]}>2 - 3 days a week of exercise</Text>
            </TouchableOpacity> 

            <TouchableOpacity 
                        onPress={() => select(3)} 
                        style={selected === 3? styles.selectedBtn : styles.touchableStyle}
                    >
              <Text style={[styles.textSign, {color: '#009387'}]}>4+ days a week of exercise</Text>
            </TouchableOpacity> 

            <Button title="Prev" onPress={() => navigation.goBack() }/>
            <Button title="Next" onPress={saveDataandSwitch}/>

          </View>
        </View>
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
  customText:{
    color:"white",   
  },
  container: {
    flex: 1, 
    backgroundColor: '#009387'
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