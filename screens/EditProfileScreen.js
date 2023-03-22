import React, { useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { ref, set, onValue, child, get } from "firebase/database";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore/lite";

import BottomBar from "./components/BottomBar";

const EditProfileScreen = ({ route, navigation }) => {
  // state for textinput
  let [name, setName] = useState("");
  let [gender, setGender] = useState("");
  let [age, setAge] = useState("");
  let [height, setHeight] = useState("");

  // small message for notifying the user of changes
  let [changeSaved, setChangeSaved] = useState(false);

  const user = getAuth().currentUser;

  async function handleSaveChanges() {
    try {
      const userRef = doc(db, "users", user.email);
      await updateDoc(userRef, { name: name });
      await updateDoc(userRef, { gender: gender });
      await updateDoc(userRef, { age: age });
      await updateDoc(userRef, { height: height });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Edit Profile Screen</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="gender"
          onChangeText={setGender}
        />
        <TextInput
          style={styles.input}
          placeholder="age"
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="height"
          onChangeText={setHeight}
        />
      </View>
      {changeSaved && <Text style={{ color: "green" }}> Changes Saved!</Text>}
      <Button title="Save Changes" onPress={handleSaveChanges} />
      <View style={{ flex: 0.2 }} />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  input: {
    borderColor: "green",
    borderRadius: 2,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
