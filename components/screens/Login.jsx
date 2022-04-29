import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';

import { emailValidation } from '../../validation/emailValidation';
import { passwordValidation } from '../../validation/passwordValidation';
import { usernameValidation } from '../../validation/usernameValidation';
import { getUser, loginUser } from '../../api/user';
import { connect } from 'react-redux';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const Login = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const [username, setUsername] = useState("");

    const navigation = props.navigation;

    const userPressedLogin = async () => {
        let loginReturn;
        if (login.includes('@')) {
            loginReturn = emailValidation(login);
        } else {
            loginReturn = usernameValidation(login);
        }
        // let emailReturn = emailValidation(email);
        let passwordReturn = passwordValidation(password);

        if (loginReturn !== '' || passwordReturn !== '') {
            if (loginReturn !== '') alert(loginReturn);
            if (passwordReturn !== '') alert(passwordReturn);
            loginReturn = '';
            passwordReturn = '';
            return;
        }
        // Would sent to database at this point
        const data = await loginUser(login, password);
        if (data === null) {
            alert(
                'Error in Email/Username or in Password. Please Fix and try again'
            );
            return;
        }

        const getUserByToken = await getUser(data.token);

        getUserByToken.user.token = data.token;
        props.dispatch({ type: 'SET_USER', user: getUserByToken.user });

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
        <View style={styles.container}>
            <View style={styles.image}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 40,
                        fontWeight: '600',
                        marginLeft: '10%',
                        marginTop: '50%',
                    }}
                >
                    Deadlinr
                </Text>
            </View>
            <View style={styles.inputView}>
                <Text
                    style={{
                        fontSize: 18,
                        marginLeft: '2%',
                        fontWeight: '500',
                    }}
                >
                    Email or Username
                </Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Enter email or username'
                    placeholderTextColor='grey'
                    onChangeText={(login) => setLogin(login)}
                />
            </View>
            <View style={styles.inputView}>
                <Text
                    style={{
                        fontSize: 18,
                        marginLeft: '2%',
                        fontWeight: '500',
                    }}
                >
                    Password
                </Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Enter password'
                    secureTextEntry={true}
                    placeholderTextColor='grey'
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={userPressedLogin}
            >
                <Text style={{ color: 'white' }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Forgot Password')}
            >
                <Text style={styles.forgot_button}>Forgot Password</Text>
            </TouchableOpacity>

            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    title='CREATE ACCOUNT'
                    onPress={() => {
                        /* 1. Navigate to the Details route with params */
                        // props.navigation.navigate("RegistrationForm");
                        props.navigation.navigate('Registration');
                    }}
                    color='#6b5ae8'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginTop: 0,
        marginBottom: 40,
        width: '100%',
        height: '40%',
        backgroundColor: '#6b5ae8',
        justifyContent: 'center',
    },
    inputView: {
        backgroundColor: 'white',
        width: '60%',
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
    forgot_button: {
        height: 30,
        marginTop: 15,
    },
    loginButton: {
        marginTop: '10%',
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 40,
        backgroundColor: '#6b5ae8',
    },
});

function mapStateToProps(state) {
    return {
        user: state.user,
        dispatch: state.dispatch,
    };
}

export default connect(mapStateToProps, null)(Login);
