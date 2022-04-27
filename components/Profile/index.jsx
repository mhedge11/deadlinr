import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { deleteAccount } from '../../api/user';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.showDeleteAccountDialog.bind(this);
    }
    showDeleteAccountDialog = () => {
        if (!this.props.user) {
            return alert('An error occured');
        }

        const token = this.props.user['token'];

        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to delete your account?',
            [
                // The "Yes" button
                {
                    text: 'Yes',
                    onPress: async () => {
                        this.setState({
                            loading: true,
                        });
                        // API Route for deleting account
                        const res = await deleteAccount({ token });
                        this.setState({
                            loading: false,
                        });
                        if (res === 'success') {
                            this.props.setUser(null);
                            return Alert.alert('User successfully deleted!');
                        } else {
                            return Alert.alert(
                                'There was a problem with your request. Please try again later.'
                            );
                        }
                    },
                },

                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: 'No',
                },
            ]
        );
    };

    showLogoutConfirmation = () => {
        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to logout?',
            [
                // The "Yes" button
                {
                    text: 'Yes',
                    onPress: () => {
                        this.props.setUser(null);
                    },
                },
                ,
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: 'No',
                },
            ]
        );
    };

    render() {
        if (this.state.loading) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        const navigation = this.props.navigation;
        const { firstName, lastName, username, uid } = this.props.user.user;
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: '30rem',
                        fontWeight: '700',
                    }}
                >
                    <TouchableOpacity
                        style={{ justifyContent: 'center' }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Icon
                            name='chevron-left'
                            type='font-awesome'
                            color='black'
                        />
                    </TouchableOpacity>
                    {'    '}Hey {firstName}!
                </Text>

                <View
                    style={{
                        marginTop: '30%',
                        flex: 1,
                        justifyContent: 'space-around',
                    }}
                >
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Edit Profile');
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: '20rem',
                                    color: 'black',
                                    fontWeight: '600',
                                    padding: '5%',
                                }}
                            >
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Change Password');
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: '20rem',
                                    color: 'black',
                                    fontWeight: '600',
                                    padding: '5%',
                                }}
                            >
                                Change Password
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.showLogoutConfirmation()}
                        >
                            <Text
                                style={{
                                    fontSize: '20rem',
                                    color: 'black',
                                    fontWeight: '600',
                                    padding: '5%',
                                }}
                            >
                                Log Out
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.showDeleteAccountDialog()}
                    >
                        <Text
                            style={{
                                fontSize: '20rem',
                                color: '#f55a42',
                                fontWeight: '600',
                                padding: '5%',
                            }}
                        >
                            Delete Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
    },
});
