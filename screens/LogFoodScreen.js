import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import BottomBar from "./components/BottomBar";

const LogFoodScreen = ({route, navigation}) => {
    return(
        <View style={{flex:1, alignContent: "center", justifyContent: "center"}}>
            <Text>Food Screen</Text>

            <BottomBar props={navigation}/>       
        </View>
    )

}

export default LogFoodScreen


const styles = StyleSheet.create({
})