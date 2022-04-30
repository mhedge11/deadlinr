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
} from 'react-native';
import { Icon } from 'react-native-elements';
import { createReplyToThread as createReplyToThreadAPI } from '../../api/thread';
import { connect } from 'react-redux';
import { getUser } from '../../api/user';

const CreateReplyToThread = (props) => {
    const [bcolor, setBorderColor] = useState('transparent');
    const [loading, setLoading] = useState(false);

    const [threadName, setThreadName] = useState('');
    const [threadBody, setThreadBody] = useState('');
    const [tid, setTid] = useState(props.route.params.tid);

    const [errMsg, setMsg] = useState('');

    const createReplyToThread = async () => {
        if (!props.user) return Alert.alert('An error occured');
        // if (threadName.trim() === '') return;

        setLoading(true);

        const res = await createReplyToThreadAPI({
            tid,
            threadBody,
            token: props.user['token'],
        });
        setLoading(false);
        if (res !== false) {
            setMsg('');
            const res = await getUser(props.user.token);
            props.dispatch({
                type: 'SET_USER',
                user: {
                    ...res.user,
                    token: props.user.token,
                },
            });

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
                        fontSize: 32,
                        fontWeight: 'bold',
                        marginLeft: '5%',
                    }}
                >
                    Create Reply to Thread
                </Text>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >
                    {props.route.params.threadBody}
                </Text>
            </View>

            <View
                style={{
                    padding: '5%',
                }}
            >
                <Text style={styles.label}>Reply Message</Text>
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
                    onPress={() => createReplyToThread()}
                    disabled={threadBody.length === 0}
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

// export default CreateReplyToThread;
function mapStateToProps(state) {
    return {
        user: state.user,
        dispatch: state.dispatch,
    };
}

export default connect(mapStateToProps)(CreateReplyToThread);
