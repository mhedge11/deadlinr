import React from 'react';
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
import { createCalendar as createCalendarAPI } from '../../api/calendar';

const CreateCalendar = (props) => {
    const [privateCalendar, setPrivate] = React.useState(false);
    const [calendarName, setCalendarName] = React.useState('');
    const [bcolor, setBorderColor] = React.useState('transparent');
    const [loading, setLoading] = React.useState(false);

    const [errMsg, setMsg] = React.useState('');

    const createCalendar = async () => {
        if (!props.user) return Alert.alert('An error occured');
        if (calendarName.trim() === '') return;

        setLoading(true);

        const res = await createCalendarAPI({
            calendarName,
            isPrivate: privateCalendar,
            token: props.user['token'],
        });
        setLoading(false);
        if (res !== false) {
            setMsg('');
            props.setCalendars([
                ...props.calendars,
                {
                    id: res.id,
                    isPrivate: privateCalendar,
                    title: calendarName,
                    tasks: [],
                    members: [],
                },
            ]);
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
                        fontSize: '32rem',
                        fontWeight: '600',
                        marginLeft: '5%',
                    }}
                >
                    Create Calendar
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
                        if (calendarName.length === 0) {
                            setBorderColor('red');
                        } else setBorderColor('transparent');
                    }}
                    placeholder='Calendar Name'
                    value={calendarName}
                    onChangeText={(v) => setCalendarName(v)}
                />
                {bcolor === 'red' && (
                    <Text style={{ color: 'red' }}>
                        Calendar name cannot be empty.
                    </Text>
                )}
            </View>

            <View
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
            </View>

            <View>
                <Button
                    title='Create'
                    onPress={() => createCalendar()}
                    disabled={calendarName.length === 0}
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

export default CreateCalendar;
