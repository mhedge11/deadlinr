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
} from 'react-native';
import IndvidualThreadGridTile from './IndividualThreadGridTile';
import { fetchUser } from '../../api/user';
// import { threadReply } from '../../api/user';
import { createReplyToThread } from '../../api/thread';
import CreateReplyToThread from './CreateReplyToThread';

function IndividualThreadScreen(props) {
    const threadId = props.route.params.threadId;
    const threadArray = props.route.params.threadArray;
    const threadReplies = props.route.params.threadReplies;
    const threadObject = props.route.params.threadObject;
    // console.log(threadObject.replies);

    const [replies, setReplies] = React.useState([]);
    const [userName, setUserName] = React.useState('Unknown');
    const [userId, setUserId] = React.useState(threadObject.author);
    const [uid, setuid] = React.useState(threadObject.author);
    const [threadBody, setThreadBody] = React.useState('');

    // Fetching individual Threads
    React.useEffect(() => {
        fetchIndividualThread();
    }, []);

    const fetchIndividualThread = async () => {
        setUserName('');
        try {
            let orig = { uid: threadObject.author._id };
            const data = await fetchUser(orig);
            setUserName(data.username);
        } catch (e) {
            console.error(e);
        }
    };

    // Fetching Replies
    // React.useEffect(() => {
    //     fetchReply();
    // }, []);

    // const fetchReply = async () => {
    //     setUserName('');
    //     try {
    //         let orig = { tid: threadId, threadBody: threadBody };
    //         const data = await createReplyToThread(orig);
    //         // setUserName(data.username);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    function Comment({ authorId, node }) {
        setUserId(authorId);
        setThreadBody(node.body);
        console.log('----');
        console.log(node.author.username);
        if (!node.replies) {
            return (
                <View>
                    <Text style={{ fontSize: 20, marginLeft: 40, padding: 2 }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {userName} {': '}
                        </Text>

                        <Text>{node.body}</Text>
                    </Text>

                    <TouchableOpacity
                        style={styles.replyButton2}
                        onPress={() => {
                            props.navigation.navigate('CreateReplyToReply', {
                                tid: threadObject._id,
                                rid: node.id,
                                threadBody: node.body,
                                // calendarId: calId,
                            });
                        }}
                    >
                        <Text style={{ color: 'white' }}>Reply</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        if (!node.title) {
            return (
                <View>
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
                            props.navigation.navigate('CreateReplyToThread', {
                                tid: threadObject._id,
                                threadBody: node.body,
                                // calendarId: calId,
                            });
                        }}
                    >
                        <Text style={{ color: 'white' }}>Reply</Text>
                    </TouchableOpacity>

                    {/* <View>
                    <Button
                        title='Create New Post'
                        onPress={() =>
                            props.navigation.navigate('CreateThread', {
                                calendarId: calId,
                                // threadArray: itemData.item.threads,
                            })
                        }
                        // onPress={() => {}}
                    />
                </View> */}
                    {/* <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: 10,
                    }}
                >
                    <Button title='Reply' onPress={() => {}} />
                    <Button
                                title='Close'
                                onPress={() => {
                                    setModalVisible(false);
                                    props.navigation.goBack();
                                }}
                            />
                </View> */}

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
            <SafeAreaView>
                <ScrollView>
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
                                {/* {'Title: '} */}
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
                                        // marginLeft: 10,
                                        paddingBottom: 5,
                                    }}
                                >
                                    {/* {'Post: '} */}
                                    {threadObject.body}
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        marginTop: 3,
                                        marginLeft: 10,
                                        width: '15%',
                                        borderRadius: 25,
                                        height: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // marginTop: 40,
                                        backgroundColor: 'blue',
                                    }}
                                    onPress={() => {
                                        props.navigation.navigate(
                                            'CreateReplyToThread',
                                            {
                                                tid: threadObject._id,
                                                threadBody: threadObject.body,
                                                // calendarId: calId,
                                            }
                                        );
                                    }}
                                >
                                    <Text style={{ color: 'white' }}>
                                        Reply
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* <Text
                            style={{
                                fontSize: 30,
                                marginLeft: 10,
                            }}
                        >
                            Posted By: {threadObject.author}
                        </Text> */}
                        </View>
                        <View styles={styles.container}>
                            <Comment
                                authorId={threadObject.author._id}
                                node={threadObject}
                            />
                        </View>
                    </View>
                </ScrollView>
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
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        backgroundColor: 'yellow',
    },
    replyButton1: {
        marginLeft: 10,
        width: '15%',
        borderRadius: 25,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 40,
        backgroundColor: 'blue',
    },
    replyButton2: {
        marginLeft: 40,
        width: '15%',
        borderRadius: 25,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 40,
        backgroundColor: 'blue',
    },
});
