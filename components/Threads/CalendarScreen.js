import { NavigationRouteContext } from '@react-navigation/native';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    SectionList,
    StatusBar,
    FlatList,
} from 'react-native';

// import THREADDATA from '../../mockData/threadsDummyData.js';
import CalendarGridTile from './CalendarGridTile.js';

// const DATA = [
//     {
//         id: 1,
//         data: [null],
//     },
//     {
//         id: 2,
//         data: [1],
//     },
//     {
//         id: 3,
//         data: [2],
//     },
//     {
//         id: 4,
//         data: [2],
//     },
// ];

// const Item = ({ id }) => (
//     <View style={styles.item}>
//         <Text style={styles.title}>{id}</Text>
//     </View>
// );

// const PostReply = () => (
//     <SafeAreaView style={styles.container}>
//         <SectionList
//             sections={DATA}
//             keyExtractor={(item, index) => item + index}
//             // renderItem={({ item }) => <Item title={item} />}
//             renderItem={({ item }) => {
//                 // if (true) {
//                 return <Item id={item} />;
//                 // } else {
//                 // }
//             }}
//             renderSectionHeader={({ section: { id } }) => (
//                 <Text style={styles.header}>{id}</Text>
//             )}
//         />
//     </SafeAreaView>
// );

const CALENDARDATA = [
    {
        id: 0,
        title: 'CS 180',
        isPrivate: false,
        deadlines: [],
        members: ['Jim', 'Nick'],
        threads: [],
    },
    {
        id: 1,
        title: 'CS 240',
        isPrivate: false,
        deadlines: [],
        members: [],
        threads: [],
    },
    {
        id: 2,
        title: 'CS 250',
        isPrivate: false,
        deadlines: [],
        members: [],
        threads: [],
    },
    {
        id: 3,
        title: 'CS 251',
        isPrivate: false,
        deadlines: [],
        members: [],
        threads: [],
    },
    {
        id: 4,
        title: 'CS 252',
        isPrivate: false,
        deadlines: [],
        members: [],
        threads: [],
    },
];

const THREADDATA = [
    {
        id: 0,
        title: 'HW 1',
        body: 'How difficult is HW 1?',
        author: 0,
        timestamp: Date.now,
        lastActivity: Date.now,
        replies: [1, 2],
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

const CalendarScreen = ({ navigation }) => {
    function renderCalendarItem(itemData) {
        function pressHandler() {
            navigation.navigate('ThreadsScreen', {
                calendarId: itemData.item.id,
                threadArray: itemData.item.threads,
            });
        }
        return (
            <CalendarGridTile calendar={itemData.item} onPress={pressHandler} />
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={CALENDARDATA}
                keyExtractor={(item) => item.id}
                renderItem={renderCalendarItem}
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
