import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import IndividualThreadScreen from './IndividualThreadScreen';
import ThreadGridTile from './ThreadGridTile';

const THREADDATA = [
    {
        id: 0,
        title: 'HW 1',
        body: 'How difficult is HW 1?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: ['Why is it this way?', 'Which way to do this?'],
    },
    {
        id: 1,
        title: 'HW 2',
        body: 'How difficult is HW 2?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [1, 2],
    },
    {
        id: 2,
        title: 'HW 3',
        body: 'How difficult is HW 3?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [],
    },
    {
        id: 3,
        title: 'HW 4',
        body: 'How difficult is HW 4?',
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

const ThreadsScreen = ({ route, navigation, onPress }) => {
    function renderThreadItem(itemData) {
        function pressHandler() {
            navigation.navigate('IndividualThreadScreen', {
                threadId: itemData.item.id,
                threadArray: itemData.item.body,
                threadReplies: itemData.item.replies,
            });
        }
        return (
            <ThreadGridTile
                calendar={itemData.item}
                onPress={pressHandler}
                replies={itemData.item.replies}
            />
        );
    }
    return (
        <>
            <StatusBar style='light' />

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={THREADDATA}
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
