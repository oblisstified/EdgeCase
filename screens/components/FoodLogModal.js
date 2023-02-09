import React from "react";
import 'react-native-gesture-handler';
import { Alert, Modal, Button, Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FoodLogModal = props => {

    return (
            <View style={styles.centeredView}>
            <View style={styles.modalView}>

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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
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
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });


export default FoodLogModal