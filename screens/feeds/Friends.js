import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"

const Friends = ({navigation}) => {

    const user = getAuth();

    return (
        <view>
            <Text>Friends Feed</Text>
        </view>
    );
}

export default Friends