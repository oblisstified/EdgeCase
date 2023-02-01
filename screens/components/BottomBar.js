import React from "react";
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BottomBar = () =>{
    const navigation = useNavigation();

    return(
        <View style={styles.bottombar}>
            <Button title="Log food" onPress={() => navigation.replace("LogFoodScreen")} />
            <Button title="View Profile" onPress={() => navigation.replace("ProfileScreen")} />
        </View>
    );
}

export default BottomBar

const styles = StyleSheet.create({
    bottombar: {
        flexGrow: 1,
        alignSelf: "flex-start",
        width: "100%",
        height: 10,
        borderTopWidth: 5,
    }
})