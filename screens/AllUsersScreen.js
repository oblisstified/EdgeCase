import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs,updateDoc,doc,getDoc} from 'firebase/firestore/lite';
import {ref, set} from  'firebase/database';
import { db } from "../firebase";

import BottomBar from "./components/BottomBar";

const AllUsersScreen = ({route, navigation}) => {
  const user = getAuth().currentUser;
  const [userList, setUserList] = useState([]);


  async function updateFriendsList(email){
    try {
        const userRef = doc(db, 'users', user.email);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        const updatedFriendsList = [...userData.friends, email];
        await updateDoc(userRef, { friends: updatedFriendsList });
      } catch (error) {
        console.error(error);
      }
  

    

  }

  useEffect(() => {
    async function getData () {
      const usersCol = collection(db, 'users'); //user collection
      const userSnapshot = await getDocs(usersCol); //gets all docs from the collection
      const userList = userSnapshot.docs.map(doc => doc.data());
      setUserList(userList);
    }

    getData();
  }, []);

  return(
    <View>
      <Text>hello {user.email}</Text>

      {userList.map(item => (
        <View  style = {styles.userItem}key = {item.email} >
          <Text>{item.email}</Text> 
          {/* change to username later */}
            <TouchableOpacity onPress={() => updateFriendsList(item.email)}>
                <View>
                    <Text style={styles.customText}> Add Friend </Text>
                </View>
            </TouchableOpacity>
        </View>
      ))}

      <BottomBar />     
    </View>
  )
}

export default AllUsersScreen;

const styles = StyleSheet.create({
    userItem:{
        flexDirection:"row",
        padding: 10,
        margin:10,
        borderWidth:1,
        borderRadius:10,
        justifyContent:"space-between",
    },

    customText:{
        color:"red", //idk
    }
 
})
