import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView, Modal, Touchable, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const FoodBasketScreen = props => {

    const nav = useNavigation();
    // verbose inside te
    let [food, setFood] = useState((props.route && props.route.params.currentBasket) || props.currentBasket)

    function handleRemove(o){
        let temp = [];

        for(let i = 0; i < food.length; i++){
            if(o != food[i]) temp.push(food[i])
        }

        setFood(temp);
    }

    console.log(props.route.params.currentBasket)

    function saveBasket(){
        console.log(food)
        DeviceEventEmitter.emit("event.saveBasket", JSON.stringify(food))
        nav.pop()
    }

    return (
        <View testID="basketList">
            { food && food.map((o) => o &&
                <View key={o.foodObject.Description}>
                    <Text>
                        {o.foodObject.Description}
                    </Text>
                    <Button testID={o.foodObject.Description + "button"} title="remove" onPress={()=>handleRemove(o)}/>
                </View>
            ) }

            <Button  testID="saveButton" title="save" onPress={saveBasket} />
        </View>
    )
}

export default FoodBasketScreen