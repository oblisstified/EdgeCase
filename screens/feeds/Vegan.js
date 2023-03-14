import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import BottomBar from "../components/BottomBar";
import { db } from "../../firebase";


function Vegan() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Get all posts for the "vegan" community
    const unsubscribe = collection(db, "posts")
      .where('communityId', '==', 'vegan')
      .onSnapshot((querySnapshot) => {
        const newPosts = [];
        querySnapshot.forEach((doc) => {
          newPosts.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setPosts(newPosts);
      });

    // Unsubscribe from snapshot listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>Vegan Community Feed</Text>
      {posts.map((post) => (
        <View key={post.id}>
          <Text>{post.content}</Text>
          <Text>{post.createdAt}</Text>
        </View>
      ))}
      <BottomBar />
    </View>
  );
}

export default Vegan;

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
});
