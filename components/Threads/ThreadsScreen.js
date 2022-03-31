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

const THREADDATA = [
    {
        id: 0,
        title: 'HW 0000',
        body: 'How difficult is HW 1?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [1, 2],
    },
    {
        id: 1,
        title: 'HW 1',
        body: 'How difficult is HW 1?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [3],
    },
    {
        id: 2,
        title: 'HW 2',
        body: 'How difficult is HW 2?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [],
    },
    {
        id: 3,
        title: 'HW 3',
        body: 'How difficult is HW 3?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [],
    },
];

// function renderCalendarItem(itemData) {
//     function pressHandler() {
//         navigation.navigate("Thread Grid Tile", {
//             calendarId: route.params.calendarId,
//         });
//     }
//     return (
//         <ThreadGridTile calendar={itemData.item} onPress={pressHandler} />
//     );
// }

// const calendarId = route.params.calendarId;

// function ThreadsScreen({ route, navigation, onPress }) {
//     const calendarId = route.params.calendarId;
//     return (
//         <SafeAreaView>
//             <View styles={styles.container}>
//                 <Text>Thread Screen - {calendarId} </Text>
//             </View>
//         </SafeAreaView>
//     );
// }
// const calId = '';
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

    // console.log(threads);

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
