import { NavigationRouteContext } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    SectionList,
    StatusBar,
    FlatList,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

import CalendarGridTile from './CalendarGridTile.js';
import { getCalendar } from '../../api/calendar';
import { getUser } from '../../api/user';

const CalendarScreen = (props) => {
    const [calendars, setCalendars] = React.useState([]);

    // React.useEffect(() => {
    //     fetchCalendars();
    // }, []);

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
                if (item !== null) {
                    setCalendars((c) => [...c, item]);
                }
            });
        } catch (e) {
            console.error(e);
        }
    };

    function renderCalendarItem(itemData) {
        function pressHandler() {
            props.navigation.navigate('ThreadsScreen', {
                calendarId: itemData.item._id,
                threadArray: itemData.item.threads,
            });
        }
        return (
            <CalendarGridTile calendar={itemData.item} onPress={pressHandler} />
        );
    }
    return (
        <SafeAreaView style={styles.container}>
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
            </View>
            <FlatList
                data={calendars}
                keyExtractor={(item) => item.id}
                renderItem={renderCalendarItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => onRefresh()}
                    />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
    pageTitle: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reply: {
        marginLeft: 28,
        padding: 20,
        marginVertical: 8,
        backgroundColor: 'orange',
    },
});

export default CalendarScreen;
