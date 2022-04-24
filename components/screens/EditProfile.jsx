import React from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Icon } from 'react-native-elements';
import { passwordValidation } from '../../validation/passwordValidation';
import { changePassword as changePasswordAPI } from '../../api/user';

const EditProfile = (props) => {
    const [firstName, setFirstName] = React.useState(props.user.user.firstName);
    const [lastName, setLastName] = React.useState(props.user.user.lastName);
    const [username, setUsername] = React.useState(props.user.user.username);
    const [email, setEmail] = React.useState(props.user.user.email);
    const [bio, setBio] = React.useState(props.user.user.bio);

    const [loading, setLoading] = React.useState(false);

    const [bcolor, setBcolor] = React.useState('transparent');

    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    // const changePassword = async () => {
    //     // make API Call here
    //     if (oldPass === '') {
    //         return Alert.alert('Please enter your old password');
    //     }

    //     const validPass = passwordValidation(newPass);

    //     if (validPass !== '') {
    //         return Alert.alert(validPass);
    //     }
    //     setLoading(true);
    //     const res = await changePasswordAPI({
    //         token: props.user.token,
    //         newPassword: newPass,
    //         currentPassword: oldPass,
    //     });
    //     setLoading(false);
    //     if (res === true) {
    //         props.navigation.goBack();
    //         return Alert.alert('Password successfully changed');
    //     } else return Alert.alert('An error occured. Please try again');
    // };

    return (
        <View
            style={{
                padding: '5%',
                paddingTop: '20%',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}
            >
                <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() => props.navigation.goBack()}
                >
                    <Icon
                        name='chevron-left'
                        type='font-awesome'
                        color='black'
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: '30rem',
                        fontWeight: '600',
                        marginLeft: '5%',
                    }}
                >
                    Edit Profile
                </Text>
            </View>
            <KeyboardAwareScrollView style={{ marginBottom: 50 }}>
                <View
                    style={{
                        marginTop: '10%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: '18rem',
                        }}
                    >
                        First Name
                    </Text>
                    <TextInput
                        style={{
                            width: '100%',
                            marginTop: '5%',
                            fontSize: '12rem',
                            backgroundColor: '#e0e0e0',
                            padding: '5%',
                            borderRadius: 5,
                            color: 'black',
                        }}
                        value={firstName}
                        onChangeText={(t) => setFirstName(t)}
                    />
                    <Text
                        style={{
                            fontSize: '18rem',
                            marginTop: '10%',
                        }}
                    >
                        Last Name
                    </Text>
                    <TextInput
                        style={{
                            width: '100%',
                            marginTop: '5%',
                            fontSize: '12rem',
                            backgroundColor: '#e0e0e0',
                            padding: '5%',
                            borderRadius: 5,
                            color: 'black',
                        }}
                        value={lastName}
                        onChangeText={(t) => setLastName(t)}
                    />
                    <Text
                        style={{
                            fontSize: '18rem',
                            marginTop: '10%',
                        }}
                    >
                        Username
                    </Text>
                    <TextInput
                        style={{
                            width: '100%',
                            marginTop: '5%',
                            fontSize: '12rem',
                            backgroundColor: '#e0e0e0',
                            padding: '5%',
                            borderRadius: 5,
                            color: 'black',
                        }}
                        value={username}
                        onChangeText={(t) => setUsername(t)}
                    />
                    <Text
                        style={{
                            fontSize: '18rem',
                            marginTop: '10%',
                        }}
                    >
                        Email
                    </Text>
                    <TextInput
                        style={{
                            width: '100%',
                            marginTop: '5%',
                            fontSize: '12rem',
                            backgroundColor: '#e0e0e0',
                            padding: '5%',
                            borderRadius: 5,
                            color: 'black',
                        }}
                        value={email}
                        onChangeText={(t) => setEmail(t)}
                    />
                    <Text
                        style={{
                            fontSize: '18rem',
                            marginTop: '10%',
                        }}
                    >
                        Bio
                    </Text>
                    <TextInput
                        style={{
                            width: '100%',
                            marginTop: '5%',
                            fontSize: '12rem',
                            backgroundColor: '#e0e0e0',
                            padding: '5%',
                            borderRadius: 5,
                            color: 'black',
                        }}
                        multiline
                        numberOfLines={8}
                        value={bio}
                        onChangeText={(t) => setBio(t)}
                    />
                </View>
            </KeyboardAwareScrollView>
            {loading && <ActivityIndicator />}
        </View>
    );
};

export default EditProfile;
