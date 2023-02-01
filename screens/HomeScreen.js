import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = ({route, navigation}) => {
    const user = route.params.user;

    return(
        <View>
            <Text>Successful login</Text>
            <Text>Welcome {user.email}</Text>
        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
})