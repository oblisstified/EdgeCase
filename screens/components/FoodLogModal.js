import React from "react";
import 'react-native-gesture-handler';
import { Alert, Modal, Button, Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FoodLogModal = props => {

    return (
            <View style={styles.slideUpPanel}>
                <View style={{flex: 1}}>
                {/* props.foodDetails contains a json object with all the details about the food shown */}
                <Text style={styles.modalText}>{props.foodDetails["Description"]}</Text>

                {/* button passed in through props to enable the button to hide */}
                {props.hideButton}

                {/* TODO: add functionality to input a amount in grams of a Food and store as a json object */
                /* probably worth writing a function in utils that handles this */}
                </View>
            </View>
    );
}


const styles = StyleSheet.create({
    slideUpPanel: {
      marginTop: "60%", 
      flex: 1, 
      backgroundColor: "white"
    },
    modalView: {
      backgroundColor: 'white',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    
  });


export default FoodLogModal