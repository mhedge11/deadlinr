import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={{
                    fontSize: '30rem',
                    fontWeight: '700'
                }}>
                    Hey Tim!
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        paddingTop: '20%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '10%'
    }
});