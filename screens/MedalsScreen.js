import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Image, StyleSheet, Text, View, FlatList,TouchableOpacity,Modal,Button } from 'react-native';
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
                    <Text>{challenge}</Text>
                </View>
            </View>
        )
    };

    const renderMedals = ({item}) => {
        return(<Medal challenge={item.challenge} medal={item.medal}/>)
    };

    const separator = () => {
        return (<View style={{height: 5, width: '100%', backgroundColor: '#C8C8C8'}}/>)
    };

    return(
        <View>
            <View style={{alignItems: "center",marginVertical: '5%',}}>
                <Text>These are your medals</Text>
            </View>
            {completedChallenges && (<FlatList data={completedChallenges} ItemSeparatorComponent={separator} renderItem = {renderMedals}/>)}
        </View>
    )
}

export default MedalsScreen


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
        flexDirection: "row", 
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