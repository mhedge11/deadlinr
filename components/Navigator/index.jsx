import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const changeView = this.props.changeView;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => changeView(0)}>
                    <Icon name='home' type='font-awesome' color='white'/>
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeView(1)}>
                    <Icon name='calendar' type='font-awesome' color='white'/>
                    <Text style={styles.text}>Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeView(2)}>
                    <Icon name='commenting' type='font-awesome' color='white'/>
                    <Text style={styles.text}>Threads</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeView(3)}>
                    <Icon name='user' type='font-awesome' color='white'/>
                    <Text style={styles.text}>Profile</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '10%',
        width: '90%',
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '3%',
        borderRadius: 20
    },
    text: {
        color: 'white'
    }
});