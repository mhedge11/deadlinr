import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { getCalendar } from '../../api/calendar';
import { getUser } from '../../api/user';

const ChooseCalendar = (props) => {

    const [calendars, setCalendars] = React.useState([]);

    React.useEffect(() => { 
        fetchCalendars();
    }, []);

    fetchCalendars = async () => {
        setCalendars([]);
        try {
            const user = await getUser(props.user.token);
            user.user.calendars.forEach(async (c) => {
                const item = await getCalendar({ cid: c })
                setCalendars(c => [
                    ...c,
                    item
                ])
            });
        } catch (e) { console.error(e); }
    }

   

    const renderList = () => {
        let elems = [];
        let swipeBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                // type: 'delete',
                onPress: () => {
                    // delete this task
                    return Alert.alert(
                        'Are your sure?',
                        'Are you sure you want to remove this calendar?',
                        [
                            {
                                text: 'Yes',
                                onPress: () => {
                                    // remove calendar add API Call
                                },
                            },
                            {
                                text: 'No',
                                // do nothing
                            },
                        ]
                    );
                },
            },
        ];
        calendars.forEach((c) => {
            elems.push(
                <Swipeout
                    id={c.id}
                    right={swipeBtns}
                    style={{
                        backgroundColor: 'transparent',
                        marginTop: '10%',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Calendar View', {
                                ...c,
                            });
                        }}
                    >
                        <Text
                            style={{
                                color: 'black',
                                fontSize: '30rem',
                            }}
                        >
                            {c.title}
                        </Text>
                    </TouchableOpacity>
                </Swipeout>
            );
        });
        return elems;
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: '5%',
                    justifyContent: 'space-around',
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
                    }}
                >
                    Choose Calendar
                </Text>
                <Button
                    style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                    title='Create Calendar'
                    onPress={() => props.navigation.navigate('Create Calendar')}
                />
            </View>
            <ScrollView
                style={{
                    padding: '5%',
                    marginTop: '5%',
                }}
            >
                {renderList()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChooseCalendar;
