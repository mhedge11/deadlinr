import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import ChooseCalendar from "./components/Calendar/ChooseCalendar";
import CreateCalendar from "./components/Calendar/CreateCalendar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" options={{ headerShown: false }}>
          {(props) => <Profile {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Calendar" options={{ headerShown: false }}>
          {(props) => <Calendar {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Choose Calendar" options={{ headerShown: false }}>
          {(props) => <ChooseCalendar {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Create Calendar" options={{ headerShown: false }}>
          {(props) => <CreateCalendar {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
