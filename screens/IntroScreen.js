import React from "react";
import {View, Text, Dimensions, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import LogInScreen from "./LogInScreen";

import SignUpScreen from "./SignUpScreen";

const IntroScreen = ({navigation}) => {
    return (
        <View style={styles.container}>

            <View style={styles.header}> 
                <Image              
                source={require('../assets/mealtime.png')}
                style={styles.logo}
                resizeMode="stretch"
                />
            </View>

            <View style={styles.footer}> 
                <Text style={styles.title}>Welcome to MealTime!</Text>
                <Text style={styles.text}>Stay healthy by tracking your foods!</Text>

                <TouchableOpacity 
                    onPress={()=>navigation.navigate(LogInScreen)}  
                    style={[styles.signIn, {borderColor: '#00a46c', borderWidth: 1, marginTop: 15 }]}>
                    <Text style={[styles.textSign, {color: '#00a46c'}]}>Get Started</Text>
                </TouchableOpacity>


            </View>      

        </View>
    );
};

export default IntroScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;   

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#00a46c'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        color: 'grey',
        marginTop: 5,
        marginBottom: 15
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    }
  });