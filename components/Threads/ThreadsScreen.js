import React, { useReducer, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
    Button,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

import IndividualThreadScreen from './IndividualThreadScreen';
import ThreadGridTile from './ThreadGridTile';
import CreateThread from './CreateThread';
import { getCalendar } from '../../api/calendar';
import { getUser } from '../../api/user';
import { getThread } from '../../api/thread';

import { connect } from 'react-redux';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ThreadsScreen = (props) => {
    const [calId, setCalId] = useState(props.route.params.calendarId);

    const [threads, setThreads] = React.useState(fetchThreads);

    const [refreshing, setRefreshing] = React.useState(false);
    // console.log(props);

    // const onRefresh = async () => {
    //     setRefreshing(true);
    //     await fetchThreads();
    //     setRefreshing(false);
    // };
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchThreads();
        // setRefreshing(false);
        wait(300).then(() => setRefreshing(false));
    };
    React.useEffect(() => {
        fetchThreads();
    }, []);

    // React.useEffect(() => {
    //     fetchThreads();
    // }, []);

    const fetchThreads = async () => {
        setThreads([]);
        try {
            const threadsInCalendar = await getCalendar({ cid: calId });
            threadsInCalendar.threads.forEach(async (c) => {
                const item = await getThread({ tid: c });
                if (item !== null) {
                    setThreads((c) => [...c, item]);
                }
            });
        } catch (e) {
            console.error(e);
        }
    };

    function renderThreadItem(itemData) {
        function pressHandler() {
            props.navigation.navigate('IndividualThreadScreen', {
                threadObject: itemData.item,
                threadId: itemData.item.id,
                threadArray: itemData.item.body,
                threadReplies: itemData.item.replies,
                calId: calId,
            });
        }
        return <ThreadGridTile thread={itemData.item} onPress={pressHandler} />;
    }
    return (
        <>
            <StatusBar style='light' />

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
                <View>
                    <Button
                        title='Create New Post'
                        onPress={() =>
                            props.navigation.navigate('CreateThread', {
                                calendarId: calId,
                            })
                        }
                    />
                </View>
                <FlatList
                    data={threads}
                    keyExtractor={(item) => item.id}
                    renderItem={renderThreadItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => onRefresh()}
                        />
                    }
                />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

function mapStateToProps(state) {
    return {
        user: state.user,
        dispatch: state.dispatch,
    };
}

export default connect(mapStateToProps)(ThreadsScreen);
