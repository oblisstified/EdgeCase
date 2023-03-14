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
          marginTop: -45,
        }}
      />

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#585a61",
              }}
            >
              Calories
            </Text>
            <View
              style={{
                height: 4,
                backgroundColor: "#ble5d3",
                width: 115,
                marginTop: -5,
              }}
            ></View>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#FFF",
                }}
              >
                more
              </Text>
            </View>
            <View
              style={{
                height: 4,
                backgroundColor: "#ble5d3",
                width: 115,
                marginTop: -5,
              }}
            ></View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 300 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("LogFoodScreen")}
            style={[styles.touchableWindow, styles.shadowProp]}
          >
            <Image source={require("./images/log-food.png")} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                Calories Consumed / Goal
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("LogFoodScreen")}
            style={[styles.touchableWindow, styles.shadowProp]}
          >
            <Image source={require("./images/log-food.png")} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Last Meal ...?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("LogFoodScreen")}
            style={[styles.touchableWindow, styles.shadowProp]}
          >
            <Image source={require("./images/log-food.png")} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Etc. Etc. ...</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#585a61",
              }}
            >
              Progress
            </Text>
            <View
              style={{
                height: 4,
                backgroundColor: "#ble5d3",
                width: 115,
                marginTop: -5,
              }}
            ></View>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#FFF",
                }}
              >
                more
              </Text>
            </View>
            <View
              style={{
                height: 4,
                backgroundColor: "#ble5d3",
                width: 115,
                marginTop: -5,
              }}
            ></View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 300 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("LogFoodScreen")}
            style={[styles.touchableWindow, styles.shadowProp]}
          >
            <Image source={require("./images/analytics.png")} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Calories-Consumed Graph{"\n"}(per day)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("LogFoodScreen")}
            style={[styles.touchableWindow, styles.shadowProp]}
          >
            <Image source={require("./images/analytics.png")} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Weight Graph{"\n"}(per month)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("LogFoodScreen")}
            style={[styles.touchableWindow, styles.shadowProp]}
          >
            <Image source={require("./images/analytics.png")} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Etc. Etc. ...
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#585a61",
              }}
            >
              Achievements
            </Text>
            <View
              style={{
                height: 4,
                backgroundColor: "#ble5d3",
                width: 115,
                marginTop: -5,
              }}
            ></View>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "#FFF",
                }}
              >
                more
              </Text>
            </View>
            <View
              style={{
                height: 4,
                backgroundColor: "#ble5d3",
                width: 115,
                marginTop: -5,
              }}
            ></View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 300 }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("LogFoodScreen")}
            style={[styles.touchableWindow, styles.shadowProp]}
          >
            <Image source={require("./images/prize.png")} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Number of Medals
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("LogFoodScreen")}
            style={[styles.touchableWindow, styles.shadowProp]}
          >
            <Image source={require("./images/prize.png")} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Next Achievable Medal
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("LogFoodScreen")}
            style={[styles.touchableWindow, styles.shadowProp]}
          >
            <Image source={require("./images/prize.png")} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Etc. Etc. ...
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  touchableWindow: {
    height: 250,
    width: 250,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
