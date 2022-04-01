import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';


const ViewDeadline = (props) => {

    const canEdit = props.route.params.deadline.owner === props.user.user._id;
    const [editMode, setEditMode] = React.useState(false);

    const [dueDate, setDueDate] = React.useState(props.route.params.deadline.dueDate);
    const [notes, setNotes] = React.useState(props.route.params.deadline.notes);

    const diffs = [1, 2, 3, 4, 5];
    const [timeToComplete, setTimeToComplete] = React.useState(1);


    const [selectedDiff, setSelectedDiff] = React.useState(0);

    const renderDiffButton = (diff) => { 
        return (
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: diff === selectedDiff ? '#03a5fc' : '#d6d6d6'
                }}
                onPress={() => {
                    setSelectedDiff(diff);
                }}
                disabled={props.route.params.deadline.usersVoted.includes(props.user.user._id)}
            >
                <Text
                    style={{
                        fontSize: '25rem',
                        fontWeight: '600',
                        marginLeft: '5%',
                        textAlign: 'center'
                    }}
                >
                    {diff}
                </Text>
            </TouchableOpacity>
        )
    }


    let diffColor = '';
    const averageDifficulty = props.route.params.deadline.averageDifficulty;
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
        <SafeAreaView>
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
                    {props.route.params.deadline.title}
                </Text>
            </View>
            <View
                style={{
                    padding: '5%',
                    
                }}
            >
                {
                    editMode ?
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
                            value={dueDate}
                            mode='datetime'
                            onChange={(e, d) => { 
                                setDueDate(d);
                            }}
                        />
                    </View>
                        :
                        <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
    
                        }}
                    >
                        Due : { props.route.params.deadline.dueDate.substring(0, 10) + ' ' + props.route.params.deadline.dueDate.substring(11, 16) }
                    </Text>
                }

                {
                    !editMode ?
                        <Text
                            style={{
                                marginTop: '5%',
                                fontSize: 18,
                                color: '#8f8f8f',
                            }}
                        >
                            {props.route.params.deadline.notes}
                        </Text>
                        :
                        <TextInput
                            style={{
                                borderColor: 'grey',
                                borderRadius: 4,
                                borderWidth: 2,
                                fontSize: 18,
                                marginTop: '5%',
                                padding: '2%',
                            }}
                            value={notes}
                            onChangeText={(v) => setNotes(v)}
                        />                                
                }

            </View>
            <View
                    style={{
                        marginTop: '10%',
                        padding: '5%'
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
                                flexDirection: 'row'
                            }}
                        >
                            <Icon type='ionicon' name='time-outline' color='black' />
                            <Text
                                style={{
                                    fontSize: '21rem'
                                }}
                            >{props.route.params.deadline.averageCompletionTime} hr</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Icon type='font-awesome' name='check' color='green' />
                            <Text
                                style={{
                                    fontSize: '21rem'
                                }}
                            >{props.route.params.deadline.usersFinished}</Text>
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
                                flexDirection: 'row'
                            }}
                        >
                            <Icon type='font-awesome' name='fire' color={ diffColor } />
                            <Text
                                style={{
                                    fontSize: '21rem'
                                }}
                            >{' ' + averageDifficulty} </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: '25rem',
                                    color: 'red',
                                    fontWeight: 'bold'
                                }}    
                            >
                                &#x2717;
                            </Text> 
                            <Text
                                style={{
                                    fontSize: '21rem'
                                }}                                
                            >
                                {' ' + props.route.params.deadline.votesRemaining}
                            </Text>
                        </View>
                    </View>
            </View>
            <View
                style={{
                    marginTop: '10%',
                }}
            >
                {
                    !editMode ? 
                    <Button
                        title='Edit'
                        disabled={!canEdit}
                        fontSize={20}
                        onPress={() => {
                            setEditMode(true);
                        }}
                        />
                        :
                    <Button
                        title='Done'
                        disabled={!canEdit || dueDate <= new Date()}
                        fontSize={20}
                        onPress={() => {
                            setEditMode(false);
                            // add API call
                        }}
                    />
                }
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
                            marginTop: '8%'
                        }}
                    >
                        {
                       

                        diffs.map(d => renderDiffButton(d))
                           
                        }
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
                            style={{width: '100%', height: 40}}
                            value={timeToComplete}
                            onValueChange={(v) => setTimeToComplete(v)}
                            minimumValue={1}
                            maximumValue={20}
                            minimumTrackTintColor="#00ccfa"
                            maximumTrackTintColor="white"
                            step={1}
                            disabled={props.route.params.deadline.usersVoted.includes(props.user.user._id)}
                        />
                        <Text
                            style={{
                                fontSize: '18rem',
                                marginTop: '2%',
                                marginLeft: '2%'
                            }}
                        >
                            {timeToComplete} hr
                        </Text>
                    </View>
                </View>
            </View>
            <Button
                title='Mark deadline as complete'
                fontSize={20}
                onPress={() => { 
                    // add API call
                    props.route.params.deadline.usersVoted.push(props.user.user._id);
                }}
                disabled={props.route.params.deadline.usersVoted.includes(props.user.user._id)} 
            />
        </SafeAreaView>
    )
}

export default ViewDeadline;