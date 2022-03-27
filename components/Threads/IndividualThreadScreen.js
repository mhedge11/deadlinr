import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

function IndividualThreadScreen({ route }) {
    const threadId = route.params.threadId;
    const threadArray = route.params.threadArray;
    const threadReplies = route.params.threadReplies;

    // function renderReplyItem(itemData) {
    //     return(
    //         <
    //     );
    // }
    return (
        <SafeAreaView styles={styles.container}>
            <Text> Individual Thread - {threadArray} </Text>
            {/* <FlatList
                data={threadReplies}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item => }
            /> */}

            <Text>{threadReplies}</Text>
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
