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


const FriendsScreen = ({route, navigation}) => {

    const user = getAuth().currentUser;
    const [friendsList, setFriendsList] = useState([]);
    useEffect(() => {
      async function getData () {
        const userRef = doc(db, 'users', user.email);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        setFriendsList(userData.friends);
      }
      getData();
    }, []);

    


    return(
        <View>
        <View >
            <Text>You have {friendsList.length} friends</Text>
            <Text>Friends:</Text>
           <FlatList
                data={friendsList}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <View style = {styles.userItem}>         
                        <Text>{item}</Text>
                    </View>
                )}
            />
        </View>
        <BottomBar /> 
        </View>
    )
}

export default FriendsScreen;


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