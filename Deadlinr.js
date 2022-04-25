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
import CreateDeadline from './components/Calendar/CreateDeadline';
import ViewDeadline from './components/Calendar/ViewDeadline';
import ThreadsScreen from './components/Threads/ThreadsScreen';
import CalendarScreen from './components/Threads/CalendarScreen';
import IndividualThreadScreen from './components/Threads/IndividualThreadScreen';
import CreateThread from './components/Threads/CreateThread';
import CreateReplyToThread from './components/Threads/CreateReplyToThread';
import CreateReplyToReply from './components/Threads/CreateReplyToReply';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

class Deadlinr extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {};
    }

    render() {
        const { user, calendars } = this.props;

        if (user === null || user === undefined) {
            return (
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name='Login'
                            options={{ headerShown: false }}
                        >
                            {(props) => <Login {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name='Registration'
                            options={{ headerShown: false }}
                        >
                            {(props) => <RegistrationScreen {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name='Forgot Password'
                            options={{ headerShown: false }}
                        >
                            {(props) => <ForgotPassword {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name='Reset Password'
                            options={{ headerShown: false }}
                        >
                            {(props) => <ResetPassword {...props} />}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }

        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Home' options={{ headerShown: false }}>
                        {(props) => <Home {...props} />}
                    </Stack.Screen>

                    <Stack.Screen
                        name='Change Password'
                        options={{ headerShown: false }}
                    >
                        {(props) => <ChangePassword {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Profile'
                        options={{ headerShown: false }}
                    >
                        {(props) => <Profile {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Calendar'
                        options={{ headerShown: false }}
                    >
                        {(props) => <Calendar {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='calendarScreen'
                        options={{ headerShown: false }}
                    >
                        {(props) => <CalendarScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Search'
                        options={{ headerShown: false }}
                    >
                        {(props) => <Search {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Choose Calendar'
                        options={{ headerShown: false }}
                    >
                        {(props) => <ChooseCalendar {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Create Calendar'
                        options={{ headerShown: false }}
                    >
                        {(props) => <CreateCalendar {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Calendar View'
                        options={{ headerShown: false }}
                    >
                        {(props) => <CalendarView {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Join Calendar'
                        options={{ headerShown: false }}
                    >
                        {(props) => <JoinCalendar {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Create Deadline'
                        options={{ headerShown: false }}
                    >
                        {(props) => <CreateDeadline {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Deadline View'
                        options={{ headerShown: false }}
                    >
                        {(props) => <ViewDeadline {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='ThreadsScreen'
                        options={{ headerShown: false }}
                    >
                        {(props) => <ThreadsScreen {...props} />}
                    </Stack.Screen>

                    <Stack.Screen
                        name='IndividualThreadScreen'
                        options={{ headerShown: false }}
                    >
                        {(props) => <IndividualThreadScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='CreateThread'
                        options={{ headerShown: false }}
                    >
                        {(props) => <CreateThread {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='CreateReplyToThread'
                        options={{ headerShown: false }}
                    >
                        {(props) => <CreateReplyToThread {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='CreateReplyToReply'
                        options={{ headerShown: false }}
                    >
                        {(props) => <CreateReplyToReply {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
                <StatusBar />
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

function mapStateToProps(state) {
    return {
        user: state.user,
        calendars: state.calendars,
    };
}

export default connect(mapStateToProps)(Deadlinr);
