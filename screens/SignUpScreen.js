import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';

import LogInScreen from "./LogInScreen";
import Page1 from "./build-profile/Page1";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword} from "firebase/auth";
import { Platform,TouchableOpacity } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';

import { doc, setDoc} from 'firebase/firestore/lite';
import { db } from "../firebase";

const SignUpScreen = ({navigation}) => {

    let [validEmail, setValidEmail] = useState(true);
    let [validPassword, setValidPassword] = useState(true);
    //let [validConfirmPassword, SetConfirmPassword] = useState(true);

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    //let [confirmPassword, SetConfirmPassword] = useState('');

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
        
        // confirm password
        //let validConfirmPassword = password.match(confirmPassword);
        //SetConfirmPassword(!!validConfirmPassword)

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
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register Here</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <TextInput 
                            placeholder="Your Email"
                            style={styles.textInput}
                            inputMode="email" 
                            autoCapitalize="none"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Text testID="invalidEmail">{!validEmail && <Text style={styles.showisvalid}>Email is invalid</Text>}</Text>
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop:35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <TextInput 
                            placeholder="Your Password"
                            secureTextEntry={isHidden}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Text testID="invalidPassword">{!validPassword && <Text style={styles.showisvalid}>Password is invalid</Text>}</Text>
                        <TouchableOpacity style={styles.eye} onPress={changeHidden} onPressIn={changeEye}>
                            <Entypo name= {eye} />
                        </TouchableOpacity>
                    </View> 

                    <Text style={[styles.text_footer, {
                        marginTop:35
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <TextInput 
                            placeholder="Your Password"
                            secureTextEntry={isHidden}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Text testID="invalidPassword">{!validPassword && <Text style={styles.showisvalid}>Passwords don't match</Text>}</Text>
                        <TouchableOpacity style={styles.eye} onPress={changeHidden} onPressIn={changeEye}>
                            <Entypo name= {eye} />
                        </TouchableOpacity>
                    </View> 

                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                        </Text>
                        <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
                    </View>

                    <TouchableOpacity 
                        onPress={handleSignUp}   
                        style={[styles.signIn, {
                            borderColor: '#00a46c',
                            borderWidth: 1,
                            marginTop: 15 }]}
                    >
                        <Text style={[styles.textSign, {color: '#00a46c'}]}>Sign Up</Text>
                    </TouchableOpacity>  

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.signIn, {
                            borderColor: '#00a46c',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                    <Text style={[styles.textSign, {
                        color: '#00a46c'
                    }]}>Back</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </KeyboardAvoidingView>
        
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#00a46c'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    showisvalid: {
        color: 'red',
        opacity: '0.9',
        alignSelf: "flex-start",
        fontSize: 9,
    },
    textinput: {
        fontSize: 20,
        paddingVertical: 5,
        marginTop: 5,
        borderWidth:1,
        padding:10,
        margin:15,
        borderRadius:20,
        paddingVertical:10,
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
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        backgroundColor:"#08d4c4"
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});