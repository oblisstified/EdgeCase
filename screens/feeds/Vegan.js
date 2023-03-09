import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"
import BottomBar from '/Users/ahmedkafi/SEG/EdgeCase 22.12.21/screens/components/BottomBar.js'
import firebase from 'firebase/app';
import 'firebase/firestore';



const Vegan = ({navigation}) => {

    const user = getAuth();

    const [communities,setCommunity] = useState(null);

    useEffect(() => {
        async function getData () {
          try {
            const communitiesCol = collection(db, "communities"); //challenges collection
            const communitiesSnapshot = await getDocs(communitiesCol); //gets all docs from the collection
            const communitiesData = communitiesSnapshot.docs.map(doc => doc.data());
            setCommunity(communitiesData);
          } catch (error) {
            console.log(error); // handle error appropriately, e.g. display a message to the user
          }
        }
        getData();
      }, []);


        const separator = () => {
            return (<View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>)
        };

        const renderPosts = ({item}) => {
            return(<Community posts={item.posts}/>)
        };


        return(
            <View>
                <View style={{alignItems: "center",marginVertical: '5%',}}>
                    <Text>Here is the vegan feed</Text>
                </View>
                {communities && (<FlatList data={communities} ItemSeparatorComponent={separator} renderItem = {renderPosts}/>)}
                <BottomBar navigation={navigation}/>        
            </View>
        )
    };

    export default Vegan

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