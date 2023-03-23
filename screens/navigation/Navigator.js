import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import HomeScreen from '../HomeScreen';
import LogInScreen from '../LogInScreen';
import SignUpScreen from '../SignUpScreen'
import IntroScreen from '../IntroScreen'
import ProfileScreen from '../ProfileScreen';
import LogFoodScreen from '../LogFoodScreen';
import EditProfileScreen from '../EditProfileScreen';

import Page1 from '../build-profile/Page1';
import Page2 from '../build-profile/Page2';
import Page3 from '../build-profile/Page3';
import Page4 from '../build-profile/Page4';

import FoodBasketScreen from '../FoodBasketScreen';
import BottomBar from '../components/BottomBar'
import AllUsersScreen from '../AllUsersScreen';
import OtherUserProfileScreen from '../OtherUserProfileScreen';
import FriendRequestsScreen from '../FriendRequestsScreen';
import FriendsScreen from '../FriendsScreen';

import SocialScreen from '../SocialScreen';
import ChallengesViewScreen from '../ChallengesViewScreen';
import Leaderboard from '../Leaderboard';
import MedalsScreen from '../MedalsScreen';
import CommunityScreen from '../CommunityScreen';
import CommunityFeed from '../CommunityFeed';
import WritePost from '../WritePost'

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
        name="SocialScreen"
        component={SocialScreen}
        options={{
          tabBarLabel: "Social",
          tabBarIcon: () => (
            <Image
              source={require("../images/social.png")}
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
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

      <Stack.Screen name="HomeScreen" component={BottomTabNavigator} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="LogFoodScreen" component={LogFoodScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        
      <Stack.Screen name="Page1" component={Page1} />
      <Stack.Screen name="Page2" component={Page2} />
      <Stack.Screen name="Page3" component={Page3} />
      <Stack.Screen name="Page4" component={Page4} />
        
      <Stack.Screen name="BottomBar" component={BottomBar} />
      <Stack.Screen name="AllUsersScreen" component={AllUsersScreen} />
      <Stack.Screen name = "OtherUserProfileScreen" component={OtherUserProfileScreen}/>
      <Stack.Screen name = "FriendRequestsScreen" component={FriendRequestsScreen}/>
      <Stack.Screen name = "FriendsScreen" component={FriendsScreen}/>
      <Stack.Screen name = "FoodBasketScreen" component={FoodBasketScreen}/>

      <Stack.Screen name="SocialScreen" component={SocialScreen} />
      <Stack.Screen name="ChallengesViewScreen" component={ChallengesViewScreen} />
      <Stack.Screen name="Leaderboard" component={Leaderboard} />
      <Stack.Screen name="MedalsScreen" component={MedalsScreen} />
      <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
      <Stack.Screen name="CommunityFeed" component={CommunityFeed} />
      <Stack.Screen name="WritePost" component={WritePost} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
