import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Animated, StyleSheet, Text, View, FlatList,TouchableOpacity,Modal,Button } from 'react-native';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore/lite';
import BottomBar from './components/BottomBar'

const ChallengesViewScreen = ({navigation}) => {
    const user = getAuth().currentUser;
    
    const [challenges,setChallenges] = useState(null);
    const [profile,setProfile] = useState(null);
    const [completed,setCompleted] = useState(false);
    const [redeemedChallenges,setRedeemedChallenges] = useState([])

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
        }
        getData();
        }, []);

    const renderFriendsProgress = (type,challenge) => {
        let challengeInfo = `{
            "type":"${type}",
            "challenge": "${challenge}"
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
            x = profile.timesCalGoalHit;
        }
        else if(type.includes("recipe")){
            x = profile.recipes
        }
        else{
            x = profile.friends.length;
        }
        if(x>=goal){
            if(completed===true){
                if(profile.redeemed.includes(id)){
                    return(
                        <View>
                            <View style={styles.displayInfo}>
                                <Text>{challenge}</Text>
                                <View style={styles.progressBar}>
                                    <Animated.View style={([StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width: `100%`, alignItems: 'center',})}><Text style={{fontSize: 16,fontWeight: 'bold',letterSpacing: 2,color: 'white',}}>COMPLETED</Text></Animated.View>
                                </View>
                                <TouchableOpacity onPress={() => renderFriendsProgress(type,challenge)} style= {styles.button}>
                                    <Text style={styles.text}>View Friends Progress</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
                        </View>
                    )
                }else{
                    return(
                        <View>
                            <View style={styles.displayInfo}>
                                <Text>{challenge}</Text>
                                <View style={styles.progressBar}>
                                    <Animated.View style={([StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width: `100%`, alignItems: 'center',})}><Text style={{fontSize: 16,fontWeight: 'bold',letterSpacing: 2,color: 'white',}}>COMPLETED</Text></Animated.View>
                                </View>
                                <View style={{flexDirection: "row", justifyContent: 'center'}}>
                                    <TouchableOpacity onPress={() => redeem(id)} style= {styles.button}>
                                        <Text style={styles.text}>Redeem Medal</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => renderFriendsProgress(type,challenge)} style= {styles.button}>
                                        <Text style={styles.text}>View Friends Progress</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
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
                            <Text>{challenge}</Text>
                            <View style={styles.progressBar}>
                                <Animated.View style={([StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width: `${(x/goal)*100}%`})}/>
                            </View>
                            <Text>{x}/{goal}</Text>
                            <TouchableOpacity onPress={() => renderFriendsProgress(type,challenge)} style= {styles.button}>
                                <Text style={styles.text}>View Friends Progress</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 20, width: '100%', backgroundColor: '#C8C8C8'}}/>
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
        <View>
            <View style={{alignItems: "center",marginVertical: '5%',}}>
                <Text>These are your challenges</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: 'center'}}>
                <Button onPress={() => setCompleted(false)} title="Active"/>
                <Button onPress={() => setCompleted(true)} title="Completed"/> 
            </View>
            {challenges && (<FlatList data={challenges} contentContainerStyle={{ paddingBottom: 150 }} renderItem = {renderChallenges}/>)}
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