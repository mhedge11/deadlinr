import { Pressable, View, Text, StyleSheet } from 'react-native';

// function renderCalendarItem(itemData) {
//     return <CalendarGridTile calendar={itemData.item} />;
// }

// const PostReply = () => (
//     <SafeAreaView style={styles.container}>
//         <FlatList
//             data={CALENDARDATA}
//             keyExtractor={(item) => item.id}
//             renderItem={renderCalendarItem}
//             // numColumns={2}
//         />
//     </SafeAreaView>
// );

function ThreadGridTile({ route, navigation, thread, onPress }) {
    return (
        <View style={styles.gridItem}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : null,
                ]}
                onPress={onPress}
            >
                <View
                    style={[
                        styles.innerContainer,
                        { backgroundColor: 'orange' },
                    ]}
                >
                    <Text style={styles.title}>{thread.title}</Text>
                    <Text style={{ fontSize: 24 }}>{thread.body}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default ThreadGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    },
});
