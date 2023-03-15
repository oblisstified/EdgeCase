import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import LogInScreen from './screens/LogInScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogFoodScreen from './screens/LogFoodScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SocialScreen from './screens/SocialScreen';
import ChallengesViewScreen from './screens/ChallengesViewScreen';
import Page1 from './screens/build-profile/Page1';
import Page2 from './screens/build-profile/Page2';
import Page3 from './screens/build-profile/Page3';
import Page4 from './screens/build-profile/Page4';
import CommunityScreen from './screens/CommunityScreen';
import CommunityFeed from './screens/CommunityFeed';
import ViewFriendsScreen from './screens/ViewFriendsScreen';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';



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
        <Stack.Screen name="Page1" component={Page1} />
        <Stack.Screen name="Page2" component={Page2} />
        <Stack.Screen name="Page3" component={Page3} />
        <Stack.Screen name="Page4" component={Page4} />
        <Stack.Screen name="SocialScreen" component={SocialScreen} />
        <Stack.Screen name="ChallengesViewScreen" component={ChallengesViewScreen} />
        <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
        <Stack.Screen name="CommunityFeed" component={CommunityFeed} />
        <Stack.Screen name="ViewFriendsScreen" component={ViewFriendsScreen} />

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
