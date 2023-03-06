import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import BottomBar from "./components/BottomBar";
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore/lite";

const ProfileScreen = ({ route, navigation }) => {
  const user = getAuth().currentUser;

  const [userData, setUser] = useState({});

  useEffect(() => {
    async function getData() {
      const userRef = doc(db, "users", user.email);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      setUser(userData);
    }

    getData();
  }, []);

  function CustomText(props) {
    return <Text style={styles.textStyle}>{props.children}</Text>;
  }

  return (
    <View>
      <ScrollView style={{ maxHeight: "90%" }}>
        <View style={styles.displayInfo}>
          <CustomText>Name:</CustomText>
          <CustomText> {userData.name} </CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>Age:</CustomText>
          <CustomText> {userData.age} </CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>Gender:</CustomText>
          <CustomText> {userData.gender} </CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>Height:</CustomText>
          <CustomText> {userData.height} </CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>PlaceHolder:</CustomText>
          <CustomText> {}</CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>PlaceHolder:</CustomText>
          <CustomText> {}</CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>PlaceHolder:</CustomText>
          <CustomText> {}</CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>PlaceHolder:</CustomText>
          <CustomText> {}</CustomText>
        </View>
      </ScrollView>
      <Button
        title="Edit Profile"
        onPress={() => navigation.replace("EditProfileScreen")}
      />
      <View style={{ flex: 0.5 }} />
      <BottomBar />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  displayInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 30,
    minHeight: 50,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "purple",
  },
});
