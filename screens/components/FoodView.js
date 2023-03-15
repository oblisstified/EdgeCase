import {React, useState} from "react";
import 'react-native-gesture-handler';
import { Button, Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FoodLogModal from './FoodLogModal'

const FoodView = props => {

    

    const firstWord = props.foodDetails.item["Description"];
    const calories = props.foodDetails.item["Calories"];
    const protein = props.foodDetails.item["Protein"];

    return (
        <View style={styles.displayInfo}>
            <View style={{flex: 3, alignSelf: "flex-start"}}>
                <View><Text style={styles.header}>{ firstWord }</Text></View>
                <View><Text style={styles.details}>Calories: { calories }kcal, 
                                                    Protein: { protein }g
                                                    
                                                    
                </Text></View>
            </View>
            <View style={{flex:1}}>{ props.button }</View>
        </View>
    )
}

export default FoodView

const styles = StyleSheet.create({
    header: {
        paddingTop:5,
        marginHorizontal: 5
    },
    details: {
        fontSize: 8,
        opacity: 0.8,
        marginHorizontal: 5,
        paddingBottom: 5
    },
    displayInfo : {
        flex:1,
        flexDirection: "row",
        marginHorizontal: 2,
        marginVertical: 2,
        borderWidth: 2,
        borderRadius: 15,
    }

})

