import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import {Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';

import { createDeadline as createDeadlineAPI } from '../../api/deadline';


const CreateDeadline = (props) => {

    const [deadlineName, setDeadlineName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [dueDate, setDueDate] = React.useState(new Date());
    const [bcolor, setBorderColor] = React.useState('transparent');
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    const createDeadline = async  () => { 
        if (!props.user) return Alert.alert('An error occured');
        if (deadlineName.trim() === '') return;
        setLoading(true);
        const res = await createDeadlineAPI({
            title: deadlineName,
            dueDate,
            description,
            owner: props.user.user._id,
            groups: [],
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
                        marginTop: '5%'
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

            <View>
                <Button
                    title='Create'
                    onPress={() => createDeadline()}
                    disabled={deadlineName.length === 0 || dueDate <= new Date()}
                />
            </View>
            {
                loading && <ActivityIndicator />
            }

            {
                msg !== '' && <Text style={{ color: 'red', fontSize: 18 }}>{msg}</Text>
            }
        </SafeAreaView>
    )
}

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

export default CreateDeadline;