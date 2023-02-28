import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Animated, StyleSheet, Text, View, FlatList,TouchableOpacity,Modal,Button } from 'react-native';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';
import BottomBar from './components/BottomBar'

const ChallengesViewScreen = ({navigation}) => {
    const user = getAuth().currentUser;
    
    const [challenges,setChallenges] = useState(null);
    const [profile,setProfile] = useState(null);
    let [modalVisible, setModalVisible] = useState(null)


    useEffect(() => {
        async function getData () {
            const userRef = doc(db, 'users', user.email);
            const challengesCol = collection(db, "challenges"); //challenges collection
            const userSnapshot = await getDoc(userRef);
            const challengesSnapshot = await getDocs(challengesCol); //gets all docs from the collection
            const userData = userSnapshot.data();
            const challengesData = challengesSnapshot.docs.map(doc => doc.data());
            setProfile(userData);
            setChallenges(challengesData);
        }
        getData();
        }, []);

    const renderFriendsProgress = (index,challenge) => {
        let challengeInfo = `{
            "id":"${index}",
            "challenge": "${challenge}"
        }`;
        navigation.navigate("Leaderboard",{challengeInfo})
    };

    const Challenge = ({challenge,goal,index}) => {
        let x;
        if(index.includes("calorie")){
            x = profile.timesCalGoalHit;
        }
        else if(index.includes("recipe")){
            x = profile.recipes
        }
        else{
            x = profile.steps
        }
        return(
            <View style={styles.displayInfo}>
                <Text>{challenge}</Text>
                <View style={styles.progressBar}>
                    <Animated.View style={([StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width: `${(x/goal)*100}%`})}/>
                </View>
                <Text>{x}/{goal}</Text>
                <TouchableOpacity onPress={() => renderFriendsProgress(index,challenge)} style= {styles.button}>
                    <Text style={styles.text}>View Friends Progress</Text>
                </TouchableOpacity>
            </View>
        )
    };

    const renderChallenges = ({item}) => {
        return(<Challenge challenge={item.challenge} goal={item.goal} index={item.id}/>)
    };

    const separator = () => {
        return (<View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>)
    };

    return(
        <View>
            <View style={{alignItems: "center",marginVertical: '5%',}}>
                <Text>These are your challenges</Text>
            </View>
            {challenges && (<FlatList data={challenges} ItemSeparatorComponent={separator} renderItem = {renderChallenges}/>)}
            <BottomBar navigation={navigation}/>        
        </View>
    )
}

export default ChallengesViewScreen

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