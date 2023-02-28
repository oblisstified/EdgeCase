import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView, Modal, Touchable, TouchableOpacity } from 'react-native';

const FoodBasketScreen = props => {

    let basket = JSON.parse(props.route.params.currentBasket)

    let [foodList, setFoodList] = useState()
    
    let ingredientList = [];

    for(let i = 0; i < basket.length; i++){
        ingredientList.push(JSON.parse(basket[i]))
    }

    console.log(ingredientList)

    return (
        <View>
            { ingredientList.map((o) => <Text>{ o.weight } grams of { o["foodObject"]["Description"] }</Text>) }
        </View>
    )
}

export default FoodBasketScreen