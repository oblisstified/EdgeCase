import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ProgressChart } from "react-native-chart-kit";


import HomeScreen from './screens/HomeScreen';
import LogInScreen from './screens/LogInScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogFoodScreen from './screens/LogFoodScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import FoodBasketScreen from './screens/FoodBasketScreen';

import BottomBar from './screens/components/BottomBar'
import AllUsersScreen from './screens/AllUsersScreen';
import OtherUserProfileScreen from './screens/OtherUserProfileScreen';
import FriendRequestsScreen from './screens/FriendRequestsScreen';
import FriendsScreen from './screens/FriendsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="LogFoodScreen" component={LogFoodScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="BottomBar" component={BottomBar} />
        <Stack.Screen name="AllUsersScreen" component={AllUsersScreen} />
        <Stack.Screen name = "OtherUserProfileScreen" component={OtherUserProfileScreen}/>
        <Stack.Screen name = "FriendRequestsScreen" component={FriendRequestsScreen}/>
        <Stack.Screen name = "FriendsScreen" component={FriendsScreen}/>
        <Stack.Screen name = "FoodBasketScreen" component={FoodBasketScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
