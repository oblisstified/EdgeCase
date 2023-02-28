import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView, Modal, Touchable, TouchableOpacity } from 'react-native';
import BottomBar from "./components/BottomBar";
import { findFoodObjects } from "../utils/searcher";
import { TextInput } from "react-native-gesture-handler";

import FoodView from "./components/FoodView"
import FoodLogModal from "./components/FoodLogModal";
import { useNavigation } from "@react-navigation/native";

const LogFoodScreen = () => {
    const nav = useNavigation();

    let [searchValue, setSearchValue] = useState("") 
    let [matches, setMatches] = useState([]);
    let [modalVisible, setModalVisible] = useState(false)
    let [modalContent, setModalContent] = useState(null)

    let [basket, setBasket] = useState([]);


    async function addToBasket(food){
        let temp = []
        
        for(let i = 0; i < basket.length; i++){ 
            temp.push(basket[i]);
        }
        
        temp.push(food)
        await setBasket(temp)

        console.log(basket.length)
        
    }


    function getMatches(){
        
        setMatches([])

        let myFoods = findFoodObjects(searchValue)
        let tempMatches = []

        for(let i = 0; i < 100 && i < myFoods.length; i++){
            // passes a food object to display, along with a button to show the modal on this screen
            tempMatches.push(<FoodView key={ myFoods[i]["Description"] } foodDetails={ myFoods[i] } 
                                        // these buttons are rendered in the FoodView component
                                        button= {<View style={{flexDirection:"row", flexGrow:2, alignItems:"space-between", alignSelf: "center"}}>
                                                    <Button title='i' />
                                                    <Button title="Add" onPress={() => {setModalContent(myFoods[i]); setModalVisible(true)}} />
                                                </View>} />)
        }

        setMatches(tempMatches)
    }

    return(
        <View style={{flex:1, alignContent: "center", justifyContent: "center"}}>

            {/* search bar */}
            <Text>Food Screen</Text>
            <TextInput testID="foodSearchBar" onChangeText={ (text) => {setSearchValue(text); getMatches()} } />
            <Button testID="foodSearch" title="search" onPress={ getMatches } />
            <Button title="View Basket" onPress={() => nav.push("FoodBasketScreen", {currentBasket: JSON.stringify(basket)})} />

            {/* list of matches */}
            <ScrollView>
                <View testID="foodResultList">{ matches }</View>
            </ScrollView>

            {/* popup allowing foodLogging */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                
                <FoodLogModal 
                    foodDetails={modalContent} 
                    hideButton={ <Button title="Hide Modal" onPress={() => {setModalVisible(false)}} /> }
                    addToBasket={(f) => addToBasket(f)}
                    />
            </Modal>


            <BottomBar />       
        </View>
    )

}


export default LogFoodScreen


const styles = StyleSheet.create({
})