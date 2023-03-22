import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, TouchableOpacity,FlatList } from 'react-native';
import BottomBar from "./components/BottomBar";
import {Directions, TextInput } from "react-native-gesture-handler";
import { getAuth } from 'firebase/auth'
import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs,updateDoc,doc,getDoc} from 'firebase/firestore/lite';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";


const FriendRequestsScreen = ({route, navigation}) => {
    const nav = useNavigation();

    const user = getAuth().currentUser;
    const [friendRequestsList, setFriendRequestList] = useState([]);
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {
      async function getData () {
        const userRef = doc(db, 'users', user.email);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        setFriendRequestList(userData.friendRequests);
        setFriendsList(userData.friends)
      }
  
      getData();
    }, []);

    async function AcceptFriendRequest(email){
        try {
            const userRef = doc(db, 'users', user.email);
            const updatedFriendRequestsList = friendRequestsList.filter(request => request !== email);
            const updatedFriendsList = [...friendsList, email];
            await updateDoc(userRef, { friendRequests: updatedFriendRequestsList});
            await updateDoc(userRef, { friends: updatedFriendsList});
            setFriendRequestList(updatedFriendRequestsList);
            setFriendsList(updatedFriendsList);
          } 
          catch (error) {
            console.error(error); //code duplication here will fix
          }
    }


    async function RejectFriendRequest(email){
        try {
            const userRef = doc(db, 'users', user.email);
            const updatedFriendRequestsList = friendRequestsList.filter(request => request !== email);
            await updateDoc(userRef, { friendRequests: updatedFriendRequestsList });
            setFriendRequestList(updatedFriendRequestsList);
          } 
          catch (error) {
            console.error(error);
          }
    }



    return(
        <View>
            <View style={{flex:1}}>
            <FlatList
                    data={friendRequestsList}
                    keyExtractor={(item) => item.email}
                    renderItem={({ item }) => (
                        <View style = {styles.userItem}>
                            <Text>{item}</Text>
                            <View style= {{flexDirection:"row"}}>
                                <TouchableOpacity style = {styles.Button} onPress={() =>AcceptFriendRequest(item)}>
                                        <View>
                                            <AntDesign name = "check" size={20} color="green"/>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.Button}  onPress={() => RejectFriendRequest(item)}>
                                        <View>
                                            <AntDesign name = "close" size={20} color="red"/>
                                        </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={{flex:0.2}} />
        </View>
    )
}

export default FriendRequestsScreen;


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
        borderColor: "black",
        backgroundColor:"#8cc5fa"
    },
    textStyle :{
        color:"white",


    },
    userItem:{
        flexDirection:"row",
        padding:25,
        margin:10,
        borderWidth:1,
        borderRadius:10,
        justifyContent:"space-between",
    },
    Button:{
        padding:10,
       
    }
})