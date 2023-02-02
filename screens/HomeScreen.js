import React from "react";
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth'
import BottomBar from './components/BottomBar'

const HomeScreen = ({navigation}) => {
    const user = getAuth();

    const handleSignOut = () => {
        signOut(user);
        navigation.replace("LogInScreen")
    }

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