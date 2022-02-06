import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

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
        const navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={{
                    fontSize: '30rem',
                    fontWeight: '700'
                }}>
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => navigation.navigate('Home')}>
                        <Icon name='chevron-left' type='font-awesome' color='black'/>
                    </TouchableOpacity>
                    {'    '}Hey Tim!
                </Text>

                <View
                    style={{
                        marginTop: '30%',
                        flex: 1,
                        justifyContent: 'space-around'
                    }}
                >
                    <View
                        style={{
                        }}
                    >
                        <TouchableOpacity>
                            <Text style={{
                                fontSize: '20rem',
                                color: 'black',
                                fontWeight: '600',
                                padding: '5%'
                            }}>
                                Log Out
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{
                                fontSize: '20rem',
                                color: 'black',
                                fontWeight: '600',
                                padding: '5%'
                            }}>
                                Change Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.showConfirmDialog()}
                    >
                        <Text
                            style={{
                                fontSize: '20rem',
                                color: '#f55a42',
                                fontWeight: '600',
                                padding: '5%'
                            }}
                        >
                            Delete Account
                        </Text>
                    </TouchableOpacity>
                </View>

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
        justifyContent: 'flex-start',
    }
});