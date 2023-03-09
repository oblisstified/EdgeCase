import React from "react";
import "react-native-gesture-handler";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
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
      <SafeAreaView
        style={{
          backgroundColor: "#00a46c",
          height: "30%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ width: "80%", alignItems: "flex-start" }}>
            <TouchableOpacity>
              <Image
                source={require("./images/menu.png")}
                style={{ height: 25, width: 25, marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ width: "18%", alignItems: "flex-end", marginRight: 15 }}
          >
            <TouchableOpacity onPress={handleSignOut}>
              <Image
                source={require("./images/log-out.png")}
                style={{ height: 25, width: 25 }}
              />
              <Text style={{ fontSize: 8, color: "#FFF", fontWeight: "bold" }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            marginLeft: 15,
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
          <View style={{ width: "12%", alignItems: "flex-end" }}>
            <Image
              source={require("./images/pantry.png")}
              style={{ height: 60, width: 60 }}
            />
          </View>
        </View>
      </SafeAreaView>
      <LinearGradient
        colors={["rgba(0,164,109,0.4)", "transparent"]}
        style={{
          left: 0,
          right: 0,
          height: 90,
          margin: -45,
        }}
      ></LinearGradient>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
