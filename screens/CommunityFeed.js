import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/firestore';
import { Animated, Image, StyleSheet, Text, View, FlatList,TouchableOpacity, ImageBackground } from 'react-native';
import BottomBar from "./components/BottomBar";
import { db } from "./../firebase";
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';




const CommunityFeed = ({route, navigation }) => {

  const [posts, setPosts] = useState([]);

  const communityId = route.params.communityId;

  useEffect(() => {
    async function getData () {
    // Get all posts for the specified community

    const postsQuery =  query(
        collection(db, 'posts'),
        where('communityId', '==', communityId),
    );
    const postsRef = await getDocs(postsQuery)
    const allPosts = postsRef.docs.map(doc => doc.data());

    /* const postCol = doc(db, "posts", communityId)
    const postSnapshot = await getDoc(postCol)
    const postList = postSnapshot.docs.map(doc => doc.data()); */
    setPosts(allPosts);
    console.log(communityId);
    console.log(postList);
    }

    getData();
  }, []);
      

  return (
    <View>
      <Text>{communityId} Feed</Text>
      {posts.map((post) => (
        <View key={post.id}>
          <Text>{post.userId}</Text>
          <Text>{post.content}</Text>
          <Text>{post.createdAt}</Text>
        </View>
      ))}
      <BottomBar />
    </View>
  );
}

export default CommunityFeed;
