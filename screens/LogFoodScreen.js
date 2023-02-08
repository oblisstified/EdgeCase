import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import BottomBar from "./components/BottomBar";
import { findFoodObjects } from "../utils/searcher";
import { TextInput } from "react-native-gesture-handler";

const LogFoodScreen = ({route, navigation}) => {

    let [searchValue, setSearchValue] = useState("") 
    let [matches, setMatches] = useState([]);


    function getMatches(){
        setMatches([])

        let myFoods = findFoodObjects(searchValue)
        
        let tempMatches = []

        for(let i = 0; i < 100 && i < myFoods.length; i++){

            // TODO: Write a custom component that takes a food object as an argument and renders it nicely
            tempMatches.push(<View key={ myFoods[i]['Description'] }><Text>{myFoods[i]["Description"]}</ Text></ View>)
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
            <BottomBar />       
        </View>
    )

}

export default LogFoodScreen


const styles = StyleSheet.create({
})