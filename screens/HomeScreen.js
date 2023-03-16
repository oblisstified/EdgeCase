import React, { useState } from "react";
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth'

import BottomBar from './components/BottomBar'
import BazierLineChart from './components/Graph'



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

    return(
        <View style={{flex:1}}>
            <View>
                <Text>Successful login</Text>
                <Text>Welcome {user.currentUser.email} </Text>
                <Button title="logout" onPress={handleSignOut} />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <BazierLineChart />
                </View>

            <BottomBar navigation={navigation}/>            
        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
})