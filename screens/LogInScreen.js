import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'

import HomeScreen from "./HomeScreen";
import Page1 from "./build-profile/Page1";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Platform,TouchableOpacity } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from "react-native";

const {width,height} = Dimensions.get('window'); 




const LogInScreen = ({navigation}) => {

    let [validEmail, setValidEmail] = useState(true);
    let [validPassword, setValidPassword] = useState(true)

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const [isHidden, setHidden] = useState(true);
    const [eye,setEye] = useState("eye");
  
    function changeHidden(){
        setHidden(!isHidden); 
  }
    function changeEye(){
        let eyeArray = ["eye", "eye-with-line"];
        setEye(eyeArray[(eyeArray.indexOf(eye)+1)%2]);

    }


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
            navigation.replace("Page1")
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
                <View style={{justifyContent: "center",alignItems: "center",}}>
                    <TextInput style={styles.textinput} placeholder="email" inputMode="email" onChangeText={(text) => setEmail(text)}/>
                    <Text testID="invalidEmail">{!validEmail && <Text style={styles.showisvalid}>Email is invalid</Text>}</Text>
                </View>
                <View style={{justifyContent: "center",alignItems: "center",}}>
                    <TextInput style={styles.textinput} placeholder="password" secureTextEntry={isHidden} onChangeText={(text) => setPassword(text)}/>
                    <Text testID="invalidPassword">{!validPassword && <Text style={styles.showisvalid}>Password is invalid</Text>}</Text>
                    <TouchableOpacity style={styles.eye} onPress={changeHidden} onPressIn={changeEye}>
                        <Entypo name= {eye} />
                    </TouchableOpacity>
                    
                </View>
                
                

                
                <TouchableOpacity onPress={handleSignUp} style= {styles.button}>
                    <View>
                        <Text style={styles.customText}> Sign Up</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogIn} style= {styles.button}>
                    <View>
                        <Text style={styles.customText}> Log In</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LogInScreen;


const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textinput: {
        fontSize: 20,
        paddingVertical: 5,
        marginTop: 5,
        borderWidth:1,
        width: width,
        padding:10,
        margin:15,
        borderRadius:20,
        paddingVertical:10,
    },

    showisvalid: {
        color: 'red',
        opacity: '0.9',
        alignSelf: "flex-start",
        fontSize: 9,
    },
    button:{
        backgroundColor:"#8cc5fa",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius:20,
        padding:15,
        marginVertical:15,
        borderWidth:1,

    },
        customText:{
            color:"white",   
        },
    eye:{
        margin:10,
        height:35,
        width:45,
        position:"absolute",
        right:0,
    }

    }
);
