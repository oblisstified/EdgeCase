import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Animated, StyleSheet, Text, View, FlatList,TouchableOpacity,SafeAreaView,Button } from 'react-native';

import { db } from "../firebase";
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore/lite';

import BottomBar from './components/BottomBar'
import { getCalorieGoal, daysCalorieGoalMet, getSavedPresets } from '../utils/analytics'

const ChallengesViewScreen = ({navigation}) => {
    const user = getAuth().currentUser;
    
    const [dailyCalorieGoal, setDailyCalorieGoal] = useState(0)
    const [challenges,setChallenges] = useState(null);
    const [profile,setProfile] = useState(null);
    const [completed,setCompleted] = useState(false);

    const [redeemedChallenges,setRedeemedChallenges] = useState([]);
    const [timesCalGoalHit, setTimeCalGoalhit] = useState(0);
    const [numSavedRecipes, setNumSavedRecipes] = useState(0);
    const [numPostsMade, setNumPostsMade] = useState(0);

    let calories = -1;
    let goalHit = -1;
    let numRecipes = -1;


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
            setRedeemedChallenges(userData.redeemed);
            setNumPostsMade(userData.numPostsMade)

            // ugly pattern to prevent spurious reads
            if(calories == -1){
                calories = 0;
                calories = await getCalorieGoal(user.email)
            }
            setDailyCalorieGoal(calories);

            if (goalHit == -1) {
                goalHit = 0;
                goalHit = await daysCalorieGoalMet(user.email, 7);
            }
            setTimeCalGoalhit(goalHit);

            if (numRecipes == -1) {
                numRecipes = 0;
                numRecipes = await getSavedPresets(user.email)
            }
            setNumSavedRecipes(numRecipes)


        }
        getData();
        }, []);

    const renderFriendsProgress = (type,challenge,goal) => {
        let challengeInfo = `{
            "type":"${type}",
            "challenge": "${challenge}",
            "goal": "${goal}"
        }`;
        navigation.navigate("Leaderboard",{challengeInfo})
    };

    async function redeem(id){
        try {
            const userRef = doc(db, 'users', user.email);
            const updatedRedeemedList = [...redeemedChallenges, id];
            await updateDoc(userRef, { redeemed: updatedRedeemedList });
            setRedeemedChallenges(updatedRedeemedList);
          } 
          catch (error) {
            console.error(error);
          }
    }

    const Challenge = ({challenge,goal,type,id}) => {
        let x;
        if(type.includes("calorie")){
            x = timesCalGoalHit;
        }
        else if(type.includes("recipe")){
            x = numSavedRecipes
        }
        else if(type.includes("post")){
            x = numPostsMade
        }
        else if(type.includes("like")){
            x = profile.likedPosts.length
        }
        else{
            x = profile == undefined ? 0 : profile.friends.length;
        }
        if(x>=goal){
            if(completed===true){
                if(profile.redeemed.includes(id)){
                    return(
                        <View>
                            <View style={styles.displayInfo}>
                                <Text style={{fontSize: 18,fontWeight: 'bold',color: 'black',marginBottom: 10}}>{challenge}</Text>
                                <View style={styles.progressBar}>
                                    <Animated.View style={([StyleSheet.absoluteFill], {backgroundColor: "#00a46c", width: `100%`, alignItems: 'center',})}><Text style={{fontSize: 16,fontWeight: 'bold',letterSpacing: 2,color: 'white',}}>COMPLETED</Text></Animated.View>
                                </View>
                                <TouchableOpacity onPress={() => renderFriendsProgress(type,challenge,goal)} style= {styles.button}>
                                    <Text style={styles.text}>View Friends Progress</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }else{
                    return(
                        <View>
                            <View style={styles.displayInfo}>
                                <Text style={{fontSize: 18,fontWeight: 'bold',color: 'black',marginBottom: 10}}>{challenge}</Text>
                                <View style={styles.progressBar}>
                                    <Animated.View style={([StyleSheet.absoluteFill], {backgroundColor: "#00a46c", width: `100%`, alignItems: 'center',})}><Text style={{fontSize: 16,fontWeight: 'bold',letterSpacing: 2,color: 'white',}}>COMPLETED</Text></Animated.View>
                                </View>
                                <View style={{flexDirection: "row", justifyContent: 'center'}}>
                                    <TouchableOpacity onPress={() => redeem(id)} style= {styles.button}>
                                        <Text style={styles.text}>Redeem Medal</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => renderFriendsProgress(type,challenge,goal)} style= {styles.button}>
                                        <Text style={styles.text}>View Friends Progress</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }
            }
            else{return;}
        }
        else{
            if(completed===false){
                return(
                    <View>
                        <View style={styles.displayInfo}>
                            <Text style={{fontSize: 18,fontWeight: 'bold',color: 'black',marginBottom: 10}}>{challenge}</Text>
                            <View style={styles.progressBar}>
                                <Animated.View style={([StyleSheet.absoluteFill], {backgroundColor: "#00a46c", width: `${(x/goal)*100}%`})}/>
                            </View>
                            <Text style={styles.headerText}>{x} / {goal}</Text>
                            <TouchableOpacity onPress={() => renderFriendsProgress(type,challenge,goal)} style= {styles.button}>
                                <Text style={styles.text}>View Friends Progress</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            else{return;}
        }
    };

    const renderChallenges = ({item}) => {
        return(<Challenge challenge={item.challenge} goal={item.goal} type={item.type} id={item.id}/>)
    };

    return(
        <View style={styles.container}>
            <SafeAreaView 
        style={{
          backgroundColor: "#00a46c",
          height: "22%",
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
            These are your challenges
            </Text>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "normal" }}>
            Daily Calorie Goal: { dailyCalorieGoal.toString()}
            </Text>
          </View>

        </View>
      </SafeAreaView>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => setCompleted(false)} style={[styles.button, !completed && styles.buttonSelected]}>
                    <Text style={styles.buttonText}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCompleted(true)} style={[styles.button, completed && styles.buttonSelected]}>
                    <Text style={styles.buttonText}>Completed</Text>
                </TouchableOpacity>
            </View>
            {challenges && (<FlatList data={challenges} contentContainerStyle={{ paddingBottom: 150 }} renderItem = {renderChallenges}/>)}
        </View>
    )
}

export default ChallengesViewScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        alignItems: "center",
        marginVertical: '5%',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00a46c',
        marginBottom: 10,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#00a46c',
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonSelected: {
        backgroundColor: '#007d4a',
    },
    displayInfo: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: '5%',
        marginVertical: '5%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    progressBar: {
        height: 20,
        flexDirection: "row",
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#00a46c',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    challengeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
});


