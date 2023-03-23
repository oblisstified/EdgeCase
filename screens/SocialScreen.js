import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getAuth } from 'firebase/auth'
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const {width} = Dimensions.get('window'); 

const SocialScreen = ({navigation}) => {

    const user = getAuth();
    const [communitiesData,setCommunitiesData] = useState(null);


    return(
        <View style={styles.container}>
             <SafeAreaView 
        style={{
          backgroundColor: "#00a46c",
          height: "20%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginLeft: 15,
            marginTop: 15
          }}
        >
          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 28, color: "#FFF", fontWeight: "bold" }}>
                Social Page
            </Text>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "normal" }}>
            Explore your challenges, friends and communites
            </Text>
          </View>

        </View>
      </SafeAreaView>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity style={styles.displayInfo} onPress={() => navigation.navigate('ChallengesViewScreen')}>
                <Image source={{uri: "https://www.incimages.com/uploaded_files/image/1920x1080/shutterstock_781606792_360874.jpg"}} style = {styles.image}/>
                <Text style={styles.text}>Challenges & Achievements</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.displayInfo} onPress={() => navigation.navigate("FriendsScreen")}>
                <Image source={{uri: "https://c0.wallpaperflare.com/preview/199/255/728/friendship-group-outside-activity.jpg"}} style = {styles.image}/>
                <Text style={styles.text}>View Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.displayInfo} onPress={() => navigation.navigate('CommunityScreen')}>
                <Image source={{uri: "https://static.vecteezy.com/system/resources/thumbnails/001/825/389/small_2x/happy-friendship-day-diverse-friend-group-of-people-special-event-celebration-free-vector.jpg"}} style = {styles.image}/>
                <Text style={styles.text}>Communities</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    
);
}

export default SocialScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        marginBottom: '10%',
    },
    displayInfo: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: '5%',
        marginVertical: '5%',
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#00a46c',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: "calibri",
        color: 'white',
        marginTop: 10,
    },
});