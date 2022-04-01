import { Pressable, View, Text, StyleSheet } from 'react-native';
import ThreadGridTile from './ThreadGridTile';

function CalendarGridTile({ route, navigation, calendar, onPress }) {
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
                    <Text style={styles.title}>{calendar.title}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default CalendarGridTile;

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