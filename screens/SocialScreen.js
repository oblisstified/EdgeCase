import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getAuth } from 'firebase/auth'
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const {width} = Dimensions.get('window'); 

const SocialScreen = ({navigation}) => {

    const user = getAuth();
    const [communitiesData,setCommunitiesData] = useState(null);


    return(
            <View style={{flex:0}}>
                <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
                
                    <TouchableOpacity style={styles.displayInfo} onPress={() => navigation.navigate('ChallengesViewScreen')}>
                    <Image source={{uri: "https://images.pexels.com/photos/6345328/pexels-photo-6345328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}} style = {{ width: '90%', height: 200 }}/>
                    <Text>Challenges & Achievements</Text>
                    </TouchableOpacity>
                    <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
                    <TouchableOpacity style={styles.displayInfo} onPress={() => navigation.replace("FriendsScreen")}>
                    <Image source={{uri: "https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}}style = {{ width: '90%', height: 200 }}/>
                    <Text>View Friends</Text>
                    </TouchableOpacity>
                    <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
                    <TouchableOpacity style={styles.displayInfo} onPress={() => navigation.navigate('CommunityScreen')}>
                    <Image source={{uri: "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}}style = {{ width: '90%', height: 200 }}/>
                    <Text>Communities</Text>
                    </TouchableOpacity>
                    
                    <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
            </View>
        
    );
}

export default SocialScreen


const styles = StyleSheet.create({
    displayInfo : {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: '5%',
        marginVertical: '5%',
        borderWidth: 2,
        borderColor: "purple"
    },
})