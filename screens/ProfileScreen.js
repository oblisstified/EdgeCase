import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button, ScrollView,TouchableOpacity } from "react-native";
import BottomBar from "./components/BottomBar";
import { TextInput } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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

      <ScrollView style={{ maxHeight: "90%" }} testID = "scrollView">
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace("MedalsScreen")}>
            <Icon name="medal" size={24} color="#000" />
            <Text style={styles.buttonText}>View Medals</Text>
      </TouchableOpacity>
        <View style={styles.displayInfo} testID = "scrollViewChild">
          <CustomText>Name:</CustomText>
          <CustomText> {userData.name} </CustomText>
        </View>
        <View style={styles.displayInfo} testID = "scrollViewChild">
          <CustomText>Age:</CustomText>
          <CustomText> {userData.age} </CustomText>
        </View>
        <View style={styles.displayInfo}testID = "scrollViewChild">
          <CustomText>Gender:</CustomText>
          <CustomText> {userData.gender} </CustomText>
        </View>
        <View style={styles.displayInfo}testID = "scrollViewChild">
          <CustomText>Height:</CustomText>
          <CustomText> {userData.height} </CustomText>
        </View>

        <View style={styles.displayInfo}>
          <CustomText>Weight:</CustomText>
          <CustomText> {userData.weight}</CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>Activity:</CustomText>
          <CustomText> {userData.activity}</CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>Goal:</CustomText>
          <CustomText> {userData.goal}</CustomText>
        </View>
        <View style={styles.displayInfo}>
          <CustomText>Calorie Goal:</CustomText>

          <CustomText> {}</CustomText>
        </View>
      </ScrollView>
      <Button
        title="Edit Profile"
        testID = "editProfile"
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
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8, 
    paddingTop: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});
