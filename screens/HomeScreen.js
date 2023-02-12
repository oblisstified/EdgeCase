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

    const getBMI = () => {
        let bmi = (profile.weight/profile.height)/profile.height
        if(bmi < 18.5) {
            return  <Text>Underweight</Text>
        }
        if(bmi >= 18.5 && bmi < 24.9) {
            return <Text>Normal Weight</Text>
        }
        if(bmi >= 25 && bmi < 29.9) {
            return <Text>Overweight</Text>
        }
        if(bmi >= 30) {
            return <Text>Obese</Text>
        }
    }

    return(
        <View style={{flex:1}}>
            <View>
                <Text>Successful login</Text>
                <Text>Welcome {user.currentUser.email} </Text>
                <Button title="logout" onPress={handleSignOut} />
            </View>

            <View>
                <Text>This is your bmi today:</Text>
                <Text>{ profile && (profile.weight/profile.height)/profile.height }</Text>
                {profile && getBMI()}
            </View>

            <BottomBar navigation={navigation}/>            
        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
})