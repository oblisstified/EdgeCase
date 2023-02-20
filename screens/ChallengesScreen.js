import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getAuth } from 'firebase/auth'
import BottomBar from './components/BottomBar'
import { Dimensions } from "react-native";
const {width} = Dimensions.get('window'); 

const ChallengesScreen = ({navigation}) => {

    const user = getAuth();
    const [communitiesData,setCommunitiesData] = useState(null);

    // const viewCommunity = (index) => {
    //     let community = `{"id": "${index}"}`
    //     navigation.navigate('CommunityViewScreen',{community})
    // }

    // const Community = ({image,description,index}) => {
    //     return(
    //     <View style={styles.displayInfo}>
    //         <TouchableOpacity onPress={() => viewCommunity(index)}>
    //         <Image source={{uri: image}} style = {{ width: '90%', height: 200 }}/>
    //         <Text>{description}</Text>
    //         </TouchableOpacity>
    //     </View>
    //     )
    // };

    // const renderCommunities = ({item}) => {
    //     return(
    //     <Community image ={item.image} description={item.description} index={item.id}/>
    //     )
    // };

    // const separator = () => {
    //     return (<View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>)
    //   };

    const viewChallenges = (index) => {
        let challenges = `{"id": "${index}"}`
        navigation.navigate('ChallengesViewScreen',{challenges})
    }

    return(
        <View >
            <View>
                <Text>These are your communities ... </Text>
                <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
                {/* {communitiesData && (<FlatList data={communitiesData} ItemSeparatorComponent={separator} renderItem = {renderCommunities}/>)} */}
                    <TouchableOpacity style={styles.displayInfo} onPress={() => viewChallenges(1)}>
                    <Image source={{uri: "https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}} style = {{ width: '90%', height: 200 }}/>
                    <Text>Daily Challenges</Text>
                    </TouchableOpacity>
                    <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
                    <TouchableOpacity style={styles.displayInfo} onPress={() => viewChallenges(2)}>
                    <Image source={{uri: "https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}}style = {{ width: '90%', height: 200 }}/>
                    <Text>Social Challenges</Text>
                    </TouchableOpacity>
            </View>
            <BottomBar navigation={navigation}/>     
        </View>
    );
}

export default ChallengesScreen


const styles = StyleSheet.create({
    displayInfo : {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: '5%',
        marginVertical: '5%',
        borderWidth: 2,
        borderColor: "purple"
    }
})