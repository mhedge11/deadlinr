import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    TextInput,
    SafeAreaView,
    ActivityIndicator,
    Modal,
    Pressable,
    ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import { createDeadline as createDeadlineAPI } from '../../api/deadline';
import { findSimilar } from '../../api/deadline';

import { connect } from 'react-redux';

const CreateDeadline = (props) => {
    const [deadlineName, setDeadlineName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [dueDate, setDueDate] = React.useState(new Date());
    const [bcolor, setBorderColor] = React.useState('transparent');
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [group, setGroup] = React.useState('');

    const [shownSimilar, setShownSimilar] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [similarDeadlines, setSimilarDeadlines] = React.useState([]);

    const showSimilarDeadlines = async () => {
        setLoading(true);
        const res = await findSimilar({
            cid: props.route.params.calendarID,
            deadlineData: {
                title: deadlineName,
                dueDate,
            },
            token: props.user['token'],
        });
        setLoading(false);
        setShownSimilar(true);
        if (res.length > 0) {
            setModalVisible(true);
            setSimilarDeadlines(res);
            return true;
        }
        return false;
    };

    const createDeadline = async () => {
        if (!props.user) return Alert.alert('An error occured');
        if (deadlineName.trim() === '') return;
        setDeadlineName(deadlineName.trim());
        if (!shownSimilar) {
            const hasSimilar = await showSimilarDeadlines();
            if (hasSimilar) return;
        }

        setLoading(true);
        const res = await createDeadlineAPI({
            title: deadlineName,
            dueDate,
            description,
            owner: props.user._id,
            groups: [group],
            calendar: props.route.params.calendarID,
            votesRemaining: props.route.params.members.length,
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
                        fontSize: '32rem',
                        fontWeight: '600',
                        marginLeft: '5%',
                    }}
                >
                    Create Deadline
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
                        if (deadlineName.length === 0) {
                            setBorderColor('red');
                        } else setBorderColor('transparent');
                    }}
                    placeholder='Deadline Name'
                    value={deadlineName}
                    onChangeText={(v) => setDeadlineName(v)}
                />
                {bcolor === 'red' && (
                    <Text style={{ color: 'red' }}>
                        Deadline name cannot be empty.
                    </Text>
                )}
            </View>
            <View
                style={{
                    padding: '5%',
                }}
            >
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={{
                        ...styles.input,
                        borderColor: bcolor,
                        borderWidth: 2,
                    }}
                    placeholder='Deadline description'
                    value={description}
                    onChangeText={(v) => setDescription(v)}
                />
            </View>

            <View
                style={{
                    padding: '5%',
                }}
            >
                <Text style={styles.label}>Due Date</Text>
                <View
                    style={{
                        paddingRight: '20%',
                        marginTop: '5%',
                    }}
                >
                    <DateTimePicker
                        value={dueDate}
                        mode='datetime'
                        onChange={(e, d) => {
                            setDueDate(d);
                        }}
                    />
                </View>
            </View>
            <View
                style={{
                    padding: '5%',
                }}
            >
                <Text style={styles.label}>Groups</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Add group name'
                    value={group}
                    onChangeText={(v) => setGroup(v)}
                />
            </View>
            <View>
                <Button
                    title='Create'
                    onPress={() => createDeadline()}
                    disabled={
                        deadlineName.length === 0 ||
                        dueDate <= new Date() ||
                        group.trim() === ''
                    }
                />
            </View>
            {loading && <ActivityIndicator />}

            {msg !== '' && (
                <Text style={{ color: 'red', fontSize: 18 }}>{msg}</Text>
            )}
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Looks like there are similar deadlines!
                        </Text>

                        <ScrollView>
                            {similarDeadlines.map((d) => {
                                return (
                                    <View
                                        style={{
                                            marginTop: '20%',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 25,
                                            }}
                                        >
                                            {d.title}
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: '400',
                                                fontSize: 20,
                                            }}
                                        >
                                            Due: {d.dueDate.slice(0, 10)}
                                        </Text>
                                    </View>
                                );
                            })}
                        </ScrollView>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        // marginBottom: 15,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '200',
    },
});

function mapStateToProps(state) {
    return {
        user: state.user,
        dispatch: state.dispatch,
    };
}

export default connect(mapStateToProps)(CreateDeadline);
