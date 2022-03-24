import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Calendar')}
                >
                    <Icon name='calendar' type='font-awesome' color='white' />
                    <Text style={styles.text}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Threads')}
                >
                    <Icon name='commenting' type='font-awesome' color='white' />
                    <Text style={styles.text}>Threads</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Icon name='user' type='font-awesome' color='white' />
                    <Text style={styles.text}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Icon name='search' type='font-awesome' color='white' />
                    <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Join Calendar')}
                >
                    <Icon
                        name='paper-plane'
                        type='font-awesome'
                        color='white'
                    />
                    <Text style={styles.text}>Invite</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '10%',
        width: '100%',
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '3%',
        borderRadius: 20,
    },
    text: {
        color: 'white',
    },
});
