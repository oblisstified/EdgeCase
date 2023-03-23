import React, {useState} from "react";
import 'react-native-gesture-handler';
import { TouchableOpacity, Alert, Modal, Button, Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from "react-native-gesture-handler";

const FoodLogModal = (props) => {

    let [amountGrams, setAmountGrams] = useState(0);

    console.log(props.foodDetails)
    // A little ugly, loads the modal content from preset/list
    let foodHeader = props.foodDetails.item == undefined ? props.foodDetails[props.foodDetails.length-1]["name"] : props.foodDetails.item["Description"]


    return (
            <View style={[styles.slideUpPanel, {backgroundColor:"#ededed", borderRadius:20, margin:10, padding:20, justifyContent:"space-evenly"}]} testID="foodModal">
                  {/* props.foodDetails contains a json object with all the details about the food shown */}
                  <Text style={ styles.infoText }>{ foodHeader.toLowerCase() // makes every letter lowercase
                                                                .replace(/,/g, ", ")
                                                                .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())} (per 100g)</Text>

                  {/* button passed in through props to enable the button to hide */}
                  

                  {/* TODO: add functionality to input a amount in grams of a Food and store as a json object */
                  /* probably worth writing a function in utils that handles this */}
                
                  <View style={[styles.searchBar, styles.shadowProp]}>
                    <TextInput
                      testID="amountInput" 
                      inputMode="numeric" 
                      placeholder="Type an amount (grams)"
                      placeholderTextColor="#737373"
                      onChangeText={(text) => {
                        setAmountGrams(text)
                      }}
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        width: 260,
                      }}
                    />
                    <Image
                      source={require("../images/search.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  </View>
                  { props.hideButton }
                  <TouchableOpacity
                    testID="addButton"
                    onPress={() => {
                      props.addToBasket(
                        JSON.parse(`{"weight":` + amountGrams + `,"foodObject":` + JSON.stringify(props.foodDetails.item) + "}")
                        );
                    }}
                    style={[
                      styles.shadowProp,
                      {
                        backgroundColor: "#00a46c",
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 15,
                        marginRight: 15,
                        marginTop: 15,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 26,
                        color: "#FFF",
                        textAlign: "center",
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
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
    displayInfo: {
      flex: 1,
      flexDirection: "row",
      marginHorizontal: 5,
      marginVertical: 5,
      borderRadius: 15,
      backgroundColor: "#ededed",
      paddingLeft: 5,
    },
    infoModal: {
      flex:1,
      marginTop: 200,
    },
    shadowProp: {
      shadowColor: "#171717",
      shadowOffset: { width: -4, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    searchBar: {
      backgroundColor: "#FFF",
      paddingVertical: 8,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      borderRadius: 15,
      marginTop: 25,
      flexDirection: "row",
      alignItems: "center",
    },
    searchButton: {},
    displayInfo: {
      flex: 1.2,
      flexDirection: "column",
      marginHorizontal: 5,
      marginVertical: 5,
      borderRadius: 15,
      backgroundColor: "#ededed",
      paddingLeft: 5,
      justifyContent:"space-around",
    },
    infoText: {
      fontSize:20,
      paddingLeft: 20
    }
});
export default FoodLogModal