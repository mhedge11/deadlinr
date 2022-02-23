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
import Login from "./components/screens/Login";
import RegistrationScreen from "./components/RegistrationScreen/RegistrationScreen";
import ForgotPassword from "./components/screens/ForgotPassword";
import CalendarView from "./components/Calendar/CalendarView";
import ResetPassword from "./components/screens/ResetPassword";
import Search from "./components/Search";
import moment from "moment";

const Stack = createNativeStackNavigator();

export default function App() {
  /*
        type User = {
            firstName: string,
            lastName: string,
            email: string,
            uid: string,
            username: string,
            token: string
        }
    */

  const [user, setUser] = React.useState({
    firstName: 'prakhar',
    lastName: 'nahar',
    username: 'thatprakhar',
    email: 'naharpra@gmail.com',
    uid: '123',
    token: '123'
  });

  const [courses, setCourses] = React.useState([
    {
      id: 0,
      title: "EAPS 106",
      bgColor: "#08c43d",
      tasks: [
        {
          taskTitle: "Movie Worksheet 4",
          dueDate: moment(),
        },
      ],
      members: [],
    },
    {
      id: 1,
      title: "CS 180",
      bgColor: "#414241",
      tasks: [],
      members: [],
    },
    {
      id: 2,
      title: "MA 165",
      bgColor: "#f22c3f",
      tasks: [],
      members: [],
    },
    {
      id: 3,
      title: "ENGL 106",
      bgColor: "#d66718",
      tasks: [],
      members: [],
    },
    {
      id: 4,
      title: "CS 193",
      bgColor: "#2180cf",
      tasks: [],
      members: [],
    },
  ]);

  const [calendars, setCalendars] = React.useState([
    {
      id: 0,
      title: "Personal Calendar",
      private: true,
      note: "My personal calendar",
      tasks: [
        {
          id: 0,
          taskTitle: "Sample title 1",
          note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla velit nec dolor ultrices pulvinar. Nunc scelerisque ipsum tellus, ut dapibus dolor rhoncus nec. Nunc eget magna orci.",
          dueDate: moment(),
        },
        {
          id: 1,
          taskTitle: "Sample title 2",
          note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla velit nec dolor ultrices pulvinar. Nunc scelerisque ipsum tellus, ut dapibus dolor rhoncus nec. Nunc eget magna orci.",
          dueDate: moment(),
        },
      ],
      members: [],
    },
  ]);

  if (user === null || user === undefined) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <Login {...props} user={user} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="Registration" options={{ headerShown: false }}>
            {(props) => (
              <RegistrationScreen {...props} user={user} setUser={setUser} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Forgot Password" options={{ headerShown: false }}>
            {(props) => (
              <ForgotPassword {...props} user={user} setUser={setUser} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Reset Password" options={{ headerShown: false }}>
            {(props) => (
              <ResetPassword {...props} user={user} setUser={setUser} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => (
            <Home
              {...props}
              courses={courses}
              calendars={calendars}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Reset Password" options={{ headerShown: false }}>
          {(props) => (
            <ResetPassword {...props} user={user} setUser={setUser} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile" options={{ headerShown: false }}>
          {(props) => (
            <Profile
              {...props}
              calendars={calendars}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Calendar" options={{ headerShown: false }}>
          {(props) => (
            <Calendar
              {...props}
              courses={courses}
              calendars={calendars}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Search" options={{ headerShown: false }}>
          {(props) => (
            <Search
              {...props}
              courses={courses}
              calendars={calendars}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Choose Calendar" options={{ headerShown: false }}>
          {(props) => (
            <ChooseCalendar
              {...props}
              courses={courses}
              calendars={calendars}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Create Calendar" options={{ headerShown: false }}>
          {(props) => (
            <CreateCalendar
              {...props}
              calendars={calendars}
              user={user}
              setUser={setUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Calendar View" options={{ headerShown: false }}>
          {(props) => <CalendarView {...props} user={user} />}
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
