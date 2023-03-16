import React, { useState } from "react";
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomBar from './components/BottomBar'

const HomeScreen = ({navigation}) => {
    const user = getAuth();
    let [profile, setProfile] = useState(null)

    const handleSignOut = () => {
        signOut(user);
        navigation.replace("LogInScreen")
    }

    const renderProfile = (result) => {
        setProfile(JSON.parse(result))
    }

    AsyncStorage.getItem(user.currentUser.email).then((result) => renderProfile(result));

    return(
        <View style={{flex:1}}>
            <View>
                <Text>Successful login</Text>
                <Text>Welcome {user.currentUser.email} </Text>
                <Button title="logout" onPress={handleSignOut} />
            </View>
            <BottomBar navigation={navigation}/>            
        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
})