import React, { useState } from 'react';
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
} from 'react-native';
import { Icon } from 'react-native-elements';

const JoinCalendar = (props) => {
    const data = [
        { id: '1', title: 'Dr J' },
        { id: '2', title: 'MJ' },
        { id: '3', title: 'Chuck' },
        { id: '4', title: 'Shaq' },
        { id: '5', title: 'Kobe' },
        { id: '6', title: 'Reggie' },
        { id: '7', title: 'Lebron' },
        { id: '8', title: 'Steph' },
        { id: '9', title: 'KD' },
    ];

    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const updateSearch = (search) => {
        setSearch(search);
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
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.bar}>
                        <SearchBar
                            placeholder='Search here...'
                            onChangeText={updateSearch}
                            value={search}
                            lightTheme
                            round
                        />
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
                                        Add People to Calendar
                                    </Text>
                                </View>
                                <FlatList
                                    data={data}
                                    keyExtractor={(item) => item.id}
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
                                onPress={() => setModalVisible(!modalVisible)}
                                style={[styles.button, styles.modalClose]}
                            >
                                <Text style={styles.textStyle}>
                                    CLICK TO INVITE
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
            >
                <Pressable
                    onPress={() => setModalVisible(true)}
                    style={[
                        styles.button,
                        styles.modalOpen,
                        { backgroundColor: 'black' },
                    ]}
                >
                    <Icon
                        name='paper-plane'
                        type='font-awesome'
                        color='white'
                    />
                    <Text style={[{ color: 'white' }]}>Invite</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 5,
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

export default JoinCalendar;
