import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, TouchableOpacity,FlatList } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs,updateDoc,doc,getDoc} from 'firebase/firestore/lite';
import {ref, set} from  'firebase/database';
import { db } from "../firebase";
import EvilIcons from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import BottomBar from "./components/BottomBar";
import OtherUserProfileScreen from "./OtherUserProfileScreen";


const AllUsersScreen = ({route, navigation}) => {
    const user = getAuth().currentUser;
    const [userList, setUserList] = useState([]);

    useEffect(() => {
      async function getData () {
        const usersCol = collection(db, 'users'); //user collection
        const userSnapshot = await getDocs(usersCol); //gets all docs from the collection
        const userList = userSnapshot.docs.map(doc => doc.data());
        setUserList(userList);
      }
  
      getData();
    }, []);
  


  async function FriendRequestMade(email){
    try {
        const userRef = doc(db, 'users', email);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        if (!userData.friendRequests.includes(user.email)){
            const updatedFriendRequestsList = [...userData.friendRequests, user.email];
            await updateDoc(userRef, { friendRequests: updatedFriendRequestsList });
        }
      } 
      catch (error) {
        console.error(error);
      }
  }

  function goToUserProfile(email){
    navigation.replace("OtherUserProfileScreen", {email: email});
    
  }


 
  console.log(userList);
  return (
    <View style = {{flex:1}}  testID="AllUsersScreen">
       
            <View>
                <Text>hello {user.email}</Text>
            </View>
          
            <View style = {{flex:0.7}}>
                <FlatList
                        data={userList.filter(item => item.email.trim() != user.email)}
                        keyExtractor={(item) => item.email}
                        renderItem={({ item }) => (
                            <View style={styles.userItem}>
                            <TouchableOpacity onPress={ () => goToUserProfile(item.email)}>
                                <View>
                                    <EvilIcons name = "user"/>
                                </View>
                            </TouchableOpacity>
                            <Text>{item.email}</Text>

                            <TouchableOpacity onPress={() => FriendRequestMade(item.email)}>
                                <View>
                                <Text style={styles.customText}> Add Friend </Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                        )}
                    />
            </View>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity onPress={() => navigation.replace("FriendRequestsScreen")}>
                <View style = {styles.button}>
                  <Text> View Friend Requests</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.replace("FriendsScreen")}>
                <View style = {styles.button}>
                  <Text> View Friends </Text>
                </View>
              </TouchableOpacity>

            </View>
              
            <BottomBar />     
    </View>
)

}

export default AllUsersScreen;

const styles = StyleSheet.create({
    userItem:{
        flexDirection:"row",
        padding:25,
        margin:10,
        borderWidth:1,
        borderRadius:10,
        justifyContent:"space-between",
    },

    customText:{
        color:"red", //idk
    },
    ButtonContainer:{
      flex:0.15,
      flexDirection: "row",
      justifyContent:"space-between",
      padding:25,
    },
    button:{
      borderWidth:1,
      padding:20,
      borderRadius:30,

    
      }

 
})
