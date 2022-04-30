import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    TextInput,
    Switch,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import { createThread as createThreadAPI } from '../../api/thread';

import { connect } from 'react-redux';

const CreateThread = (props) => {
    const [bcolor, setBorderColor] = useState('transparent');
    const [loading, setLoading] = useState(false);

    const [threadName, setThreadName] = useState('');
    const [threadBody, setThreadBody] = useState('');
    const [cid, setcid] = useState(props.route.params.calendarId);

    const [errMsg, setMsg] = useState('');

    const createThread = async () => {
        if (!props.user) return Alert.alert('An error occured');
        if (threadName.trim() === '') return;
        setLoading(true);
        const res = await createThreadAPI({
            threadName,
            threadBody,
            cid,
            token: props.user['token'],
        });
        setLoading(false);
        if (res !== false) {
            setMsg('');

            props.navigation.goBack();
            return;
        } else {
            setMsg('An error occured. Please try again later.');
        }
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <KeyboardAwareScrollView style={{ marginVertical: 50 }}>
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        padding: '5%',
                        flexDirection: 'row',
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
                            fontSize: '32rem',
                            fontWeight: 'bold',
                            marginLeft: '5%',
                        }}
                    >
                        Create Thread
                    </Text>
                </View>

                <View
                    style={{
                        padding: '5%',
                    }}
                >
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={{
                            ...styles.input,
                            borderColor: bcolor,
                            borderWidth: 2,
                        }}
                        onBlur={() => {
                            if (threadName.length === 0) {
                                setBorderColor('red');
                            } else setBorderColor('transparent');
                        }}
                        placeholder='Thread Name'
                        value={threadName}
                        onChangeText={(v) => setThreadName(v)}
                        clearButtonMode='always'
                    />
                    {bcolor === 'red' && (
                        <Text style={{ color: 'red' }}>
                            Thread name cannot be empty.
                        </Text>
                    )}
                </View>

                <View
                    style={{
                        padding: '5%',
                    }}
                >
                    <Text style={styles.label}>Message</Text>
                    <TextInput
                        style={{
                            ...styles.input,
                            borderColor: bcolor,
                            borderWidth: 2,
                        }}
                        onBlur={() => {
                            if (threadBody.length === 0) {
                                setBorderColor('red');
                            } else setBorderColor('transparent');
                        }}
                        placeholder='Thread Body'
                        value={threadBody}
                        onChangeText={(v) => setThreadBody(v)}
                        multiline
                        clearButtonMode='always'
                    />
                    {bcolor === 'red' && (
                        <Text style={{ color: 'red' }}>
                            Thread message body cannot be empty.
                        </Text>
                    )}
                </View>

                <View>
                    <Button
                        title='Make it so'
                        onPress={() => createThread()}
                        disabled={
                            threadName.length === 0 || threadBody.length === 0
                        }
                    />
                </View>

                {errMsg.length > 0 && (
                    <View
                        style={{
                            padding: '15%',
                            bottom: 0,
                        }}
                    >
                        <Text
                            style={{
                                color: 'red',
                                fontSize: '20rem',
                                fontWeight: '500',
                            }}
                        >
                            {errMsg}
                        </Text>
                    </View>
                )}
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        marginTop: '2%',
        fontSize: 20,
        color: '#0761f2',
        padding: '3%',
        borderRadius: 15,
        backgroundColor: '#ebebeb',
    },
    label: {
        fontSize: 25,
        color: 'black',
        marginLeft: '1%',
    },
});

function mapStateToProps(state) { 
    return {
        user: state.user,
        dispatch: state.dispatch
    }
}

export default connect(mapStateToProps)(CreateThread);
