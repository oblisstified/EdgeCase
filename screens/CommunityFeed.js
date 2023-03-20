import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/firestore';
import { Animated, Image, StyleSheet, Text, View, FlatList,TouchableOpacity, ImageBackground } from 'react-native';
import BottomBar from "./components/BottomBar";
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
    navigation.navigate('WritePost', { communityId });
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
                <Text style={styles.heading}>{post.item.post.title}</Text>
                <Text style={styles.content}>{post.item.post.content}</Text>
                <Text style={styles.time}>{post.item.post.date}</Text>
              </View>)}
          />
    </View>
    <BottomBar />
    </View>
  );
}

export default CommunityFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    fontSize: 14,
    marginBottom: 10,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})