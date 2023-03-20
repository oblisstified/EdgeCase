import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { db } from "../firebase";
import { getAuth } from "firebase/auth"
import { collection, addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

import { createPost } from '../utils/addPost';

const WritePost = ({ route, navigation }) => {

  const user = getAuth().currentUser;

  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  let [postSaved, setPostSaved] = useState(false);

  const { communityId } = route.params.communityId;


  async function onPressSavePost(){
    

    const  dateString = (new Date(Date.now())).toString();
    const email = user.email;
    const communityId = communityId;

    let saveObject = 
      `{
        "date": "${dateString}",
        "email": "${email}",
        "communityId": "${communityId}",
        "content": "${content}",
        "title": "${title}",
        "likes": "0"
      }`

    let success = await createPost(JSON.parse(saveObject));

    setPostSaved(success);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter post title"
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.contentInput]}
        value={content}
        onChangeText={ setContent }
        placeholder="Enter post content"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={onPressSavePost}>
        <Text style={styles.saveButtonText}>Save Post</Text>
        { postSaved && <Text style={{color:"green"}}> Saved!!</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default WritePost;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
    contentInput: {
      height: 150,
      textAlignVertical: 'top',
    },
    saveButton: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
    },
    saveButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });