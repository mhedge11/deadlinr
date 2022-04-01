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
} from 'react-native';
import IndvidualThreadGridTile from './IndividualThreadGridTile';
import { fetchUser } from '../../api/user';

function IndividualThreadScreen(props) {
    const threadId = props.route.params.threadId;
    const threadArray = props.route.params.threadArray;
    const threadReplies = props.route.params.threadReplies;
    const threadObject = props.route.params.threadObject;
    console.log(threadObject.replies);

    // console.log('Individual Thread Screen');
    // console.log(calendars);
    // console.log(props.route.params.threadObject.replies);
    // console.log(threadArray);

    const [replies, setReplies] = React.useState([]);
    const [userId, setUserId] = React.useState('');
    const [userName, setUserName] = React.useState('Unknown');

    React.useEffect(() => {
        fetchIndividualThread();
    }, []);

    const fetchIndividualThread = async () => {
        setUserName('');
        try {
            console.log(userId);
            const data = await fetchUser(userId);
            console.log(data);
            setUserName(data.username);
        } catch (e) {
            console.error(e);
        }
    };

    function Comment({ authorId, node }) {
        setUserId(authorId);
        console.log(authorId);
        // findUser();
        if (!node.replies) {
            return (
                <View>
                    <Text style={{ marginLeft: 25 }}>
                        <Text style={{ fontWeight: 'bold' }}>{userName}</Text>
                        {': '}
                        {node.body}
                    </Text>
                </View>
            );
        }
        return (
            <View>
                <Text style={{ marginLeft: 15 }}>
                    <Text style={{ fontWeight: 'bold' }}>{userName}</Text>
                    {': '}
                    {node.body}
                </Text>

                {node.replies.map((c) => (
                    <Comment key={c._id} node={c} />
                ))}
            </View>
        );
    }

    return (
        <>
            <SafeAreaView>
                <View styles={styles.headline}>
                    <IndvidualThreadGridTile individual={threadObject.title} />

                    <View styles={styles.container}>
                        <View styles={styles.innerContainer}>
                            <Text styles={styles.title}>
                                {threadObject.title}
                            </Text>
                        </View>
                        <Comment
                            authorId={threadObject.author}
                            node={threadObject}
                        />
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
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        backgroundColor: 'yellow',
    },
});
