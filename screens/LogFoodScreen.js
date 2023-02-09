import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView, Modal } from 'react-native';
import BottomBar from "./components/BottomBar";
import { findFoodObjects } from "../utils/searcher";
import { TextInput } from "react-native-gesture-handler";

import FoodView from "./components/FoodView"
import FoodLogModal from "./components/FoodLogModal";

const LogFoodScreen = ({route, navigation}) => {

    let [searchValue, setSearchValue] = useState("") 
    let [matches, setMatches] = useState([]);
    let [modalVisible, setModalVisible] = useState(false)
    let [modalContent, setModalContent] = useState(null)


    function getMatches(){
        setMatches([])

        let myFoods = findFoodObjects(searchValue)
        
        let tempMatches = []

        for(let i = 0; i < 100 && i < myFoods.length; i++){

            // TODO: Write a custom component that takes a food object as an argument and renders it nicely
            tempMatches.push(<FoodView key={ myFoods[i]["Description"] } foodDetails={ myFoods[i] } 
                                        button= {<View style={{flexDirection:"row", flex:1, alignSelf: "center"}}>
                                                    <Button title='i' />
                                                    <Button title="Add" onPress={() => {setModalContent(myFoods[i]); setModalVisible(true)}} />
                                                </View>} />)
        }

        setMatches(tempMatches)
    }

    return(
        <View style={{flex:1, alignContent: "center", justifyContent: "center"}}>
            <Text>Food Screen</Text>
            <TextInput onChangeText={ (text) => {setSearchValue(text); getMatches()} } />
            <Button title="search" onPress={ getMatches } />
            <ScrollView>
                { matches }
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                <FoodLogModal foodDetails={modalContent} hideButton={<Button title="Hide Modal" onPress={() => {setModalVisible(false)}} />} />
            </Modal>


            <BottomBar />       
        </View>
    )

}


export default LogFoodScreen


const styles = StyleSheet.create({
})