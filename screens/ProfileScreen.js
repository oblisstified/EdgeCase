import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import BottomBar from "./components/BottomBar";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from 'firebase/auth'


const ProfileScreen = ({route, navigation}) => {
    let [profileLoaded, setProfileLoaded] = useState(false)
    let [profile, setProfile] = useState(null)

    const user = getAuth()

    const renderProfile = (result) => {
       const prof = JSON.parse(result);
       setProfile(prof);
    }

    AsyncStorage.getItem(user.currentUser.email).then((result) => renderProfile(result));

    const values =  (err, result) => {
        if(result) email = result;
    }

    return(
        <View>
            <Text>Profile Screen</Text>
            <Button title="Edit Profile" onPress={() => navigation.replace("EditProfileScreen")} />
            <Text> { profile && profile.name } </Text>
            <Text> { profile && profile.age }</Text>
            <Text> { profile && profile.gender }</Text>
            <Text> { profile && profile.height }</Text>
            <BottomBar />       
        </View>
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
})