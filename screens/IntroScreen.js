import React from "react";
import {View, Text, Dimensions, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import LogInScreen from "./LogInScreen";

// import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SignUpScreen from "./SignUpScreen";

const IntroScreen = ({navigation}) => {
    return (
        <View style={styles.container}>

            <View style={styles.header}> 
                <Image              //Animatable.Image
                    // animation="bounceIn"
                    // duraton="1500"
                source={require('../assets/favicon.png')}
                style={styles.logo}
                resizeMode="stretch"
                />
            </View>

            <View        //Animatable.View
                style={styles.footer}
                // animation="fadeInUpBig"
            > 
                <Text style={styles.title}>Stay healthy by tracking your foods!</Text>
                <Text style={styles.text}>Sign in with account</Text>

                <View style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate(LogInScreen)}> 
                    <Text style={styles.textSign}>Get Started</Text>
                </TouchableOpacity>
                </View>

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
      backgroundColor: '#009387'
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
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'black',
        fontWeight: 'bold'
    }
  });