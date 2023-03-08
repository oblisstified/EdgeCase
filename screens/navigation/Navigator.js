import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../Detail";
import LogInScreen from "../LogInScreen";
import HomeScreen from "../HomeScreen";
import LogFoodScreen from "../LogFoodScreen";
import ProfileScreen from "../ProfileScreen";
import AllUsersScreen from "../AllUsersScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 65,
          justifyContent: "center",
          paddingVertical: 15,
          backgroundColor: "#eff4f0",
          elevation: 2,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../images/heart-home.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="LogFoodScreen"
        component={LogFoodScreen}
        options={{
          tabBarLabel: "Log Food",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../images/log-food.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../images/profile.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AllUsersScreen"
        component={AllUsersScreen}
        options={{
          tabBarLabel: "Add Friends",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../images/add-friends.png")}
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="HomeScreen" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
