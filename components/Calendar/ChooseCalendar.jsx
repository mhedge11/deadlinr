import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
    RefreshControl,
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { getCalendar } from '../../api/calendar';
import { getUser } from '../../api/user';
import { connect } from 'react-redux';

const ChooseCalendar = (props) => {
    const [calendars, setCalendars] = React.useState([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCalendars();
        setRefreshing(false);
    };
    React.useEffect(() => {
        fetchCalendars();
    }, [props]);

    const fetchCalendars = async () => {
        setCalendars([]);

        try {
            const user = await getUser(props.user.token);
            user.user.calendars.forEach(async (c) => {
                const item = await getCalendar({ cid: c });
                setCalendars((c) => [...c, item]);
            });
        } catch (e) {
            console.error(e);
        }
    };

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
                        <Card>
                            <Card.FeaturedTitle
                                style={{
                                    color: 'black',
                                    fontSize: '30rem',
                                    fontWeight: '300',
                                }}
                            >
                                {c.title}
                            </Card.FeaturedTitle>
                            <Card.Divider />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Icon
                                        type='font-awesome'
                                        name='user'
                                        color='black'
                                    />
                                    <Text
                                        style={{
                                            fontSize: '25rem',
                                        }}
                                    >
                                        {' ' + c.members.length}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Icon
                                        type='font-awesome'
                                        name='bullseye'
                                        color='#fa453e'
                                    />
                                    <Text
                                        style={{
                                            fontSize: '25rem',
                                        }}
                                    >
                                        {' ' + c.deadlines.length}
                                    </Text>
                                </View>
                            </View>
                        </Card>
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
                    padding: '3%',
                    marginTop: '5%',
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => onRefresh()}
                    />
                }
            >
                {renderList()}
            </ScrollView>
        </SafeAreaView>
    );
};

function mapStateToProps(state) {
    return {
        user: state.user,
        calendars: state.calendars,
    };
}

export default connect(mapStateToProps)(ChooseCalendar);
