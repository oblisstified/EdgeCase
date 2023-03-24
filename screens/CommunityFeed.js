import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'react-native-gesture-handler';
import 'firebase/firestore';
import { Animated, Image, StyleSheet, Text, View, FlatList,TouchableOpacity, ImageBackground } from 'react-native';
import { db } from "./../firebase";
import { collection, getDoc, updateDoc, doc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



import { getPosts, getNumOfPosts } from '../utils/addPost';


const CommunityFeed = ({route, navigation }) => {

  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [numOfPosts, setNumOfPosts] = useState(0);

  const communityId = route.params.communityId;
  const user = getAuth().currentUser;

  useEffect(() => {
    async function getData () {
      const userSnapshot = await getDoc(doc(db, 'users', user.email));
      setLikedPosts(userSnapshot.data().likedPosts);

      const friendsList = userSnapshot.data().friends
      let communityPosts = await getPosts(communityId,friendsList);
      setPosts(communityPosts);
      setNumOfPosts(await getNumOfPosts(communityId));
    }

    getData();
  }, []);
      
  const onPressAddPost = () => {
    navigation.replace('WritePost', { communityId, numOfPosts });
};

async function toggleLike(associatedPost){
  var updatedLikedPosts = [];
  var likes;


  if(likedPosts.includes(associatedPost.id)){
    updatedLikedPosts = likedPosts.filter(request => request !== associatedPost.id);
    likes = associatedPost.likes - 1;
  }
  else{
    updatedLikedPosts = [...likedPosts, associatedPost.id];
    likes = associatedPost.likes + 1;
  }
  
  try{
      const userRef = doc(db, "users", user.email);
      await updateDoc(userRef, { likedPosts: updatedLikedPosts});

      // pull relevant references
      let postRef = doc(db, 'posts', "postList");
      const postSnapshot = await getDoc(postRef);
      const data = postSnapshot.data();
      let allPosts = await data.posts;
      const updatedPosts = allPosts.map(post => {
        if(post.post.id === associatedPost.id){
          return {post: { ...(post.post), likes: likes }};
        }
        return post;
      })

      await updateDoc(postRef, {posts : updatedPosts});
      let communityPosts = await getPosts(communityId);
      setPosts(communityPosts);
      setLikedPosts(updatedLikedPosts)
      
  } catch (e) {
      console.log(e)
  }
};

function ToggleLike(props) {
  const liked = props.liked;
  const associatedPost = props.associatedPost;
  if (liked) {
    return(
      <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(associatedPost)}>
        <Text style={styles.likeButtonText}>{associatedPost.likes}</Text>
        <Icon name="hand-heart" size={24} color="#000" />
        <Text style={styles.likeButtonText}>Unlike</Text>
      </TouchableOpacity>
    );
  }
  return(
    <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(associatedPost)}>
      <Text style={styles.likeButtonText}>{associatedPost.likes}</Text>
      <Icon name="hand-heart-outline" size={24} color="#000" />
      <Text style={styles.likeButtonText}>Like</Text>
    </TouchableOpacity>
  );
}


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
            contentContainerStyle={{ paddingBottom: 150 }}
            renderItem={(post) =>
              (<View key={post.id} style={styles.post}>
                <Text style={styles.username}>{post.item.post.email}</Text>
                <Text style={styles.postHeading}>{post.item.post.title}</Text>
                <Text style={styles.content}>{post.item.post.content}</Text>
                <Text style={styles.time}>{post.item.post.date}</Text>
                <ToggleLike liked={likedPosts.includes(post.item.post.id)} associatedPost={post.item.post}/>
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
  likeButton: {
    flexDirection: 'row',
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 8, 
  },
  likeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
})
