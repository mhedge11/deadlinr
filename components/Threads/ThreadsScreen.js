import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
    Button,
} from 'react-native';
import IndividualThreadScreen from './IndividualThreadScreen';
import ThreadGridTile from './ThreadGridTile';
// import { THREADDATA } from '../../mockData/threadsDummyData.js';
import CreateThread from './CreateThread';
import { getCalendar } from '../../api/calendar';
import { getUser } from '../../api/user';
import { getThread } from '../../api/thread';

const ThreadsScreen = (props) => {
    // console.log('ThreadsScreen');
    // console.log(props.route);
    const [calId, setCalId] = useState('');

    const [threads, setThreads] = React.useState([]);

    React.useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async () => {
        setThreads([]);
        try {
            props.route.params.threadArray.forEach(async (c) => {
                const item = await getThread({ tid: c });
                if (item !== null) {
                    setThreads((c) => [...c, item]);
                }
            });
        } catch (e) {
            console.error(e);
        }
    };

    console.log(threads);

    function renderThreadItem(itemData) {
        setCalId(itemData.item.id);
        // calId = itemData.item.id;
        function pressHandler() {
            props.navigation.navigate('IndividualThreadScreen', {
                threadObject: itemData.item,
                threadId: itemData.item.id,
                threadArray: itemData.item.body,
                threadReplies: itemData.item.replies,
            });
        }
        return (
            <ThreadGridTile
                thread={itemData.item}
                onPress={pressHandler}
                // calendar={itemData.item}
                // onPress={pressHandler}
                // replies={itemData.item.replies}
            />
        );
    }
    return (
        <>
            <StatusBar style='light' />

            <SafeAreaView style={styles.container}>
                <View>
                    <Button
                        title='Create New Post'
                        onPress={() =>
                            props.navigation.navigate('CreateThread', {
                                calendarId: calId,
                                // threadArray: itemData.item.threads,
                            })
                        }
                        // onPress={() => {}}
                    />
                </View>
                <FlatList
                    data={threads}
                    keyExtractor={(item) => item.id}
                    renderItem={renderThreadItem}
                />
            </SafeAreaView>
        </>
    );
};

export default ThreadsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
