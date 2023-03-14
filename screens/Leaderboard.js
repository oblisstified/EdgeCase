import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, FlatList} from 'react-native';
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
                return x.map(person => [position++,person.name,person.timesCalGoalHit])
            }
            else if(challengeType.includes("recipe")){
                x =  copy.sort((a, b) => b.recipes - a.recipes);
                let position = 1
                return x.map(person => [position++,person.name,person.recipes])
            }
            else{
                x =  copy.sort((a, b) => b.steps - a.steps);
                let position = 1
                return x.map(person => [position++,person.name,person.steps])
            }
        };

    return(
        <View>
            <View style={{alignItems: "center",marginVertical: '5%',}}>
                <Text>This is the leaderboard</Text>
                <Text>{challengeDesc}</Text>
            </View>
            <Table borderStyle={{ borderWidth: 4, borderColor: 'teal' }}>
                <Row data={headers} style={styles.head} textStyle={styles.headText} />
                <Rows data={allUsers} textStyle={styles.text} />
            </Table>
            <BottomBar navigation={navigation}/>      
        </View>
    )
}

export default Leaderboard

const styles = StyleSheet.create({
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
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
      head: { height: 44, backgroundColor: 'darkblue' },
      headText: { fontSize: 20, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
})