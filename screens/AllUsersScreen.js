import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, TouchableOpacity,FlatList,SafeAreaView } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
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
        testFunction();
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

 


 
  return (
    <View style = {{flex:1}}  testID="AllUsersScreen">
       

        <SafeAreaView 
        style={{
          flex:0.15,
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
              Add Friends
            </Text>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "normal" }}>
              Send a friend request ;)
            </Text>
          </View>

        </View>
      </SafeAreaView>
            <View style = {{flex:0.7,paddingTop:40}}>
                <FlatList
                        testID = "flatlist"
                        data={userList.filter(item => item.email.trim() != user.email)}
                        keyExtractor={(item) => item.email}
                        renderItem={({ item }) => (
                            <View style={styles.userItem} testID="emailbutton">
                            <TouchableOpacity onPress={ () => goToUserProfile(item.email)}>
                                <View>
                                    <EvilIcons name = "user"/>
                                </View>
                            </TouchableOpacity>
                            <Text>{item.email}</Text>

                            <TouchableOpacity   onPress={() => FriendRequestMade(item.email)}>
                                <View>
                                <Text >Add friend</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                        )}
                    />
            </View>
            {/* <View style={styles.ButtonContainer}>
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

            </View> */}
              
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
