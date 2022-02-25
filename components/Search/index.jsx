import React, { useEffect, useState } from 'react';
import { SearchBar } from 'react-native-elements';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Platform,
    FlatList,
    TouchableOpacity,
    Modal,
    Alert,
    Pressable,
    Button,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { searchForAllCalendars } from '../../api/calendar';

/*
This is Calendar Searching
to add to your list of calendars
Is represented by magnifying glass
*/

const Search = (props) => {
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [data, setData] = useState([]);
    const [allCalendars, setAllCalendars] = useState([]);

    useEffect(() => {
        initialFetch();
    }, []);

    const initialFetch = async () => {
        const newAllCalendars = await searchForAllCalendars(search);
        setAllCalendars(newAllCalendars);
        setData(newAllCalendars);
    };

    const updateSearch = async () => {
        if (allCalendars) {
            let newData = { ...allCalendars };
            newData.items = newData.items.filter((val) => {
                return val.title.toLowerCase().startsWith(search.toLowerCase());
            });
            setData(newData);
        }
    };

    const AddCalendars = () => {
        alert('Calendars would be added now. Success.');
        props.navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centeredView}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('modal is closed');
                        props.navigation.goBack();
                    }}
                >
                    <View style={styles.bar}>
                        <SearchBar
                            placeholder='Search here...'
                            // onChangeText={updateSearch}
                            onChangeText={(text) => setSearch(text.trim())}
                            value={search}
                            lightTheme
                            round
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Button title='Search' onPress={updateSearch} />
                            <Button
                                title='Close'
                                onPress={() => {
                                    setModalVisible(false);
                                    props.navigation.goBack();
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={[styles.modalView]}>
                            <View style={{ height: '80%', marginBottom: 30 }}>
                                <View
                                    style={[
                                        styles.textStyle,
                                        { alignItems: 'center' },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: 'bold',
                                            margin: 5,
                                        }}
                                    >
                                        Add Public Calendars
                                    </Text>
                                </View>
                                <FlatList
                                    data={data.items}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity>
                                            <View
                                                style={[
                                                    styles.textInput,
                                                    { borderRadius: 20 },
                                                ]}
                                            >
                                                <Text style={{ fontSize: 18 }}>
                                                    {item.title}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <Pressable
                                // onPress={() => props.navigation.goBack()}
                                onPress={AddCalendars}
                                style={[styles.button, styles.modalClose]}
                            >
                                <Text style={styles.textStyle}>
                                    Add Calendars
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>

            <View
                style={{
                    marginTop: 10,
                    padding: 20,
                    alignItems: 'center',
                    //   backgroundColor: "grey",
                    width: '100%',
                    height: 100,
                }}
            ></View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    centeredView: {
        padding: '10%',
    },
    textInput: {
        marginTop: 10,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'grey',
        width: '100%',
    },
    bar: {
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'whitesmoke',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    modalOpen: {
        backgroundColor: 'black',
    },
    modalClose: {
        backgroundColor: 'seagreen',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
    },
});

export default Search;
