import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Animated, Image, StyleSheet, Text, View, FlatList,TouchableOpacity, ImageBackground } from 'react-native';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore/lite';
import { ScrollView } from "react-native-gesture-handler";

import { getPosts } from "../utils/addPost";

const CommunityScreen = ({navigation}) => {    

    const user = getAuth();

    const [communities,setCommunity] = useState(null);
    const [communityIds, setCommunityId] = useState(null); 

    useEffect(() => {
        async function getData () {
          try {
            const communitiesCol = collection(db, "communities"); //challenges collection
            const communitiesSnapshot = await getDocs(communitiesCol); //gets all docs from the collection
            const communitiesData = communitiesSnapshot.docs.map(doc => doc.data());
            setCommunity(communitiesData);
            setCommunityId(communitiesData.map(community => community.communityId));
          } catch (error) {
            console.log(error); // handle error appropriately, e.g. display a message to the user
          }
        }
        getData();
      }, []);

    const Community = ({name,communityId,description,image}) => {
        return(
            <View style={styles.displayInfo}>
                <Text>{communityId}</Text>
                <Text>{description}</Text>
                <Image source={{uri:image}} style ={{width: '30%', height:100}}/>
                <TouchableOpacity onPress={() => renderCommunityFeed(communityId)} style= {styles.button}>
                    <Text style={styles.text}>View Community Feed</Text>
                </TouchableOpacity>

            </View>
        )
    };

    const separator = () => {
        return (<View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>)
    };

    const renderCommunityFeed = (communityId) => {

        navigation.replace('CommunityFeed', {communityId: communityId});
        console.log(communityId);
    };

    const renderCommunities = ({item}) => {
        return(<Community communityId={item.communityId} name={item.name} id={item.id} description={item.description} image={item.image} joined={item.joined}/>)
        
    };

    return(

        <View style={{flex:1}}>
            <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
            {communities && (<FlatList  keyExtractor={(item) => {item.communityId}} data={communities} ItemSeparatorComponent={separator} renderItem = {renderCommunities}/>)}
        </View>

    )


}

export default CommunityScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column", //column direction
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    progressBar: {
        height: 20,
        flexDirection: "row",
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    displayInfo : {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: '5%',
        marginVertical: '5%',
        borderWidth: 2,
        borderColor: "purple"
    },
    button:{
        backgroundColor:"#8cc5fa",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius:20,
        padding:15,
        marginVertical:5,
        borderWidth:1,
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
})