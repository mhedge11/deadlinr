import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    SectionList,
    StatusBar,
} from 'react-native';

const DATA = [
    {
        id: 1,
        data: [null],
    },
    {
        id: 2,
        data: [1],
    },
    {
        id: 3,
        data: [2],
    },
    {
        id: 4,
        data: [2],
    },
];

const Item = ({ id }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{id}</Text>
    </View>
);

const PostReply = () => (
    <SafeAreaView style={styles.container}>
        <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            // renderItem={({ item }) => <Item title={item} />}
            renderItem={({ item }) => {
                // if (true) {
                return <Item id={item} />;
                // } else {
                // }
            }}
            renderSectionHeader={({ section: { id } }) => (
                <Text style={styles.header}>{id}</Text>
            )}
        />
    </SafeAreaView>
);

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
    reply: {
        marginLeft: 28,
        padding: 20,
        marginVertical: 8,
        backgroundColor: 'orange',
    },
});

export default PostReply;
