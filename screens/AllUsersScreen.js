import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs} from 'firebase/firestore/lite';
import { db } from "../firebase";

import BottomBar from "./components/BottomBar";

const AllUsersScreen = ({route, navigation}) => {
    const user = getAuth().currentUser;

    const getData = async ()=>{
        const usersCol = collection(db, 'users'); //user collection
        const userSnapshot = await getDocs(usersCol); //gets all docs from the collection
        const userList = userSnapshot.docs.map(doc => doc.data());
        
        let userEmails = userList.map(({age})=>age); //this gives list of all users' age in the database
        console.log(userEmails);

    }

    return(
        <View>
            <Text>hello {user.email}</Text>
            <Button title="get Data" onPress={getData}> </Button>

            {userList.map(item => (
                <View >
                    <Text>{item.email}</Text>
                </View>
        ))}


            <BottomBar />     
        </View>
    )
}

export default AllUsersScreen;


const styles = StyleSheet.create({
 
})