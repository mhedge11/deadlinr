import React, { createRef } from 'react';
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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { updatePushToken } from './api/user';
import EditProfile from './components/screens/EditProfile';
import FriendProfile from './components/Profile/FriendProfile';

import SuggestedFriends from './components/Profile/SuggestedFriends';

const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

class Deadlinr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expoPushToken: '',
            notification: false
        };
        this.notificationListener = createRef();
        this.responseListener = createRef();
    }

    componentDidMount() {
        if (this.props.user == null || this.props.user == undefined) return;
        registerForPushNotificationsAsync().then(token => this.setState({
            expoPushToken: token
        }));

        // This listener is fired whenever a notification is received while the app is foregrounded
        this.notificationListener.current = Notifications.addNotificationReceivedListener(notification => this.setState({
            notification
        }));
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
        updatePushToken({
            token: this.props.user.token,
            pushToken: this.state.expoPushToken
        })
    }   


    componentDidUpdate(prevProps, prevState) { 
        if (this.props.user == null || this.props.user == undefined) return;
        if (prevState.expoPushToken !== '') return;
        registerForPushNotificationsAsync().then(token => this.setState({
            expoPushToken: token
        }));

        // This listener is fired whenever a notification is received while the app is foregrounded
        this.notificationListener.current = Notifications.addNotificationReceivedListener(notification => this.setState({
            notification
        }));
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
        updatePushToken({
            token: this.props.user.token,
            pushToken: this.state.expoPushToken
        })
    }

    componentWillUnmount() { 
        // Notifications.removeNotificationSubscription(this.notificationListener.current);
        // Notifications.removeNotificationSubscription(this.responseListener.current);
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
                    <Stack.Screen
                        name='Edit Profile'
                        options={{ headerShown: false }}
                    >
                        {(props) => <EditProfile {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Suggested Friends'
                        options={{ headerShown: false }}
                    >
                        {(props) => <SuggestedFriends {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='FriendProfile'
                        options={{ headerShown: false }}
                    >
                        {(props) => <FriendProfile {...props} />}
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
