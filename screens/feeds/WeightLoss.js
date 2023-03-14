import React, { useState } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth"

const WeightLoss = ({navigation}) => {
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

export default WeightLoss