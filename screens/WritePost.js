import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

const WritePost = ({ route, navigation }) => {
  const user = getAuth().currentUser;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { communityId } = route.params;

  const onPressSavePost = async () => {
    try {
      // Create a new post document in the database
      const postDoc = await addDoc(collection(db, 'posts'), {
        title,
        content,
        userId: user.email, // replace with actual user ID
        communityId,
        createdAt: serverTimestamp(),
        likes: 0,
      });
      console.log('Post saved with ID:', postDoc.id);
      // Navigate back to the CommunityFeed screen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

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
        onChangeText={setContent}
        placeholder="Enter post content"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={onPressSavePost}>
        <Text style={styles.saveButtonText}>Save Post</Text>
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