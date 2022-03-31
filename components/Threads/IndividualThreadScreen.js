import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Button,
    TouchableOpacity,
} from 'react-native';
import IndvidualThreadGridTile from './IndividualThreadGridTile';

// import { THREADDATA } from '../../mockData/threadsDummyData.js';

// console.log(THREADDATA);

const commentData = {
    title: 'Fake article title.',
    author: 'grzm',
    comments: [
        {
            id: 1,
            text: 'Example comment here.',
            author: 'user2',
            children: [
                {
                    id: 2,
                    text: 'Another example comment text.',
                    author: 'user3',
                    children: [
                        {
                            id: 3,
                            text: 'Another example comment text.',
                            author: 'user4',
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            id: 4,
            text: 'Example comment here 2.',
            author: 'user5',
            children: [],
        },
    ],
};

// const THREADDATA = [
//     {
//         id: 0,
//         title: 'HW 0',
//         body: 'How difficult is HW 1?',
//         author: 0,
//         timestamp: Date.now,
//         lastActivity: Date.now,
//         replies: [1, 2],
//     },
//     {
//         id: 1,
//         title: 'HW 1',
//         body: 'HW1 is not bad at all',
//         author: 0,
//         timestamp: Date.now,
//         lastActivity: Date.now,
//         replies: [3],
//     },
//     {
//         id: 2,
//         title: 'HW 2',
//         body: 'HW2 is difficult',
//         author: 0,
//         timestamp: Date.now,
//         lastActivity: Date.now,
//         replies: [],
//     },
//     {
//         id: 3,
//         title: 'HW 3',
//         body: 'How difficult is HW 4?',
//         author: 0,
//         timestamp: Date.now,
//         lastActivity: Date.now,
//         replies: [],
//     },
// ];

// const THREADDATA = [];

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

    // React.useEffect(() => {
    //     doThis();
    // }, []);

    // const doThis = async () => {
    //     setReplies([]);
    //     try {
    //         threadReplies.forEach(async (c) => {
    //             const item = c;
    //             // if (
    //             setReplies((c) => [...c, item]);
    //         });
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    // console.log(replies);

    // const doThis = aysnc () => {
    //     threadReplies.forEach((c) => {
    //         setReplies((c) => [...c, c]);
    //     })
    // };

    function RunThis(replies) {
        // console.log(threadData);
        return (
            <IndvidualThreadGridTile
                individualThread={replies}
                //             // onPress={pressHandler}
                //             // calendar={itemData.item}
                //             // onPress={pressHandler}
                //             // replies={itemData.item.replies}
            />
        );
    }

    // function renderIndividualThreadItem(itemData) {
    //     // console.log(itemData);
    //     doThis(itemData);

    //     // setCalId(itemData.item.id);
    //     // calId = itemData.item.id;
    //     // function pressHandler() {
    //     //     ()
    //     // }
    //     // console.log(itemData.item);
    //     return (
    //         <IndvidualThreadGridTile
    //             individualThread={itemData.item}
    //             // onPress={pressHandler}
    //             // calendar={itemData.item}
    //             // onPress={pressHandler}
    //             // replies={itemData.item.replies}
    //         />
    //     );
    // }

    // function Comment({ comment }) {
    //     const nestedComments = (comment.children || []).map((comment) => {
    //         return <Comment key={comment._id} comment={comment} type='child' />;
    //     });

    //     console.log(nestedComments);
    //     return (
    //         <View style={{ marginLeft: 25, marginTop: 10 }}>
    //             {/* console.log(nestedComments); */}
    //             <Text>{comment}</Text>
    //             <Text>{nestedComments}</Text>
    //         </View>
    //     );
    // }

    function BookmarkNode({ node }) {
        if (!node.replies) return <Text> {node.body} </Text>;

        return (
            <View>
                <Text>{node.body}</Text>

                {node.replies.map((c) => (
                    <BookmarkNode key={c._id} node={c} />
                ))}
            </View>
        );
    }

    // return (
    //     <SafeAreaView style={styles.container}>
    //         {/* <FlatList
    //             data={threadReplies}
    //             keyExtractor={(item) => item.id}
    //             renderItem={RunThis}
    //         /> */}

    // commentData.comments.map((comment) => {
    //       return (
    //           <View>
    //         <Comment key={comment.id} comment={comment} />
    //         </View>
    //       )
    //     })

    //     </SafeAreaView>
    // );

    return (
        <SafeAreaView>
            {/* {threadObject.replies}
            {threadObject.replies.map((comment) => {
                console.log(comment._id);
                console.log(comment.body);
                return <Comment key={comment._id} comment={comment} />;
            })} */}
            <BookmarkNode
                // key={threadObject.replies._id}
                node={threadObject}
            />
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
