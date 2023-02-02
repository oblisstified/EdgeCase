import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import BottomBar from "./components/BottomBar";
import { TextInput } from "react-native-gesture-handler";

const ProfileScreen = ({route, navigation}) => {
    return(
        <View style={{flex:1, alignContent: "center", justifyContent: "center"}}>
            <Text>Profile Screen</Text>
            <BottomBar />       
        </View>
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
})