import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'

import HomeScreen from "./HomeScreen";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const LogInScreen = ({navigation}) => {

    let [email, setEmail] = useState('password');
    let [password, setPassword] = useState('password');
    
    const handleSignUp = () => {
        let user;

        const validators = () => {
            // TODO: Write validators for email and password
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            user = userCredentials.user;
            console.log(user.email)

            navigation.replace("HomeScreen", {"user": user})
        })
        .catch(error => alert(error.message))
    }

    const handleLogIn = () => {
        let user;
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            user = userCredentials.user;
            navigation.replace("HomeScreen", {"user": user})
        })
        .catch(error => alert(error.message))
    }

    return(
        <KeyboardAvoidingView style={{flex: 1}} behaviour="padding">
            <View style={styles.container}>
                <TextInput style={styles.textinput} placeholder="email" onChangeText={(text) => setEmail(text)}/>
                <TextInput style={styles.textinput} placeholder="password" onChangeText={(text) => setPassword(text)}/>
                <Button title="Sign Up" onPress={handleSignUp}/>
                <Button title="Log In" onPress={handleLogIn}/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LogInScreen


const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textinput: {
        fontSize: 20,
        borderColor: 'black',
        paddingVertical: 5,
        marginTop: 5,
    },
    }
);