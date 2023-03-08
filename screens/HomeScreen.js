import React from "react";
import "react-native-gesture-handler";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signOut } from "firebase/auth";
import BottomBar from "./components/BottomBar";

const HomeScreen = ({ navigation }) => {
  const user = getAuth();

  const handleSignOut = () => {
    signOut(user);
    navigation.replace("LogInScreen");
  };

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#00a46c",
          height: "28%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={require("./images/menu.png")}
          style={{ height: 25, width: 25, marginTop: 15 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            width: "100%",
          }}
        >
          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 28, color: "#FFF", fontWeight: "bold" }}>
              welcome
            </Text>
            <Text style={{ fontSize: 20, color: "#FFF", fontWeight: "normal" }}>
              {user.currentUser.email}
            </Text>
          </View>
          <View style={{ width: "20%", alignItems: "flex-end" }}>
            <Image
              source={require("./images/pantry.png")}
              style={{ height: 60, width: 60 }}
            />
          </View>
        </View>
      </View>
      <LinearGradient
        colors={["rgba(0,164,109,0.4)", "transparent"]}
        style={{
          left: 0,
          right: 0,
          height: 90,
          margin: -45,
        }}
      ></LinearGradient>

      <BottomBar navigation={navigation} />
    </View>
  );
};

// <Text>Successful login</Text>
// <Text>Welcome {user.currentUser.email}</Text>
// <Button title="logout" onPress={handleSignOut} />

export default HomeScreen;

const styles = StyleSheet.create({});
