import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import BottomBar from "./components/BottomBar";
import {TextInput } from "react-native-gesture-handler";
import { getAuth } from 'firebase/auth'
import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs,updateDoc,doc,getDoc} from 'firebase/firestore/lite';


const OtherUserProfileScreen = ({route, navigation}) => {
    const email = route.params.email;
    const [userData, setUser] = useState({});
 

 

    useEffect(() => {
        async function getData () {
          const usersCol = collection(db, 'users'); //user collection
          const userSnapshot = await getDocs(usersCol); //gets all docs from the collection
          const userList = userSnapshot.docs.map(doc => doc.data());
          const userData = userList.filter(item => item.email.trim() == email)[0];
          setUser(userData);
        }
    
        getData();
      }, []);


    return(
        <View>
            <Text>{email}'s profile</Text>
            <Text>{userData.name}</Text>
            <Text>{userData.gender}</Text>
            <Text>{userData.height}</Text>
            <Text>{userData.age}</Text>
            {/* add some other features that people would need to know */}
            <BottomBar />
        </View>
    )
}

export default OtherUserProfileScreen;


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

    }
})