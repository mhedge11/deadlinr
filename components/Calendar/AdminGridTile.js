import { Pressable, View, Text, StyleSheet } from 'react-native';

function AdminGridTile({ route, navigation, calendar, onPress }) {
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
                        { backgroundColor: '#6b5ae8' },
                    ]}
                >
                    <Text style={styles.title}>
                        {calendar.firstName} {calendar.lastName}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

export default AdminGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 70,
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
        color: 'white',
    },
});
