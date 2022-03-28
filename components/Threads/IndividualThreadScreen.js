import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Button,
    TouchableOpacity,
} from 'react-native';
import IndividualThreadItem from './IndividualThreadItem';

// import { THREADDATA } from '../../mockData/threadsDummyData.js';

// console.log(THREADDATA);

const THREADDATA = [
    {
        id: 0,
        title: 'HW 0',
        body: 'How difficult is HW 1?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [1, 2],
    },
    {
        id: 1,
        title: 'HW 1',
        body: 'HW1 is not bad at all',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [3],
    },
    {
        id: 2,
        title: 'HW 2',
        body: 'HW2 is difficult',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [],
    },
    {
        id: 3,
        title: 'HW 3',
        body: 'How difficult is HW 4?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [],
    },
];

// const THREADDATA = [];

function IndividualThreadScreen(props) {
    const threadId = props.route.params.threadId;
    const threadArray = props.route.params.threadArray;
    const threadReplies = props.route.params.threadReplies;

    // console.log(calendars);

    const displayedIndividualThreads = THREADDATA.filter((threadItem) => {
        return threadItem.replies.indexOf(threadId) >= 0;
    });

    function renderIndividualThreadItem(itemData) {
        return <IndividualThreadItem threadWords={itemData.item.title} />;
    }
    return (
        <SafeAreaView styles={styles.container}>
            {/* <Text> Individual Thread - {threadArray} </Text> */}
            <FlatList
                data={displayedIndividualThreads}
                keyExtractor={(item) => item.id}
                renderItem={renderIndividualThreadItem}
            />

            {/* <Text>{threadReplies}</Text> */}
        </SafeAreaView>
    );
}

export default IndividualThreadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
