import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import LogInScreen from "../LogInScreen";
import AllUsersScreen from "../AllUsersScreen";
import EditProfileScreen from "../EditProfileScreen";
import FoodBasketScreen from "../FoodBasketScreen";
import FriendRequestsScreen from "../FriendRequestsScreen";
import FriendsScreen from "../FriendsScreen";
import HomeScreen from "../HomeScreen";
import LogFoodScreen from "../LogFoodScreen";
import OtherUserProfileScreen from "../OtherUserProfileScreen";
import ProfileScreen from "../ProfileScreen";
import BottomBar from "../components/BottomBar";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptionStyle}
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
          tabBarIcon: () => (
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
          tabBarIcon: () => (
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
          tabBarIcon: () => (
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
          tabBarIcon: () => (
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
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="LogFoodScreen" component={LogFoodScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="BottomBar" component={BottomBar} />
      <Stack.Screen name="AllUsersScreen" component={AllUsersScreen} />
      <Stack.Screen
        name="OtherUserProfileScreen"
        component={OtherUserProfileScreen}
      />
      <Stack.Screen
        name="FriendRequestsScreen"
        component={FriendRequestsScreen}
      />
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      <Stack.Screen name="FoodBasketScreen" component={FoodBasketScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
