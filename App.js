import { StyleSheet, LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
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

import SocialScreen from './screens/SocialScreen';
import ChallengesViewScreen from './screens/ChallengesViewScreen';
import Leaderboard from './screens/Leaderboard';
import MedalsScreen from './screens/MedalsScreen';

import CommunityScreen from './screens/CommunityScreen';
import CommunityFeed from './screens/CommunityFeed';
import WritePost from './screens/WritePost';

const Stack = createStackNavigator();
LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.']);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen name="WritePost" component={WritePost} />
        
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
