import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    showConfirmDialog = () => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to delete your account?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        // API Route for deleting account
                    },
                },
                
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={{
                    fontSize: '30rem',
                    fontWeight: '700'
                }}>
                    Hey Tim!
                </Text>
                <TouchableOpacity
                    onPress={() => this.showConfirmDialog()}
                >
                    <Text
                        style={{
                            fontSize: '20rem',
                            color: '#f55a42',
                            fontWeight: '600'
                        }}
                    >
                        Delete Account
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: '20%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '30%',
        justifyContent: 'space-between',
    }
});