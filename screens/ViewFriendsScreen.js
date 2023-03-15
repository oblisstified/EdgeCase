import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Animated, StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore/lite';
import BottomBar from './components/BottomBar'

const ViewFriendsScreen = ({navigation}) => {   
    const user = getAuth().currentUser; 
    const [friends,setFriends] = useState(null);
    const [numFriends, setNumFriends] = useState(null);

    useEffect(() => {
        async function getData () {

            const userCol = collection(db, "users", user.email); //users collection
            const userSnapshot = await getDocs(userCol); //gets all docs from the collection
            const userData = userSnapshot.docs.map(doc => doc.data());
            const friendsNumber = userData.friends
            setFriends(userData);
            setNumFriends(friendsNumber.length)
        }
        getData();
        }, []);

    const renderFriendsProgress = (index) => {
        console.log(index)
    };

    const User = ({friends}) => {
        return(
            <View style={styles.displayInfo}>
                <Text>{friends}</Text>
            </View>
        )
    };

    const renderFriends = ({item}) => {
        return(<User friends={item.friends}/>)
    };

    const separator = () => {
        return (<View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>)
    };

    return(
        <View>
            <View style={{alignItems: "center",marginVertical: '5%',}}>
                <Text>You have {setNumFriends} friends</Text>
                <Text>These are your friends</Text>
            </View>
            {friends && (<FlatList data={friends} ItemSeparatorComponent={separator} renderItem = {renderFriends}/>)}
            <BottomBar navigation={navigation}/>        
        </View>
    )
}

export default ViewFriendsScreen

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