import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Profile from './components/Profile';
import Calendar from './components/Calendar';
import ChooseCalendar from './components/Calendar/ChooseCalendar';
import CreateCalendar from './components/Calendar/CreateCalendar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/screens/Login';
import RegistrationScreen from './components/RegistrationScreen/RegistrationScreen';
import ForgotPassword from './components/screens/ForgotPassword';
import CalendarView from './components/Calendar/CalendarView';
import ResetPassword from './components/screens/ResetPassword';
import Search from './components/Search';
import JoinCalendar from './components/Calendar/JoinCalendar';
import ChangePassword from './components/screens/ChangePassword';
import moment from 'moment';
import mockCourses from './mockData/courses';
import ThreadGridTile from './components/Threads/ThreadGridTile';
import CalendarGridTile from './components/Threads/CalendarGridTile';
import ThreadsScreen from './components/Threads/ThreadsScreen';
import CalendarScreen from './components/Threads/CalendarScreen';
import IndividualThreadScreen from './components/Threads/IndividualThreadScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = React.useState(null);

    const [courses, setCourses] = React.useState([]);
    const [calendars, setCalendars] = React.useState([]);

    if (user === null || user === undefined) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Login' options={{ headerShown: false }}>
                        {(props) => (
                            <Login {...props} user={user} setUser={setUser} />
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Registration'
                        options={{ headerShown: false }}
                    >
                        {(props) => (
                            <RegistrationScreen
                                {...props}
                                user={user}
                                setUser={setUser}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Forgot Password'
                        options={{ headerShown: false }}
                    >
                        {(props) => (
                            <ForgotPassword
                                {...props}
                                user={user}
                                setUser={setUser}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Reset Password'
                        options={{ headerShown: false }}
                    >
                        {(props) => (
                            <ResetPassword
                                {...props}
                                user={user}
                                setUser={setUser}
                            />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' options={{ headerShown: false }}>
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

                <Stack.Screen
                    name='Change Password'
                    options={{ headerShown: false }}
                >
                    {(props) => (
                        <ChangePassword
                            {...props}
                            user={user}
                            setUser={setUser}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name='Profile' options={{ headerShown: false }}>
                    {(props) => (
                        <Profile
                            {...props}
                            calendars={calendars}
                            user={user}
                            setUser={setUser}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name='Calendar' options={{ headerShown: false }}>
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
                <Stack.Screen
                    name='calendarScreen'
                    options={{ headerShown: false }}
                >
                    {(props) => (
                        <CalendarScreen
                            {...props}
                            courses={courses}
                            calendars={calendars}
                            user={user}
                            setUser={setUser}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name='Search' options={{ headerShown: false }}>
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
                <Stack.Screen
                    name='Choose Calendar'
                    options={{ headerShown: false }}
                >
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
                <Stack.Screen
                    name='Create Calendar'
                    options={{ headerShown: false }}
                >
                    {(props) => (
                        <CreateCalendar
                            {...props}
                            calendars={calendars}
                            setCalendars={setCalendars}
                            user={user}
                            setUser={setUser}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name='Calendar View'
                    options={{ headerShown: false }}
                >
                    {(props) => <CalendarView {...props} user={user} />}
                </Stack.Screen>
                <Stack.Screen
                    name='Join Calendar'
                    options={{ headerShown: false }}
                >
                    {(props) => <JoinCalendar {...props} user={user} />}
                </Stack.Screen>
                {/* <Stack.Screen
                    name='CalendarScreen'
                    options={{ headerShown: false }}
                >
                    {(props) => <CalendarScreen {...props} user={user} />}
                </Stack.Screen> */}
                <Stack.Screen
                    name='ThreadsScreen'
                    options={{ headerShown: false }}
                >
                    {(props) => <ThreadsScreen {...props} user={user} />}
                </Stack.Screen>
                {/* <Stack.Screen
                    name='Calendar Grid Tile'
                    options={{ headerShown: false }}
                >
                    {(props) => <CalendarGridTile {...props} user={user} />}
                </Stack.Screen>
                <Stack.Screen
                    name='Thread Grid Tile'
                    options={{ headerShown: false }}
                >
                    {(props) => <ThreadGridTile {...props} user={user} />}
                </Stack.Screen> */}
                <Stack.Screen
                    name='IndividualThreadScreen'
                    options={{ headerShown: false }}
                >
                    {(props) => (
                        <IndividualThreadScreen {...props} user={user} />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
            <StatusBar />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
