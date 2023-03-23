import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth'
import { collection, query, getDoc, doc, where,getDocs } from 'firebase/firestore/lite';
import BottomBar from './components/BottomBar'
import { useRoute } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';

const Leaderboard = ({navigation}) => {
    const user = getAuth().currentUser;
    const route = useRoute();
    const challengeI = JSON.parse(route.params.challengeInfo);
    const challengeType = challengeI.type;
    const challengeDesc = challengeI.challenge
    const challengeGoal = challengeI.goal

    const [allUsers,setAllUsers] = useState(null);
    const headers = ['Position','Name','Score']

    useEffect(() => {
        async function getData () {
            const userSnapshot = await getDoc(doc(db, 'users', user.email));
            const userData = [userSnapshot.data()];

            const allUsersQuery =  query(
                collection(db, 'users'),
                where('friends', 'array-contains', user.email),
            );

            const allUsersRef = await getDocs(allUsersQuery)
            const allUser = allUsersRef.docs.map(doc => doc.data());
            const users = [...userData,...allUser];
            const sortedArr = sortByChallengeType(users);
            setAllUsers(sortedArr);
        }
        getData();
        }, []);

        function sortByChallengeType(allUsers){
            let copy = [...allUsers];
            let x;
            if(challengeType.includes("calorie")){
                x =  copy.sort((a, b) => b.timesCalGoalHit - a.timesCalGoalHit);
                let position = 1
                return x.map(person => {
                    if(person.timesCalGoalHit >= challengeGoal){
                        return [position++,person.name,"Completed"]
                    }
                    return [position++,person.name,person.timesCalGoalHit]
                })
            }
            else if(challengeType.includes("recipe")){
                x =  copy.sort((a, b) => b.recipes - a.recipes);
                let position = 1
                return x.map(person => {
                    if(person.recipes >= challengeGoal){
                        return [position++,person.name,"Completed"]
                    }
                    return [position++,person.name,person.recipes]
                })
            }
            else{
                x =  copy.sort((a, b) => b.friends.length - a.friends.length);
                let position = 1
                return x.map(person => {
                    if(person.friends.length >= challengeGoal){
                        return [position++,person.name,"Completed"]
                    }
                    return [position++,person.name,person.friends.length]
                })            
            }
        };

        return(
            <View style={styles.container}>
                <SafeAreaView 
        style={{
          backgroundColor: "#00a46c",
          height: "15%",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginTop: 15,
            alignItems: "center",
          justifyContent:"center"
          }}
        >
          <Text style={styles.title}>This is the leaderboard</Text>
          <Text style={styles.subtitle}>{challengeDesc}</Text>

        </View>
      </SafeAreaView>
                <Table borderStyle={styles.tableBorder}>
                    <Row data={headers} style={styles.head} textStyle={styles.headText} />
                    <Rows data={allUsers} textStyle={styles.text} />
                </Table>
            </View>
        )
}

export default Leaderboard

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
        color: 'white',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    tableBorder: {
        borderWidth: 2,
        borderColor: '#00a46c',
    },
    head: {
        height: 44,
        backgroundColor: '#00a46c',
    },
    headText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        textAlign: 'center',
    },
});