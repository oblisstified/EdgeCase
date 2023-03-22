import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/firestore';
import { Animated, Image, StyleSheet, Text, View, FlatList,TouchableOpacity, ImageBackground } from 'react-native';
import { db } from "./../firebase";
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';


import { getPosts } from '../utils/addPost';


const CommunityFeed = ({route, navigation }) => {

  const [posts, setPosts] = useState([]);

  const communityId = route.params.communityId;
  const user = getAuth().currentUser;

  useEffect(() => {
    async function getData () {
      let communityPosts = await getPosts(communityId);
      setPosts(communityPosts);
    }

    getData();
  }, []);
      
  const onPressAddPost = () => {
    navigation.replace('WritePost', { communityId });
};


  return (
    <View style={styles.container}>
        
    <View>
        <Text style={styles.heading}>{communityId} Feed</Text>

        <TouchableOpacity style={styles.addButton} onPress={onPressAddPost}>
        <Text style={styles.addButtonText}>Add Post</Text>
        </TouchableOpacity>
          <FlatList
            data={ posts }
            keyExtractor={(post) => post.content}
            renderItem={(post) =>
              (<View key={post.id} style={styles.post}>
                {console.log(JSON.stringify(post.item.post))}
                <Text style={styles.username}>{post.item.post.email}</Text>
                <Text style={styles.postHeading}>{post.item.post.title}</Text>
                <Text style={styles.content}>{post.item.post.content}</Text>
                <Text style={styles.time}>{post.item.post.date}</Text>
              </View>)}
          />
    </View>
    </View>
  );
}

export default CommunityFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  heading: {
    marginTop: 35,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#00a46c",
  },
  post: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#00a46c",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  addButton: {
    backgroundColor: "#00a46c",
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})