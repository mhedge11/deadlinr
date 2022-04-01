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
import { createReplyToReply as createReplyToReplyOfThreadAPI } from '../../api/thread';

const CreateReplyToReply = (props) => {
    // console.log(props);
    const [bcolor, setBorderColor] = useState('transparent');
    const [loading, setLoading] = useState(false);

    const [threadName, setThreadName] = useState('');
    const [threadBody, setThreadBody] = useState('');
    // const [cid, setcid] = useState(props.route.params.calendarId);
    const [tid, setTid] = useState(props.route.params.tid);
    // const cid = calId;
    // setcid(calId);
    // console.log(cid);
    // setcid(route.params.calendarId);
    const [errMsg, setMsg] = useState('');

    // Need to put this in variable and then not reset it unless
    // Something changes
    // So put it into a function and only run when necessary
    // setcid('6241d84925e0bb632f32ddf5');

    const createReplyToReply = async () => {
        if (!props.user) return Alert.alert('An error occured');
        if (threadName.trim() === '') return;

        setLoading(true);

        const res = await createReplyToReplyOfThreadAPI({
            tid,
            rid,
            threadBody,
            token: props.user['token'],
        });
        setLoading(false);
        if (res !== false) {
            setMsg('');
            // props.setCalendars([
            //     ...props.calendars,
            //     {
            //         id: res.id,
            //         isPrivate: privateCalendar,
            //         title: calendarName,
            //         tasks: [],
            //         members: [],
            //     },
            // ]);
            // props.navigation.goBack();
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
        // <View>
        //     <Text>On Page</Text>
        // </View>
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
                    // onPress={() => navigation.navigate.goBack()}
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
                    Create Reply to Reply
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
                        // fontWeight: 'bold',
                    }}
                >
                    {props.route.params.threadBody}
                </Text>
                {/* <Text>{tid}</Text> */}
            </View>

            {/* <View
                style={{
                    padding: '5%',
                }}
            >
                <Text style={styles.label}>{threadBody}</Text>
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
                />
                {bcolor === 'red' && (
                    <Text style={{ color: 'red' }}>
                        Thread name cannot be empty.
                    </Text>
                )}
            </View> */}

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

            {/* <View
                style={{
                    padding: '5%',
                }}
            >
                <Text style={styles.label}>Private</Text>
                <Switch
                    style={{
                        marginTop: '3%',
                    }}
                    value={privateCalendar}
                    onValueChange={() => setPrivate(!privateCalendar)}
                    trackColor={{ false: 'white', true: '#2776f5' }}
                />
            </View> */}

            <View>
                <Button
                    title='Make it so'
                    onPress={() => createReplyToReply()}
                    // onPress={() => {}}
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

export default CreateReplyToReply;
