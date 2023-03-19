import { StyleSheet, LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./screens/navigation/Navigator";

const Stack = createStackNavigator();
LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.']);

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
