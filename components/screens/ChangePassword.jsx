import React from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { passwordValidation } from '../../validation/passwordValidation';
import { changePassword as changePasswordAPI } from '../../api/user';

const ChangePassword = (props) => {
    const [oldPass, setOldPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [confirmNewPass, setConfirmNewPass] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const [bcolor, setBcolor] = React.useState('transparent');

    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const changePassword = async () => {
        // make API Call here
        if (oldPass === '') {
            return Alert.alert('Please enter your old password');
        }

        const validPass = passwordValidation(newPass);

        if (validPass !== '') {
            return Alert.alert(validPass);
        }
        setLoading(true);
        const res = await changePasswordAPI({
            token: props.user.token,
            newPassword: newPass,
            currentPassword: oldPass,
        });
        setLoading(false);
        if (res === true) {
            props.navigation.goBack();
            return Alert.alert('Password successfully changed');
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
                    Reset Password
                </Text>
            </View>

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
                    Enter your old password
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
                    value={oldPass}
                    onChangeText={(t) => setOldPass(t)}
                    secureTextEntry
                />
                <Text
                    style={{
                        fontSize: '18rem',
                        marginTop: '10%',
                    }}
                >
                    Enter your new password
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
                    value={newPass}
                    onChangeText={(t) => setNewPass(t)}
                    secureTextEntry
                />
                <Text
                    style={{
                        fontSize: '18rem',
                        marginTop: '10%',
                    }}
                >
                    Confirm your new password
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
                        borderColor: bcolor,
                        borderWidth: 1,
                    }}
                    value={confirmNewPass}
                    onChangeText={(t) => setConfirmNewPass(t)}
                    secureTextEntry
                    onBlur={() => {
                        if (confirmNewPass !== newPass) {
                            setShowErrorMessage(true);
                            setBcolor('red');
                        } else {
                            setShowErrorMessage(false);
                            setBcolor('transparent');
                        }
                    }}
                />

                {showErrorMessage && (
                    <Text style={{ color: 'red' }}>
                        Passwords do not match!
                    </Text>
                )}
                <View
                    style={{
                        marginTop: '10%',
                    }}
                >
                    <Button
                        disabled={showErrorMessage}
                        title='Change Password'
                        onPress={() => changePassword()}
                    />
                </View>
            </View>
            {loading && <ActivityIndicator />}
        </View>
    );
};

export default ChangePassword;
