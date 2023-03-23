import React from "react";
import 'react-native-gesture-handler';
import { Button, Dimensions, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;


const BottomBar = () =>{
    const navigation = useNavigation();

    return (
        <View style={styles.bottombar}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LogFoodScreen")}>
            <Icon name="food" size={24} color="#000" />
            <Text style={styles.buttonText}>Log</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfileScreen")}>
            <Icon name="account-circle" size={24} color="#000" />
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
            <Icon name="home" size={24} color="#000" />
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AllUsersScreen")}>
            <Icon name="account-group" size={24} color="#000" />
            <Text style={styles.buttonText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SocialScreen")}>
            <Icon name="message-text" size={24} color="#000" />
            <Text style={styles.buttonText}>Social</Text>
          </TouchableOpacity>
        </View>
      );
    }
    

export default BottomBar


const styles = StyleSheet.create({

    bottombar: {
      flexDirection: "row",
      justifyContent: "space-around",
      position: "absolute",
      height: 60,
      left: 0,
      bottom: 0,
      width: "100%",
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      paddingBottom: 8, // Add some padding to the bottom to avoid icon going off screen
      paddingTop: 8,
    },
    button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 8, // Add some padding to the bottom to avoid icon going off screen
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#000",
    },
    icon: {
      marginBottom: 5, // Add some margin to the bottom of the icon
    },
  });