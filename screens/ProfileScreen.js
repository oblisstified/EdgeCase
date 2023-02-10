import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import BottomBar from "./components/BottomBar";
import {TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from 'firebase/auth'


const ProfileScreen = ({route, navigation}) => {
    let [profile, setProfile] = useState(null)

    const user = getAuth()

    const renderProfile = (result) => {
       setProfile(JSON.parse(result));
    }

    function CustomText(props){
        return (
            <Text style = {styles.textStyle}>
                {props.children}
            </Text>
        );
    }

    AsyncStorage.getItem(user.currentUser.email).then((result) => renderProfile(result));


    return(
        <View>
            <ScrollView style={{maxHeight: "90%"}}>
                <View style={styles.displayInfo}>
                    <CustomText>Name:</CustomText>
                    <CustomText> { profile && profile.name } </CustomText>
                </View>
                <View style={styles.displayInfo}>
                    <CustomText>Age:</CustomText>
                    <CustomText> { profile && profile.age }</CustomText>
                </View>
                <View style={styles.displayInfo}>
                    <CustomText>Gender:</CustomText>
                    <CustomText> { profile && profile.gender }</CustomText>
                </View>
                <View style={styles.displayInfo}>
                    <CustomText>Height:</CustomText>
                    <CustomText> { profile && profile.height }</CustomText>
                </View>
                <View style={styles.displayInfo}>
                    <CustomText>PlaceHolder:</CustomText>
                    <CustomText> {  }</CustomText>
                </View>
                <View style={styles.displayInfo}>
                    <CustomText>PlaceHolder:</CustomText>
                    <CustomText> {  }</CustomText>
                </View>
                <View style={styles.displayInfo}>
                    <CustomText>PlaceHolder:</CustomText>
                    <CustomText> {  }</CustomText>
                </View>
                <View style={styles.displayInfo}>
                    <CustomText>PlaceHolder:</CustomText>
                    <CustomText> {  }</CustomText>
                </View>
            </ScrollView>
            <Button title="Edit Profile" onPress={() => navigation.replace("EditProfileScreen")} />
            <View style={{flex:0.5}} />
            <BottomBar />
        </View>
    )
}

export default ProfileScreen


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