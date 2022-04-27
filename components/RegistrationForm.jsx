import React from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { emailValidation } from '../validation/emailValidation';
import { nameValidation } from '../validation/nameValidation';
import { passwordValidation } from '../validation/passwordValidation';
import { usernameValidation } from '../validation/usernameValidation';
import { createUser } from '../api/user';

const RegistrationForm = (props) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmission = async () => {
        emailReturn = '';
        passwordReturn = '';
        firstNameReturn = '';
        lastNameReturn = '';
        usernameReturn = '';

        setLoading(false);

        let emailReturn = emailValidation(email);
        let passwordReturn = passwordValidation(password);
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

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (emailReturn !== '' || passwordReturn !== '') {
            if (emailReturn !== '') alert(emailReturn);
            if (passwordReturn !== '') alert(passwordReturn);
            return;
        }

        // Would send to database at this point
        // Will have to check that email is unique and username is unique
        const data = await createUser(
            firstName,
            lastName,
            email,
            username,
            password
        );

        if (data === null) {
            alert('Error creating user');
            return;
        }

        props.setUser({
            user: data,
            token: data.token,
        });
    };

    if (loading) {
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

    return (
        <KeyboardAwareScrollView style={{ marginVertical: 50 }}>
            <View style={styles.container}>
                <View
                    style={styles.image}
                >
                <Text
                    style={{
                        color: "white",
                        fontSize: 40,
                        fontWeight: '600',
                        marginLeft: '5%',
                        marginTop: '30%',
                    }}
                >Create Account</Text>
                </View>
            <ScrollView
                style={{
                    marginTop: '10%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    marginBottom: '15%',
                }}
            >
                <View style={styles.inputView}>
                    <Text
                        style={{
                            fontSize: 18,
                            marginLeft: '2%',
                            fontWeight: '500',
                        }}
                    >First Name</Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Enter First Name'
                        placeholderTextColor='grey'
                        onChangeText={(firstName) => setFirstName(firstName)}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text
                        style={{
                            fontSize: 18,
                            marginLeft: '2%',
                            fontWeight: '500',
                        }}
                    >Last Name</Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Enter Last Name'
                        placeholderTextColor='grey'
                        onChangeText={(lastName) => setLastName(lastName)}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text
                        style={{
                            fontSize: 18,
                            marginLeft: '2%',
                            fontWeight: '500',
                        }}
                    >Username</Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Enter Username'
                        placeholderTextColor='grey'
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text
                        style={{
                            fontSize: 18,
                            marginLeft: '2%',
                            fontWeight: '500',
                        }}
                    >Email</Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Enter email'
                        placeholderTextColor='grey'
                        onChangeText={(email) => setEmail(email)}

                        // onChangeText={handleEmail}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text
                        style={{
                            fontSize: 18,
                            marginLeft: '2%',
                            fontWeight: '500',
                        }}
                    >Password</Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Enter password'
                        secureTextEntry={true}
                        placeholderTextColor='grey'
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text
                        style={{
                            fontSize: 18,
                            marginLeft: '2%',
                            fontWeight: '500',
                        }}
                    >Confirm Password</Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                        placeholderTextColor='grey'
                        onChangeText={(confirmPassword) =>
                            setConfirmPassword(confirmPassword)
                        }
                    />
                </View>
               
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleSubmission}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: '600',
                            textAlign: 'center'
                        }}
                    >Register
                    </Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: '20%',
        backgroundColor: '#6b5ae8',
    },
    inputView: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: '7%',
    },
    TextInput: {
        marginTop: '5%',
        fontSize: 18,
        borderRadius: 8,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: '2%',
    },
    registerButton: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6b5ae8',
        alignSelf: 'center',
    },
});

export default RegistrationForm;
