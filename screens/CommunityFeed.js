import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/firestore';
import { Animated, Image, StyleSheet, Text, View, FlatList,TouchableOpacity, ImageBackground } from 'react-native';
import BottomBar from "./components/BottomBar";
import { db } from "./../firebase";
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



const CommunityFeed = ({route, navigation }) => {

  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);


  const communityId = route.params.communityId;
  const user = getAuth().currentUser;

  useEffect(() => {
    async function getData () {
      const userRef = doc(db, 'users', user.email);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      setLikedPosts(userData.likedPosts);

      try {
      // Get all posts for the specified community
      
      const postsQuery =  query(
          collection(db, 'posts'),
          where('communityId', '==', communityId),
      );
      const postsRef = await getDocs(postsQuery)
      const allPosts = postsRef.docs.map(doc => doc.data());
      setPosts(allPosts);
      console.log(communityId);
      console.log(allPosts);
      } catch (error) {
          console.log(error);
      }
    }

    getData();
  }, []);
      
  const onPressAddPost = ({item}) => {
    return(<Challenge challenge={item.challenge} goal={item.goal} index={item.id}/>)
  };

  async function toggleLike(post){
    var updatedLikedPosts = [];
    var likes;
    if(likedPosts.includes(post.id)){
      updatedLikedPosts = likedPosts.filter(request => request !== post.id);
      likes = post.likes - 1;
    }
    else{
      updatedLikedPosts = [...likedPosts, post.id];
      likes = post.likes + 1;
    }
    try {
      const userRef = doc(db, "users", user.email);
      const postRef = doc(db, "posts", post.id);
      await updateDoc(userRef, { likedPosts: updatedLikedPosts});
      await updateDoc(postRef, { likes: likes});
      const postsQuery =  query(
        collection(db, 'posts'),
        where('communityId', '==', communityId),
      );
      const postsRef = await getDocs(postsQuery)
      const allPosts = postsRef.docs.map(doc => doc.data());
      setPosts(allPosts);
      setLikedPosts(updatedLikedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  function Like(props) {
    const post = props.post;
    return(
      <TouchableOpacity style={styles.button} onPress={() => toggleLike(post)}>
        <Text style={styles.buttonText}>{post.likes}</Text>
        <Icon name="hand-heart-outline" size={24} color="#000" />
        <Text style={styles.buttonText}>Like</Text>
      </TouchableOpacity>
    )
  }

  function Unlike(props) {
    const post = props.post;
    return(
      <TouchableOpacity style={styles.button} onPress={() => toggleLike(post)}>
        <Text style={styles.buttonText}>{post.likes}</Text>
        <Icon name="hand-heart" size={24} color="#000" />
        <Text style={styles.buttonText}>Unlike</Text>
      </TouchableOpacity>
    )
  }

  function ToggleLike(props) {
    const liked = props.liked;
    const post = props.associatedPost;
    if (liked) {
      return <Unlike post={post}/>;
    }
    return <Like post={post}/>;
  }

  return (
    <View style={styles.container}>
    <View>
      <Text style={styles.heading}>{communityId} Feed</Text>
      {posts.map((post) => (
        <View key={post.id} style={styles.post}>
          <Text style={styles.username}>{post.userId}</Text>
          <Text style={styles.content}>{post.content}</Text>
          <Text style={styles.time}>{post.createdAt}</Text>
          <ToggleLike liked={likedPosts.includes(post.id)} associatedPost={post}/>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={onPressAddPost}>
        <Text style={styles.addButtonText}>Add Post</Text>
      </TouchableOpacity>
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
  button: {
    flexDirection: 'row',
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 8, 
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
})