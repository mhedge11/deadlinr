import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Navigator from './components/Navigator';
import Profile from './components/Profile';



export default function App() {
    const [selected, setSelected] = React.useState(0);

    return (
        <View style={styles.container}>
            {
                selected === 0 && <Home />
            }
            {
                selected == 3 && <Profile />
            }
            <Navigator changeView={setSelected}/>
        </View>
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
