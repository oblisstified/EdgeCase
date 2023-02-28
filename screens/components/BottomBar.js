import React from "react";
import 'react-native-gesture-handler';
import { Button, Dimensions, StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;


const BottomBar = () =>{
    const navigation = useNavigation();

    return(
        <View style={styles.bottombar}>
               {/* these widgets should be changed in order to look nicer */}
                <Button title="Log food" onPress={() => navigation.replace("LogFoodScreen")} />
                <Button title="View Profile" onPress={() => navigation.replace("ProfileScreen")} />
                <Button title="Home" onPress={() => navigation.replace("HomeScreen")} />
                <Button title = "Add Friends" onPress={() => navigation.replace("AllUsersScreen")} />
        </View>
    );
}

export default BottomBar

const styles = StyleSheet.create({

    bottombar: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: 'absolute',
        height: 40,
        left: 0, 
        top: WINDOW_HEIGHT - 160, 
        width: "100%",
    }
})