import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import HomeScreen from './screens/HomeScreen';
import LogInScreen from './screens/LogInScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogFoodScreen from './screens/LogFoodScreen';
import EditProfileScreen from './screens/EditProfileScreen';

import Page1 from './screens/build-profile/Page1';
import Page2 from './screens/build-profile/Page2';
import Page3 from './screens/build-profile/Page3';
import Page4 from './screens/build-profile/Page4';

import FoodBasketScreen from './screens/FoodBasketScreen';
import BottomBar from './screens/components/BottomBar'
import AllUsersScreen from './screens/AllUsersScreen';
import OtherUserProfileScreen from './screens/OtherUserProfileScreen';
import FriendRequestsScreen from './screens/FriendRequestsScreen';
import FriendsScreen from './screens/FriendsScreen';

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
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
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
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
