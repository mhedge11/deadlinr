import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Profile from './components/Profile';
import Calendar from './components/Calendar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
    const [selected, setSelected] = React.useState(0);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }}>
                    {props => <Home {...props}  />}
                </Stack.Screen>
                <Stack.Screen name="Profile" options={{ headerShown: false }}>
                    {props => <Profile {...props}  />}
                </Stack.Screen>
                <Stack.Screen name="Calendar" options={{ headerShown: false }}>
                    {props => <Calendar {...props}  />}
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
