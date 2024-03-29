import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Animated, Image, StyleSheet, Text, View, FlatList,TouchableOpacity, SafeAreaView, ImageBackground, Button } from 'react-native';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore/lite';
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


import { getPosts } from "../utils/addPost";

const CommunityScreen = ({navigation}) => {    

    const user = getAuth();

    const [communities,setCommunity] = useState(null);
    const [communityIds, setCommunityId] = useState(null);
    const [communityDesc, setCommunityDesc] = useState(false);

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


    const handleDesc = () => setCommunityDesc(!communityDesc)

    const Community = ({name,communityId,description,image}) => {
        return (
            <View>
              <View style={styles.displayInfo}>
                <Text style={styles.postTitle}>{communityId}</Text>
                {communityDesc && <Text style={styles.content}>{description}</Text>}
                <Image source={{ uri: image }} style={{ width: '30%', height: 100 }} />
                <TouchableOpacity onPress={() => renderCommunityFeed(communityId)} style={styles.button}>
                  <Text style={styles.buttonText}>View Community Feed</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        };

    const renderCommunityFeed = (communityId) => {

        navigation.navigate('CommunityFeed', {communityId: communityId});
        console.log(communityId);
    };

    const renderCommunities = ({ item }) => {
        return (
          <Community
            communityId={item.communityId}
            name={item.name}
            id={item.id}
            description={item.description}
            image={item.image}
            joined={item.joined}
            renderCommunityFeed={renderCommunityFeed}
          />
        );
      };

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
        <Text style={{ fontSize: 28, color: "#FFF", fontWeight: "bold" }}>Community Page</Text>
        <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "normal" }}>
            Explore different communities
            </Text>
        <TouchableOpacity onPress={handleDesc}><Text style={{ fontSize: 20, color: "#FFF", fontWeight: "normal" }}>Show description</Text></TouchableOpacity>
        </View>
      
      </View>
      </SafeAreaView>
            
        <View style={{flex:0}}>
            {communities && (<FlatList  keyExtractor={(item) => {item.communityId}} data={communities} contentContainerStyle={{ paddingBottom: 150 }} renderItem = {renderCommunities}/>)}
        </View>
        </View>

    )


}

export default CommunityScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 60,
      marginBottom: 20,
      color: "#00a46c",
    },
    displayInfo: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: "5%",
      marginVertical: "5%",
      borderWidth: 2,
      borderColor: "#00a46c",
      padding: 16,
      backgroundColor: "#fff",
    },
    button: {
      backgroundColor: "#00a46c",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      padding: 16,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: "#00a46c",
    },
    postTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#00a46c",
      },
      content: {
        fontSize: 15,
        marginBottom: 10,
        color: "#00a46c",
        alignContent: "center",
        textAlign: "center",
      },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "#fff",
    },
    description: {
        fontSize: 15,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 1,
      marginBottom: 10,
      color: "#00a46c",
      },
  });
