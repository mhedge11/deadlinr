import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { deleteAccount } from '../../api/user';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { getUser } from '../../api/user';

import { uploadPicture } from '../../api/user';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.showDeleteAccountDialog.bind(this);
    }

    componentDidMount = async () => { 
       // console.log(this.props.user);
        const user = await getUser(this.props.user.token);
       // console.log(user);
        this.props.dispatch({
            type: 'SET_USER',
            user: { ...user.user, token: this.props.user.token }
        });
    }

    chooseImage = async () => { 
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.25,
        });
        if (!result.cancelled) {
            const res = await uploadPicture({
                token: this.props.user.token,
                image: result.base64
            });

            if (res === false) { 
                return Alert.alert('An error occured');
            }
            setTimeout(async () => { 
                console.log('here');
                const user = await getUser(this.props.user.token);
                this.props.dispatch({ type: 'SET_USER',
                    user: { ...user.user, token: this.props.user.token }
                })
            }, 1000)
        }
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
                            this.props.dispatch({
                                type: 'SET_USER',
                                user: null
                            });
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
                        this.props.dispatch({
                            type: 'SET_USER',
                            user: null
                        });
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
        const { firstName, lastName, uid, picture, bio } = this.props.user;
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 30,
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
                <Avatar
                    activeOpacity={0.9}
                    avatarStyle={{}}
                    containerStyle={{
                        backgroundColor: '#BDBDBD',
                        marginRight: 0,
                        shadowColor: '#171717',
                        shadowOffset: { width: -1, height: 4 },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                        alignSelf: 'flex-end',
                    }}
                    onPress={() => this.chooseImage()}
                    overlayContainerStyle={{}}
                    placeholderStyle={{}}
                    rounded
                    size='large'
                    source={{
                        uri: picture
                    }}
                    title='P'
                    titleStyle={{}}
                />
                <View
                    style={{
                        marginTop: '30%',
                        flex: 1,
                        justifyContent: 'space-around',
                    }}
                >
                    <Text
                        style={{
                            paddingLeft: '5%',
                            color: 'grey',
                            fontWeight: '500',
                            fontSize: 20
                        }}
                    >{bio}</Text>
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Suggested Friends');
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'black',
                                    fontWeight: '600',
                                    padding: '5%',
                                }}
                            >
                                Suggested Friends
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Edit Profile');
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
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
                                    fontSize: 20,
                                    color: 'black',
                                    fontWeight: '600',
                                    padding: '5%',
                                }}
                            >
                                Change Password
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('PhoneNumber');
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'black',
                                    fontWeight: '600',
                                    padding: '5%',
                                }}
                            >
                                Add Phone Number
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.showLogoutConfirmation()}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
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
                                fontSize: 20,
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

function mapStateToProps(state) { 
    return {
        user: state.user,
        dispatch: state.dispatch
    }
}

export default connect(mapStateToProps)(Profile)
