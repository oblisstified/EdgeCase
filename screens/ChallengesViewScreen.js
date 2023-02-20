import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { Animated, StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from "../firebase";
import { collection, getDocs,updateDoc,doc,getDoc} from 'firebase/firestore/lite';
import BottomBar from './components/BottomBar'

const ChallengesViewScreen = ({navigation}) => {
    const route = useRoute();

    const challengesIndex = (JSON.parse(route.params.challenges)).id;

    const [challenges,setChallenges] = useState(null);

    useEffect(() => {
        async function getData () {
            let col;
            if(challengesIndex == 1){col = "daily-challenges"}
            else{col = "social-challenges"}
            const challengeCol = collection(db, col); //user collection
            const challengeSnapshot = await getDocs(challengeCol); //gets all docs from the collection
            const challengeData = challengeSnapshot.docs.map(doc => doc.data());
            setChallenges(challengeData);
        }
        getData();
      }, []);

    const Challenge = ({challenge,goal}) => {
        return(
            <View style={styles.displayInfo}>
                <Text>{challenge}</Text>
                <View style={styles.progressBar}>
                    <Animated.View style={([StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width: "50%"})}/>
                </View>
                <Text>0/{goal}</Text>
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
            <View>
                {challenges && (<FlatList data={challenges} ItemSeparatorComponent={separator} renderItem = {renderChallenges}/>)}
            </View>
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
    }
})