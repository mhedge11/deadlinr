import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Button,
    TouchableOpacity,
    SectionList,
    StatusBar,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getCalendar } from '../../api/calendar';

import IndvidualThreadGridTile from './IndividualThreadGridTile';
import { fetchUser } from '../../api/user';
import { getThread } from '../../api/thread';

import { createReplyToThread } from '../../api/thread';
import CreateReplyToThread from './CreateReplyToThread';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

function IndividualThreadScreen(props) {
    const navigation = useNavigation();
    const threadId = props.route.params.threadId;
    const threadArray = props.route.params.threadArray;
    const threadReplies = props.route.params.threadReplies;
    // const threadObject = props.route.params.threadObject;
    const [threadObject, setThreadObject] = useState(
        props.route.params.threadObject
    );

    const calId = props.route.params.calId;
    // console.log(calId);

    // const [threadObject, setThreadObject] = React.useState(
    //     props.route.params.threadObject
    // );
    const [replies, setReplies] = React.useState([]);
    const [userName, setUserName] = React.useState('Unknown');
    const [userId, setUserId] = React.useState(
        props.route.params.threadObject.author
    );
    const [uid, setuid] = React.useState(
        props.route.params.threadObject.author
    );
    const [threadBody, setThreadBody] = React.useState('');
    const [rid, setRid] = React.useState(0);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchIndividualThread();
        setRefreshing(false);
    };
    React.useEffect(() => {
        const refreshPage = navigation.addListener('focus', () => {
            fetchIndividualThread();
        });
        return refreshPage;
    }, [navigation]);

    const fetchIndividualThread = async () => {
        setUserName('');
        try {
            const newThread = await getThread({ tid: threadObject._id });
            setThreadObject(newThread);
            let orig = { uid: threadObject.author._id };
            const data = await fetchUser(orig);
            setUserName(data.username);
        } catch (e) {
            console.error(e);
        }
    };

    function Comment({ authorId, node }) {
        setUserId(authorId);
        setThreadBody(node.body);
        setRid(node.id);
        if (!node.replies) {
            return (
                <View>
                    <Text style={{ fontSize: 20, marginLeft: 40, padding: 2 }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            {userName}
                        </Text>
                        {': '}
                        {node.body}
                    </Text>

                    {/* <TouchableOpacity
                        style={styles.replyButton2}
                        onPress={() => {
                            props.navigation.navigate('CreateReplyToReply', {
                                tid: threadObject._id,
                                rid: node.id,
                                threadBody: node.body,
                            });
                        }}
                    >
                        <Text style={{ color: 'white' }}>Reply</Text>
                    </TouchableOpacity> */}
                </View>
            );
        }
        if (!node.title) {
            return (
                <View
                    style={{
                        borderColor: 'grey',
                        paddingVertical: 7,
                        borderWidth: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            marginLeft: 10,
                            padding: 2,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            {userName}
                        </Text>
                        {': '}
                        {node.body}
                    </Text>

                    <TouchableOpacity
                        style={styles.replyButton1}
                        onPress={() => {
                            props.navigation.navigate('CreateReplyToReply', {
                                tid: threadObject._id,
                                rid: node._id,
                                threadBody: node.body,
                            });
                        }}
                    >
                        <Text style={{ color: 'white' }}>Reply</Text>
                    </TouchableOpacity>

                    {node.replies.map((c) => (
                        <Comment key={c._id} node={c} />
                    ))}
                </View>
            );
        } else {
            return (
                <View>
                    {node.replies.map((c) => (
                        <Comment key={c._id} node={c} />
                    ))}
                </View>
            );
        }
    }

    return (
        <>
            <SafeAreaView style={{}}>
                <View
                    style={{
                        padding: '5%',
                        flexDirection: 'row',
                    }}
                >
                    <TouchableOpacity
                        style={{ justifyContent: 'center' }}
                        onPress={() => props.navigation.goBack()}
                    >
                        <Icon
                            name='chevron-left'
                            type='font-awesome'
                            color='black'
                        />
                    </TouchableOpacity>
                </View>
                <View styles={styles.headline}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                marginLeft: 10,
                                fontWeight: 'bold',
                            }}
                        >
                            {threadObject.title}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 30,

                                    paddingBottom: 5,
                                }}
                            >
                                {threadObject.body}
                            </Text>

                            <TouchableOpacity
                                style={{
                                    marginTop: 9,
                                    marginLeft: 10,
                                    width: '14%',
                                    borderRadius: 25,
                                    height: 22,
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    backgroundColor: 'blue',
                                }}
                                onPress={() => {
                                    props.navigation.navigate(
                                        'CreateReplyToThread',
                                        {
                                            tid: threadObject._id,
                                            threadBody: threadObject.body,
                                        }
                                    );
                                }}
                            >
                                <Text style={{ color: 'white' }}>Reply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <ScrollView
                            style={{ height: '80%' }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => onRefresh()}
                                />
                            }
                        >
                            <View styles={styles.container}>
                                <Comment
                                    authorId={threadObject.author._id}
                                    node={threadObject}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}

export default IndividualThreadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    headline: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        backgroundColor: 'yellow',
    },
    replyButton1: {
        marginLeft: 10,
        width: '14%',
        borderRadius: 25,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    replyButton2: {
        marginLeft: 40,
        width: '14%',
        borderRadius: 25,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
});
