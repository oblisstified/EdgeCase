import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'

import HomeScreen from "./HomeScreen";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Platform } from "react-native";

const LogInScreen = ({navigation}) => {

    let [email, setEmail] = useState('password');
    let [password, setPassword] = useState('password');
    let [inputErrors, setInputErrors] = useState('');
    


    const runValidators = () => {
        // TODO: Write validators for email and password
        let validEmail = email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if(!validEmail) setInputErrors(inputErrors + "Email is invalid. ")
        
        let validPassword = password.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");
        if(!validPassword) setInputErrors(inputErrors + "Password must be 8 characters long, contain a letter, number and special character")
    }
    
    const handleSignUp = () => {
        let user;

        runValidators();
        if(inputErrors.length != 0){
            alert(inputErrors);
            setInputErrors('');
            return;
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

        runValidators();
        if(inputErrors.length != 0){
            alert(inputErrors);
            setInputErrors('');
            return;
        }


        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            user = userCredentials.user;
            navigation.replace("HomeScreen", {"user": user})
        })
        .catch(error => alert(error.message))
    }

    return(
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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