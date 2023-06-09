import React from 'react';
import {
    View,
    TextInput,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { emailValidation } from '../../validation/emailValidation';
import {
    requestResetCode,
    verifyResetCode as verifyResetCodeAPI,
} from '../../api/user';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const ForgotPassword = (props) => {
    const [email, setEmail] = React.useState('');
    const [emailVerificationSend, setEmailVerificationSent] =
        React.useState(false);
    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [tempprops, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [bcolor, setBColor] = React.useState('transparent');

    const requestCode = async () => {
        if (email.trim() === '') return;
        setLoading(true);
        const res = await requestResetCode({ email });

        if (res) {
            setLoading(false);
            setEmailVerificationSent(true);
        } else {
            setLoading(false);
            return Alert.alert('An error occured');
        }
    };

    const verifyResetCode = async () => {
        // make API CALL
        if (value.length != 6) return;
        setLoading(true);
        const validCode = await verifyResetCodeAPI({ email, code: value });

        if (validCode) {
            setLoading(false);
            props.navigation.navigate('Reset Password', {
                email,
            });
        } else {
            setLoading(false);
            return Alert.alert('Incorrect Code!');
        }
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
                    Forgot Password?
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
                    Enter your email address and we will send a recovery code.
                </Text>

                <TextInput
                    value={email}
                    onChangeText={(t) => setEmail(t.trim())}
                    style={{
                        width: '100%',
                        marginTop: '10%',
                        fontSize: '18rem',
                        backgroundColor: '#e0e0e0',
                        padding: '5%',
                        borderRadius: 5,
                        borderColor: bcolor,
                        borderWidth: 1,
                        color: emailVerificationSend ? 'grey' : 'black',
                    }}
                    onFocus={() => {
                        setBColor('black');
                    }}
                    onBlur={() => {
                        setBColor('transparent');
                    }}
                    placeholder='abc@email.com'
                    editable={!emailVerificationSend}
                ></TextInput>

                <TouchableOpacity
                    style={{
                        marginTop: '5%',
                        alignSelf: 'flex-end',
                        marginRight: '10%',
                    }}
                    onPress={() => requestCode()}
                    disabled={emailVerificationSend}
                >
                    <Icon
                        name='arrow-circle-right'
                        type='font-awesome'
                        color={emailVerificationSend ? 'grey' : 'black'}
                        size={35}
                    />
                </TouchableOpacity>
            </View>

            {emailVerificationSend && (
                <View>
                    <Text
                        style={{
                            marginTop: '10%',
                            fontSize: '18rem',
                        }}
                    >
                        Enter the six digit code sent to your email address.
                    </Text>
                    <CodeField
                        ref={ref}
                        {...tempprops}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType='number-pad'
                        textContentType='oneTimeCode'
                        renderCell={({ index, symbol, isFocused }) => (
                            <View
                                onLayout={getCellOnLayoutHandler(index)}
                                key={index}
                                style={[
                                    styles.cellRoot,
                                    isFocused && styles.focusCell,
                                ]}
                            >
                                <Text style={styles.cellText}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity
                        style={{
                            marginTop: '5%',
                            alignSelf: 'flex-end',
                            marginRight: '10%',
                        }}
                        onPress={() => verifyResetCode()}
                    >
                        <Icon
                            name='arrow-circle-right'
                            type='font-awesome'
                            color='black'
                            size={35}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {loading && <ActivityIndicator />}
        </View>
    );
};

const styles = StyleSheet.create({
    root: { padding: 20, minHeight: 300 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: {
        marginTop: 20,
        width: '100%',
        alignSelf: 'center',
        marginRight: '6githu%',
        // marginLeft: 'auto',
        // marginRight: 'auto',
    },
    cellRoot: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: '3%',
    },
    cellText: {
        color: '#000',
        fontSize: 28,
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },
});

export default ForgotPassword;
