import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import BottomBar from "./components/BottomBar";
import {TextInput } from "react-native-gesture-handler";
import { getAuth } from 'firebase/auth'
import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs,updateDoc,doc,getDoc} from 'firebase/firestore/lite';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const OtherUserProfileScreen = ({route, navigation}) => {
    const email = route.params.email;
    const [userData, setUser] = useState({});

    function CustomText(props) {
        return <Text style={styles.textStyle}>{props.children}</Text>;
      }
 

 

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
           
            {/* add some other features that people would need to know */}
            <ScrollView style={{ maxHeight: "90%" }} testID = "scrollView">
                <View  style={{ flex: 1,alignItems: "center" }}>
                    <FontAwesome name = "user-circle-o" size = {150} color={"#98fb98"} />
                </View>
                <View style = {{flexDirection : 'row', justifyContent: 'space-between',padding:10, marginHorizontal: 100}}>
                    <View>
                        <Text>Posts </Text>
                        <Text>placeholder</Text>
                    </View>
                    <View>
                        <Text>Friends </Text>
                        <Text>{(userData.friends).length}</Text>
                    </View>
                </View>

                <View style={styles.displayInfo} testID = "scrollViewChild">
                <CustomText>Name:</CustomText>
                <CustomText> {userData.name} </CustomText>
                </View>
                <View style={styles.displayInfo} testID = "scrollViewChild">
                <CustomText>Age:</CustomText>
                <CustomText> {userData.age} </CustomText>
                </View>
                <View style={styles.displayInfo}testID = "scrollViewChild">
                <CustomText>Gender:</CustomText>
                <CustomText> {userData.gender} </CustomText>
                </View>
                <View style={styles.displayInfo}testID = "scrollViewChild">
                <CustomText>Height:</CustomText>
                <CustomText> {userData.height} </CustomText>
                </View>
                <View style={styles.displayInfo}testID = "scrollViewChild">
                <CustomText>PlaceHolder:</CustomText>
                <CustomText> {}</CustomText>
                </View>
                <View style={styles.displayInfo}testID = "scrollViewChild">
                <CustomText>PlaceHolder:</CustomText>
                <CustomText> {}</CustomText>
                </View>
                <View style={styles.displayInfo}testID = "scrollViewChild">
                <CustomText>PlaceHolder:</CustomText>
                <CustomText> {}</CustomText>
                </View>
                <View style={styles.displayInfo}testID = "scrollViewChild">
                <CustomText>PlaceHolder:</CustomText>
                <CustomText> {}</CustomText>
                </View>
      </ScrollView>
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