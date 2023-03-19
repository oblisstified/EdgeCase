import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, TouchableOpacity,FlatList } from 'react-native';
import {Slider} from 'react-native-elements';
import BottomBar from "./components/BottomBar";
import {Directions, TextInput } from "react-native-gesture-handler";
import { getAuth } from 'firebase/auth'
import { db } from "../firebase";
import {ref, set,onValue,child ,get} from  'firebase/database';
import { collection, getDocs,updateDoc,doc,getDoc} from 'firebase/firestore/lite';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BazierLineChart from "./components/Graph";
// import { getDataArray } from './utils/analytics'


const AnalyticsScreen = ({route, navigation}) => {

    const user = getAuth().currentUser;
    let [currentField, setCurrentField] = useState("Protein")
   
    function changeField(field){
        setCurrentField(field);
    }
    


    return(
        <View>
        <View style = {{padding:40}}>
            <Text>You have friends</Text>
            <Text>Friends:</Text>
            <BazierLineChart field = {currentField}/>
          
        </View>
        <View>
            <Text> </Text>
        </View>
        <View style = {{  flexWrap: 'wrap', flexDirection:"row"}}>
            <TouchableOpacity style={styles.userItem} onPress={(I) => changeField("Calories")}>
                <Text>Calories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userItem} onPress={() => changeField("Protein")}  >
                <Text>Protein</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userItem} onPress={() => changeField("Sugar")}  >
                <Text>Sugar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userItem} onPress={() => changeField("Carbohydrate")}  >
                <Text>Carbs</Text>
            </TouchableOpacity>

        </View>
  
        
        </View>
    )
}

export default AnalyticsScreen;


const styles = StyleSheet.create({
    displayInfo : {
        flex:1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30,
        marginVertical: 30,
        minHeight: 50,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "black",
        backgroundColor:"#8cc5fa"
    },
    textStyle :{
        color:"white",


    },
    userItem:{
        flexDirection:"row",
        padding:30,
        margin:20,
        borderWidth:1,
        borderRadius:10,
        justifyContent:"space-between",
    },
    Button:{
        padding:10,
       
    }
})