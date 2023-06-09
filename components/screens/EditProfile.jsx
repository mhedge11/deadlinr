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
import { editProfile as editProfileAPI } from '../../api/user';
import { emailValidation } from '../../validation/emailValidation';
import { nameValidation } from '../../validation/nameValidation';
import { usernameValidation } from '../../validation/usernameValidation';
import { getUser } from '../../api/user';

import { connect } from 'react-redux';

const EditProfile = (props) => {
    const [firstName, setFirstName] = React.useState(props.user.firstName);
    const [lastName, setLastName] = React.useState(props.user.lastName);
    const [username, setUsername] = React.useState(props.user.username);
    const [email, setEmail] = React.useState(props.user.email);
    const [bio, setBio] = React.useState(props.user.bio);

    const [loading, setLoading] = React.useState(false);

    const [bcolor, setBcolor] = React.useState('transparent');

    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const editProfile = async () => {
        // make API Call here
        // console.log(props.user);
        emailReturn = '';
        firstNameReturn = '';
        lastNameReturn = '';
        usernameReturn = '';

        setLoading(false);

        let emailReturn = emailValidation(email);
        let firstNameReturn = nameValidation(firstName);
        let lastNameReturn = nameValidation(lastName);
        let usernameReturn = usernameValidation(username);

        if (
            firstNameReturn !== '' ||
            lastNameReturn !== '' ||
            usernameReturn !== ''
        ) {
            if (firstNameReturn !== '') {
                alert(firstNameReturn);
            } else if (lastNameReturn !== '') {
                alert(lastNameReturn);
            } else if (usernameReturn !== '') {
                alert(usernameReturn);
            }
            return;
        }

        if (emailReturn !== '') {
            if (emailReturn !== '') alert(emailReturn);
            return;
        }

        setLoading(true);
        const res = await editProfileAPI({
            token: props.user.token,
            firstName,
            lastName,
            email,
            username,
            bio,
        });

        setLoading(false);
        if (res === true) {
            const user = await getUser(props.user.token);
            props.dispatch({
                type: 'SET_USER',
                user: { ...user.user, token: props.user.token },
            });
            props.navigation.goBack();

            return Alert.alert('User successfully updated');
        } else return Alert.alert('An error occured. Please try again');
    };

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
                        clearButtonMode='always'
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
                        clearButtonMode='always'
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
                        clearButtonMode='always'
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
                        clearButtonMode='always'
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
                        clearButtonMode='always'
                    />
                    <View
                        style={{
                            marginTop: '10%',
                        }}
                    >
                        <Button title='Submit' onPress={() => editProfile()} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {loading && <ActivityIndicator />}
        </View>
    );
};

function mapStateToProps(state) {
    return {
        user: state.user,
        dispatch: state.dispatch,
    };
}

export default connect(mapStateToProps)(EditProfile);
