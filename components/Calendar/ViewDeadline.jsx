import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    TextInput,
    SafeAreaView,
    ActivityIndicator,
    Alert,
    ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';

import {
    rateDeadline,
    getDeadline,
    editDeadline as editDeadlineAPI,
    toggleComplete,
    deleteDeadline as deleteDeadlineAPI,
    voteDeadline as voteDeadlineAPI
} from '../../api/deadline';

const ViewDeadline = (props) => {
    const canEdit = props.route.params.deadline.owner === props.user.user._id;
    const [editMode, setEditMode] = React.useState(false);

    const [deadline, setDeadline] = React.useState(props.route.params.deadline);
    const [dueDate, setDueDate] = React.useState(deadline.dueDate);
    const [desc, setDesc] = React.useState(deadline.description);

    const diffs = [1, 2, 3, 4, 5];
    const [timeToComplete, setTimeToComplete] = React.useState(1);

    const [loading, setLoading] = React.useState(false);
    const [selectedDiff, setSelectedDiff] = React.useState(0);

    const [groups, setGroups] = React.useState(deadline.groups);
    const [numGroups, setNumGroups] = React.useState(deadline.groups.length);
    const [newGroup, setNewGroup] = React.useState('');

    React.useEffect(() => {
        if (deadline.difficulty[props.user.user._id] !== undefined) {
            setSelectedDiff(deadline.difficulty[props.user.user._id]);
        }
        if (deadline.completionTime[props.user.user._id] !== undefined) {
            setTimeToComplete(deadline.completionTime[props.user.user._id]);
        }
        fetchDeadline();
    }, []);

    const fetchDeadline = async () => {
        const res = await getDeadline({
            id: props.route.params.deadline._id,
            token: props.user.token,
        });
        if (res !== false) {
            setDeadline(res.deadline);
            setDesc(res.deadline.description);
            setDueDate(res.deadline.dueDate);
        } else {
            alert('An error occured');
        }
        setEditMode(false);
        setLoading(false);
    };

    const rateDeadlineAPI = async () => {
        setLoading(true);
        const res = await rateDeadline({
            did: deadline._id,
            difficulty: selectedDiff,
            completionTime: timeToComplete,
            token: props.user.token,
        });
        if (res !== false) {
            fetchDeadline();
        } else {
            setLoading(false);
            setEditMode(false);
            return Alert.alert('An error occured');
        }
    };



    const editDeadline = async () => {
        setLoading(true);
        if (newGroup.trim() !== '') {
            setGroups([...groups, newGroup]);
        }
        const res = await editDeadlineAPI({
            did: deadline._id,
            title: deadline.title,
            description: desc,
            dueDate: dueDate,
            token: props.user.token,
            groups,
        });
        setNewGroup(false);
        setLoading(false);

        if (res === true) {
            const res = await fetchDeadline();

            setDesc(deadline.description);
            setDueDate(new Date(deadline.dueDate));
            props.route.params.deadline = deadline;
        } else {
            setLoading(false);
            setEditMode(false);
            return Alert.alert('An error occured');
        }
    };

    const completeDeadline = async () => {
        setLoading(true);
        const res = await toggleComplete({
            did: deadline._id,
            token: props.user.token,
        });
        if (res !== false) {
            fetchDeadline();
        } else {
            setLoading(false);
            return Alert.alert('An error occured');
        }
    };

    const voteDeadline = async () => {
        setLoading(true);
        const res = await voteDeadlineAPI({
            did: deadline._id,
            token: props.user.token,
        });
        if (res !== false) {
            fetchDeadline();
        } else {
            setLoading(false);
            return Alert.alert('An error occured');
        }
    };

    const deleteDeadline = async () => {
        setLoading(true);
        const res = await deleteDeadlineAPI({
            did: deadline._id,
            token: props.user.token,
        });
        setLoading(false);
        if (res === true) {
            props.navigation.goBack();
        } else {
            return Alert.alert('An error occured');
        }
    };

    const getDarkColor = () => {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    };

    const renderDiffButton = (diff) => {
        return (
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor:
                        diff === selectedDiff ? '#03a5fc' : '#d6d6d6',
                }}
                onPress={() => {
                    setSelectedDiff(diff);
                }}
                disabled={deadline.usersVoted.includes(props.user.user._id)}
            >
                <Text
                    style={{
                        fontSize: '25rem',
                        fontWeight: '600',
                        marginLeft: '5%',
                        textAlign: 'center',
                    }}
                >
                    {diff}
                </Text>
            </TouchableOpacity>
        );
    };

    let diffColor = '';
    const averageDifficulty = deadline.averageDifficulty;
    if (averageDifficulty <= 1) {
        diffColor = '#a2ff38';
    } else if (averageDifficulty <= 2) {
        diffColor = '#fcff38';
    } else if (averageDifficulty <= 3) {
        diffColor = '#fac61b';
    } else if (averageDifficulty <= 4) {
        diffColor = '#eb7c15';
    } else {
        diffColor = '#eb2e15';
    }

    return (
        <ScrollView
            style={{
                marginTop: '10%',
                marginBottom: '10%',
            }}
        >
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
                <Text
                    style={{
                        fontSize: '32rem',
                        fontWeight: '600',
                        marginLeft: '5%',
                    }}
                >
                    {deadline.title}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                }}
            >
                <Button
                    title='Delete Deadline'
                    color='red'
                    disabled={props.user.user._id !== deadline.owner}
                    onPress={() => {
                        Alert.alert(
                            'Delete Deadline',
                            'Are you sure you want to delete this deadline?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => {},
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        setLoading(true);
                                        deleteDeadline();
                                    },
                                },
                            ],
                            { cancelable: false }
                        );
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    padding: '5%',
                }}
            >
                {editMode ? (
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        {deadline.groups.map((g, i) => {
                            return (
                                <TextInput
                                    style={{
                                        fontSize: 20,
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        padding: '5%',
                                    }}
                                    value={g}
                                    onChangeText={(text) => {
                                        temp = groups;
                                        temp[i] = text;
                                        setGroups(temp);
                                    }}
                                />
                            );
                        })}
                        {numGroups - deadline.groups.length > 0 && (
                            <TextInput
                                style={{
                                    fontSize: 20,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    padding: '5%',
                                }}
                                value={newGroup}
                                onChangeText={(text) => {
                                    setNewGroup(text);
                                }}
                            />
                        )}
                        <Button
                            title='Add group'
                            onPress={() => {
                                setNumGroups(numGroups + 1);
                            }}
                            disabled={
                                deadline.groups[
                                    deadline.groups.length - 1
                                ].trim() === ''
                            }
                        />
                    </View>
                ) : (
                    deadline.groups.map((g) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: getDarkColor(),
                                    padding: '5%',
                                    borderRadius: 5,
                                    marginRight: '5%',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: 'white',
                                        fontWeight: '500',
                                    }}
                                >
                                    {g}
                                </Text>
                            </View>
                        );
                    })
                )}
            </View>
            {
                !deadline.approved && 
                <View
                    style={{
                            padding: '5%',
                            paddingRight: '15%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                    }}
                >
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: '320'
                            }}
                        >Is this a valid deadline ?</Text>
                        <Button
                            title='Vote deadline'
                            fontSize={20}
                            onPress={() => {
                                voteDeadline();
                            }}
                            
                        />
                </View>
            }
            <View
                style={{
                    padding: '5%',
                }}
            >
                {editMode ? (
                    <View
                        style={{
                            width: '100%',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Due :
                        </Text>
                        <DateTimePicker
                            value={new Date(deadline.dueDate)}
                            mode='datetime'
                            onChange={(e, d) => {
                                setDueDate(d);
                            }}
                        />
                    </View>
                ) : (
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                        }}
                    >
                        Due :{' '}
                        {deadline.dueDate.substring(0, 10) +
                            ' ' +
                            deadline.dueDate.substring(11, 16)}
                    </Text>
                )}

                {!editMode ? (
                    <Text
                        style={{
                            marginTop: '5%',
                            fontSize: 18,
                            color: '#8f8f8f',
                        }}
                    >
                        {deadline.description}
                    </Text>
                ) : (
                    <TextInput
                        style={{
                            borderColor: 'grey',
                            borderRadius: 4,
                            borderWidth: 2,
                            fontSize: 18,
                            marginTop: '5%',
                            padding: '2%',
                        }}
                        value={desc}
                        onChangeText={(v) => setDesc(v)}
                    />
                )}
            </View>
            <View
                style={{
                    marginTop: '10%',
                    padding: '5%',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Icon
                            type='ionicon'
                            name='time-outline'
                            color='black'
                        />
                        <Text
                            style={{
                                fontSize: '21rem',
                            }}
                        >
                            {deadline.averageCompletionTime} hr
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Icon type='font-awesome' name='check' color='green' />
                        <Text
                            style={{
                                fontSize: '21rem',
                            }}
                        >
                            {deadline.usersFinished.length}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: '3%',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Icon
                            type='font-awesome'
                            name='fire'
                            color={diffColor}
                        />
                        <Text
                            style={{
                                fontSize: '21rem',
                            }}
                        >
                            {' ' + averageDifficulty}{' '}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '25rem',
                                color: 'red',
                                fontWeight: 'bold',
                            }}
                        >
                            &#x2717;
                        </Text>
                        <Text
                            style={{
                                fontSize: '21rem',
                            }}
                        >
                            {' ' + deadline.votesRemaining}
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    marginTop: '10%',
                }}
            >
                {!editMode ? (
                    <Button
                        title='Edit'
                        disabled={!canEdit}
                        fontSize={20}
                        onPress={() => {
                            setEditMode(true);
                        }}
                    />
                ) : (
                    <Button
                        title='Done'
                        disabled={!canEdit || dueDate <= new Date()}
                        fontSize={20}
                        onPress={() => {
                            editDeadline();
                            // add API call
                        }}
                    />
                )}
                {loading && <ActivityIndicator />}
                <View
                    style={{
                        padding: '5%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: '18rem',
                            fontWeight: '600',
                        }}
                    >
                        Mark Difficuly
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            marginTop: '8%',
                        }}
                    >
                        {diffs.map((d) => renderDiffButton(d))}
                    </View>
                </View>
                <View
                    style={{
                        padding: '5%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: '18rem',
                            fontWeight: '600',
                        }}
                    >
                        Time to complete
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'space-between',
                            marginTop: '8%',
                            paddingLeft: '5%',
                            paddingRight: '5%',
                        }}
                    >
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            value={timeToComplete}
                            onValueChange={(v) => setTimeToComplete(v)}
                            minimumValue={1}
                            maximumValue={20}
                            minimumTrackTintColor='#00ccfa'
                            maximumTrackTintColor='white'
                            step={1}
                            disabled={deadline.usersVoted.includes(
                                props.user.user._id
                            )}
                        />
                        <Text
                            style={{
                                fontSize: '18rem',
                                marginTop: '2%',
                                marginLeft: '2%',
                            }}
                        >
                            {timeToComplete} hr
                        </Text>
                    </View>
                </View>
            </View>
            <Button
                title='Vote deadline'
                fontSize={20}
                onPress={() => {
                    rateDeadlineAPI();
                }}
            />
            <Button
                title='Mark deadline as complete'
                fontSize={20}
                onPress={() => {
                    completeDeadline();
                }}
                disabled={deadline.usersFinished.includes(props.user.user._id)}
            />
        </ScrollView>
    );
};

export default ViewDeadline;
