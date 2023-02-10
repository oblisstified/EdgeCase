import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import BottomBar from "./components/BottomBar";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from 'firebase/auth'


const ProfileScreen = ({route, navigation}) => {
    let [profile, setProfile] = useState(null)

    const user = getAuth()

    const renderProfile = (result) => {
       setProfile(JSON.parse(result));
    }

    AsyncStorage.getItem(user.currentUser.email).then((result) => renderProfile(result));


    return(
        <View>
            <ScrollView style={{maxHeight: "90%"}}>
                <View style={styles.displayInfo}>
                    <Text>Name:</Text>
                    <Text> { profile && profile.name } </Text>
                </View>
                <View style={styles.displayInfo}>
                    <Text>Age:</Text>
                    <Text> { profile && profile.age }</Text>
                </View>
                <View style={styles.displayInfo}>
                    <Text>Gender:</Text>
                    <Text> { profile && profile.gender }</Text>
                </View>
                <View style={styles.displayInfo}>
                    <Text>Height:</Text>
                    <Text> { profile && profile.height }</Text>
                </View>
                <View style={styles.displayInfo}>
                    <Text>Weight:</Text>
                    <Text> { profile && profile.weight }</Text>
                </View>
                <View style={styles.displayInfo}>
                    <Text>Activity:</Text>
                    <Text> { profile && profile.weight }</Text>
                </View>
                <View style={styles.displayInfo}>
                    <Text>PlaceHolder:</Text>
                    <Text> {  }</Text>
                </View>
                <View style={styles.displayInfo}>
                    <Text>PlaceHolder:</Text>
                    <Text> {  }</Text>
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
        borderColor: "purple"
    }
})