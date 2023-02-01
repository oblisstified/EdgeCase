import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'

import HomeScreen from "./HomeScreen";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Platform } from "react-native";

const LogInScreen = ({navigation}) => {

    let[validEmail, setValidEmail] = useState(true);
    let[validPassword, setValidPassword] = useState(true)

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    


    const runValidators = () => {
        let validEmail = email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        setValidEmail(!!validEmail)
        
        // regex for: minimum 8 characters, one letter and one number
        let validPassword = password.match("^(?=.*[A-Za-z])(?=.*\d).{8,}$");
        setValidPassword(!!validPassword)

        return (validEmail && validPassword);
    }
    
    const handleSignUp = () => {

        // Returns if validation finds an error
        if(!runValidators()) return;

        console.log("passed validators")

        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            user = userCredentials.user;
            console.log(user.email)

            navigation.replace("HomeScreen")
        })
        .catch(error => alert(error.message))
        
    }

    const handleLogIn = () => {
        console.log("passed validators not")
        if(!runValidators()) return;

        console.log("passed validators")
        
        // does not allow sign up attempt with invalid credentials
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            navigation.replace("HomeScreen")
        })
        .catch(error => alert(error.message))
    }

    return(
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
            <View style={styles.container}>
                <TextInput style={styles.textinput} placeholder="email" inputMode="email" onChangeText={(text) => setEmail(text)}/>
                <Text testID="invalidEmail">{!validEmail && <Text style={styles.showisvalid}>Email is invalid</Text>}</Text>

                <TextInput style={styles.textinput} placeholder="password" secureTextEntry onChangeText={(text) => setPassword(text)}/>
                <Text testID="invalidPassword">{!validPassword && <Text style={styles.showisvalid}>Password is invalid</Text>}</Text>

                <Button title="Sign Up" onPress={handleSignUp}/>
                <Button title="Log In" onPress={handleLogIn}/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LogInScreen;


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
    showisvalid: {
        color: 'red',
        opacity: '0.9',
        alignSelf: "flex-start",
        fontSize: 9,
    },
    }
);