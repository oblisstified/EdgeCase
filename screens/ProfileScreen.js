import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button, ScrollView,TouchableOpacity,SafeAreaView,FlatList } from "react-native";
import BottomBar from "./components/BottomBar";
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore/lite";

const ProfileScreen = ({ route, navigation }) => {
  const user = getAuth().currentUser;

  const [userData, setUser] = useState({});
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    async function getData() {
      const userRef = doc(db, "users", user.email);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      setUser(userData);

      try{
        // pull relevant references
        let thisUserPostList = [];
        let postRef = doc(db, 'posts', "postList");
        const postSnapshot = await getDoc(postRef);
        const data = postSnapshot.data();
        let allPosts = await data.posts;

        for(let i = 0; i < allPosts.length; i++){
            if(allPosts[i]["post"]["email"] == user.email){
                thisUserPostList.push(allPosts[i]);
            }
        }
        setPostsList(thisUserPostList);

    } catch (e) {
        console.log(e)
    }
    }

    getData();
  }, []);

  function CustomText(props) {
    return <Text style={styles.textStyle}>{props.children}</Text>;
  }
  
  return (
    <View style = {{flex:1}}>
    <SafeAreaView 
        style={{
          flex:0.3,
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
             My profile
            </Text>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "normal" }}>
             check me out
            </Text>
          </View>

        </View>
      </SafeAreaView>
        <View  testID = "scrollView">
                <View  style={{alignItems: "center" }}>
                    <FontAwesome style={{padding:10}} name = "user-circle-o" size = {150} color={"#00a46c"} />
                </View>
                <View style = {{flexDirection : 'row', justifyContent: 'space-between',padding:10, marginHorizontal: 100}}>
                    <View>
                        <Text>Name </Text>
                        <Text>{userData.name == undefined ? "loading...": userData.name}</Text>
                    </View>
                    <View>
                        <Text>Posts </Text>
                        <Text>{postsList.length == undefined ? "loading..." : postsList.length}</Text>
                    </View>
                    <View>
                        <Text>Friends </Text>
                        <Text>{userData.friends == undefined ? "loading...": userData.friends.length}</Text>
                    </View>
 
                </View>
          
      </View > 
    <View style={styles.buttonGroup}>
    <TouchableOpacity
         style={styles.button}
        testID = "editProfile"
        onPress={() => navigation.navigate("EditProfileScreen")
      }>
         <Text
      style={styles.buttonText}
    >
      Edit Profile
    </Text>
    </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate("MedalsScreen")} style={styles.button}>
                    <Text style={styles.buttonText}>View Achievements</Text>
                </TouchableOpacity>
            </View>
      
        <FlatList     style = {{flex:0.5}}
                    data={ postsList }
                    keyExtractor={(post) => post.content}
                    renderItem={(post) =>
                    (<View key={post.id} style={styles.post}>
                        {console.log(JSON.stringify(post.item.post))}
                        <Text style={styles.username}>{post.item.post.email}</Text>
                        <Text style={styles.heading}>{post.item.post.title}</Text>
                        <Text style={styles.content}>{post.item.post.content}</Text>
                        <Text style={styles.time}>{post.item.post.date}</Text>
              </View>)}
          />
   
   
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  displayInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 30,
    minHeight: 50,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "purple",
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
  textStyle :{
    color:"white",

},
heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  post: {
    flexDirection: 'column',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    },
});
