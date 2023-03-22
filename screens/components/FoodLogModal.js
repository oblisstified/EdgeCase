import React, {useState} from "react";
import 'react-native-gesture-handler';
import { Alert, Modal, Button, Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Pressable, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from "react-native-gesture-handler";

const FoodLogModal = (props) => {

    let [amountGrams, setAmountGrams] = useState(0);

    console.log(props.foodDetails)
    // A little ugly, loads the modal content from preset/list
    let foodHeader = props.foodDetails.item == undefined ? props.foodDetails[props.foodDetails.length-1]["name"] : props.foodDetails.item["Description"]


    return (
            <View style={styles.slideUpPanel} testID="foodModal">
                <View>
                  {/* props.foodDetails contains a json object with all the details about the food shown */}
                  <Text style={styles.modalText}>{ foodHeader }</Text>

                  {/* button passed in through props to enable the button to hide */}
                  {props.hideButton}

                  {/* TODO: add functionality to input a amount in grams of a Food and store as a json object */
                  /* probably worth writing a function in utils that handles this */}
                </View>
                
                <View>
                  <Text style={styles.card}>Input amount</Text>
                  <TextInput testID="amountInput" inputMode="numeric" onChangeText={(t) => setAmountGrams(t)}/>
                  <Button 
                    testID="addButton"
                    title="submit" 
                    onPress={() => {
                      props.addToBasket(
                        JSON.parse(`{"weight":` + amountGrams + `,"foodObject":` + JSON.stringify(props.foodDetails.item) + "}")
                        );
                    }} />
                </View>
                

            </View>
    );
}


const styles = StyleSheet.create({
    card : {
      alignSelf: "flex-start"
    },
    slideUpPanel: {
      marginTop: 200,
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