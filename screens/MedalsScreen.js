import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Image, StyleSheet, Text, View, FlatList,SafeAreaView,Modal,Button } from 'react-native';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getDoc, doc, query,where } from 'firebase/firestore/lite';
import BottomBar from './components/BottomBar'

const MedalsScreen = ({navigation}) => {
    const user = getAuth().currentUser;
    
    const [completedChallenges,setCompletedChallenges] = useState(null);

    useEffect(() => {
        async function getData () {
            const userRef = doc(db, 'users', user.email);
            const userSnapshot = await getDoc(userRef);
            const userData = userSnapshot.data();


            const usersMedalsQuery =  query(
                collection(db, 'challenges'),
                where('id', 'in', userData.redeemed),
            );

            const usersMedalsRef = await getDocs(usersMedalsQuery)
            const usersMedals = usersMedalsRef.docs.map(doc => doc.data());

            setCompletedChallenges(usersMedals);
        }
        getData();
        }, []);

    const Medal = ({challenge,medal}) => {
        return(
            <View>
                <View style={styles.displayInfo}>
                    <Image source={{uri: medal}} style = {{ width: '30%', height: 150 }}/>
                    <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>{challenge}</Text>
                </View>
            </View>
        )
    };

    const renderMedals = ({item}) => {
        return(<Medal challenge={item.challenge} medal={item.medal}/>)
    };

    const separator = () => {
        return (<View style={{height: 5, width: '100%', backgroundColor: '#e6e6e6'}}/>)
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
            <Text style={{ fontSize: 28, color: "#FFF", fontWeight: "bold" }}>
                These are your medals
            </Text>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "normal" }}>
                Complete more challenges to unlock more medals
            </Text>
          </View>

        </View>
      </SafeAreaView>
            {completedChallenges && (<FlatList data={completedChallenges} ItemSeparatorComponent={separator} renderItem = {renderMedals}/>)}
        </View>
    )
}

export default MedalsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        alignItems: "center",
        marginVertical: '5%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00a46c',
    },
    displayInfo : {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: '5%',
        marginVertical: '5%',
        borderWidth: 2,
        borderColor: "#00a46c",
        borderRadius: 8,
        padding: 8,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
});