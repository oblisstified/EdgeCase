import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";

import { createPost } from '../utils/addPost';

const WritePost = ({ route, navigation }) => {

  const user = getAuth().currentUser;
  const nav = useNavigation();
  const communityId = route.params["communityId"];
  const numOfPosts = route.params["numOfPosts"];

  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  let [postSaved, setPostSaved] = useState(false);

  console.log(route.params["communityId"])
  console.log(route.params["numOfPosts"])

  async function onPressSavePost(){
    

    const  dateString = (new Date(Date.now())).toString();
    const email = user.email;

    let saveObject = 
      `{
        "date": "${dateString}",
        "email": "${email}",
        "communityId": "${communityId}",
        "content": "${content}",
        "title": "${title}",
        "likes": 0,
        "id": "${communityId}-${numOfPosts}"
      }`

    let success = await createPost(JSON.parse(saveObject));
    const userRef = doc(db, "users", user.email);
    const userSnapshot = await getDoc(userRef);
    await updateDoc(userRef, { numPostsMade: (userSnapshot.data().numPostsMade)+1});

    setPostSaved(success);
    nav.navigate("CommunityFeed", {communityId})
  }


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        testID="titleInput"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter post title"
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        testID="contentInput"
        style={[styles.input, styles.contentInput]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter post content"
        multiline
      />
      <TouchableOpacity testID="saveButton" style={styles.saveButton} onPress={onPressSavePost}>
        <Text style={styles.saveButtonText}>Save Post</Text>
        <View testID="postSaved">{postSaved && <Text style={styles.postSavedText}>Saved!!</Text>}</View>
      </TouchableOpacity>
    </View>
  );
};

export default WritePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 60, // Add padding to the top of the container
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#00a46c",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#00a46c",
  },
  contentInput: {
    height: 150,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#00a46c",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  postSavedText: {
    color: "#00a46c",
    fontWeight: "bold",
  },
});

