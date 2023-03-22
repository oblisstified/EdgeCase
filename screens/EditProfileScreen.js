import React, { useState,useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button,SafeAreaView,TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { ref, set, onValue, child, get } from "firebase/database";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore/lite";



import BottomBar from "./components/BottomBar";

const EditProfileScreen = ({ route, navigation }) => {
  const [userData, setUser] = useState({});
  // state for textinput
  let [name, setName] = useState( userData.name == undefined ? "": userData.name );
  let [gender, setGender] = useState( userData.gender == undefined ? "": userData.name);
  let [age, setAge] = useState( userData.name == undefined ? "": userData.name);
  let [height, setHeight] = useState( userData.name == undefined ? "": userData.name);

  // small message for notifying the user of changes
  let [changeSaved, setChangeSaved] = useState(false);

  const user = getAuth().currentUser;

 





  useEffect(() => {
      async function getData () {
        const usersCol = collection(db, 'users'); //user collection
        const userSnapshot = await getDocs(usersCol); //gets all docs from the collection
        const userList = userSnapshot.docs.map(doc => doc.data());
        const userData = userList.filter(item => item.email.trim() == user.email)[0];
        setUser(userData);

    
      }
  
      getData();
    }, []);


  async function handleSaveChanges() {
    try {
      const userRef = doc(db, "users", user.email);
      await updateDoc(userRef, { name: name });
      await updateDoc(userRef, { gender: gender });
      await updateDoc(userRef, { age: age });
      await updateDoc(userRef, { height: height });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    
    <View style={{ flex: 1 }}>
       <SafeAreaView 
        style={{
          flex:0.2,
          backgroundColor: "#00a46c",
          height: "22%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginLeft: 15,
            marginTop: 15
          }}
        >
          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 28, color: "#FFF", fontWeight: "bold" }}>
           Edit Profile
            </Text>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "normal" }}>
              update your profile
            </Text>

          </View>

        </View>
      </SafeAreaView>
  
      <View style={styles.formContainer}>
        <TextInput
          value =  {name}
          style={styles.userItem}
          placeholder="Name"
          onChangeText={setName}
        />
        <TextInput
         value =  {userData.gender == undefined ? "": userData.gender }
          style={styles.userItem}
          placeholder="Gender"
          onChangeText={setGender}
        />
  
        <TextInput
        value =  {userData.age == undefined ? "": userData.age }
          style={styles.userItem}
          placeholder="Age"
          onChangeText={setAge}
        />
        <TextInput
        value =  {userData.height == undefined ? "": userData.height }
          style={styles.userItem}
          placeholder="Height"
          onChangeText={setHeight}
        />
      </View>
      {changeSaved && <Text style={{ color: "green" }}> Changes Saved!</Text>}

      <TouchableOpacity  onPress={handleSaveChanges}  style={{
          backgroundColor: "#00a46c",
          paddingHorizontal: 20,
          paddingVertical: 5,
          borderRadius: 15,
          alignItems: "center"
        }}>
        <View>
          <Text  style={{
        fontWeight: "bold",
        fontSize: 15,
        color: "#FFF",}}>
            Save Changes
          </Text>  
        </View>
     
      </TouchableOpacity> 
      <BottomBar />
     
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex:0.1,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  input: {
    borderColor: "green",
    borderRadius: 2,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  userItem:{
    flexDirection:"row",
    padding:25,
    margin:10,
    borderWidth:1,
    borderRadius:10,
    justifyContent:"space-between",
},
});
