import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    FlatList,
    RefreshControl,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Icon } from 'react-native-elements';
import { fetchUser as fetchUserAPI } from '../../api/user';
import { editProfile as editProfileAPI } from '../../api/user';
import { emailValidation } from '../../validation/emailValidation';
import { nameValidation } from '../../validation/nameValidation';
import { usernameValidation } from '../../validation/usernameValidation';
import { getCalendar } from '../../api/calendar';
import AdminGridTile from './AdminGridTile';
import {
    addAdmin as addAdminAPI,
    removeAdmin as removeAdminAPI,
    changeThreshold as changeThresholdAPI,
} from '../../api/calendar';
import Slider from '@react-native-community/slider';

import { connect } from 'react-redux';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Administrator = (props) => {
    // console.log(props);
    const [calendarMembers, setCalendarMembers] = React.useState([]);
    const [calendarAdmins, setCalendarAdmins] = React.useState([]);
    const [sliderValue, setSliderValue] = React.useState(
        props.route.params.threshold
    );

    const [loading, setLoading] = React.useState(false);

    const [bcolor, setBcolor] = React.useState('transparent');

    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchThreads();
        // setRefreshing(false);
        wait(300).then(() => setRefreshing(false));
    };

    useEffect(() => {
        members();
        admins();
    }, []);

    const members = async () => {
        setCalendarMembers([]);
        try {
            const calendar = await getCalendar({
                cid: props.route.params.calendarID,
            });
            const memberList = calendar.members;
            memberList.forEach(async (c) => {
                const item = await fetchUserAPI({ uid: c });
                if (item !== null) {
                    setCalendarMembers((c) => [...c, item]);
                }
            });
        } catch (e) {
            console.error(e);
        }
    };

    const admins = async () => {
        setCalendarAdmins([]);
        try {
            const calendar = await getCalendar({
                cid: props.route.params.calendarID,
            });
            // console.log(calendar);
            const adminList = calendar.administrators;
            adminList.forEach(async (c) => {
                const item = await fetchUserAPI({ uid: c });
                if (item !== null) {
                    setCalendarAdmins((c) => [...c, item]);
                }
            });
        } catch (e) {
            console.error(e);
        }
    };

    const updateThresholdValue = async () => {
        setLoading(true);

        const res = await changeThresholdAPI({
            cid: props.route.params.calendarID,
            token: props.user.token,
            threshold: sliderValue,
        });
        setLoading(false);
        if (res === true) {
        } else {
            return Alert.alert('An error occured with slider');
        }
    };

    const addMemberToAdmins = async (memberId) => {
        setLoading(true);
        // console.log(memberId);

        const res = await addAdminAPI({
            cid: props.route.params.calendarID,
            token: props.user.token,
            uid: memberId,
        });
        setLoading(false);
        if (res === true) {
            members();
            admins();
        } else {
            return Alert.alert('An error occured');
        }
    };

    const removeMemberFromAdmins = async (memberId) => {
        setLoading(true);
        // console.log(memberId);
        const res = await removeAdminAPI({
            cid: props.route.params.calendarID,
            token: props.user.token,
            uid: memberId,
        });
        setLoading(false);
        if (res === true) {
            members();
            admins();
        } else {
            return Alert.alert('An error occured');
        }
    };

    function renderMemberItem(itemData) {
        function pressHandler() {
            Alert.alert(
                'Add member as Administrator',
                'Are you sure you want add the member as an admistrator?',
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
                            // setMemberId(itemData.item.id);
                            addMemberToAdmins(itemData.item._id);
                        },
                    },
                ],
                { cancelable: false }
            );
        }
        return (
            <AdminGridTile calendar={itemData.item} onPress={pressHandler} />
        );
    }

    function renderAdminItem(itemData) {
        function pressHandler() {
            Alert.alert(
                'Remove Administrator',
                'Are you sure you want to remove this administrator?',
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
                            // setAdminId(itemData.item.id);
                            if (calendarAdmins.length <= 1) {
                                Alert.alert('Cannot remove administrator');
                                return;
                            }
                            removeMemberFromAdmins(itemData.item._id);
                        },
                    },
                ],
                { cancelable: false }
            );
        }
        return (
            <AdminGridTile calendar={itemData.item} onPress={pressHandler} />
        );
    }

    // console.log(sliderValue);
    return (
        <View
            style={{
                padding: '5%',
                paddingTop: '20%',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
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
                        fontSize: '30rem',
                        fontWeight: '600',
                        marginLeft: '5%',
                    }}
                >
                    Calendar Settings
                </Text>
            </View>
            <View>
                <View
                    style={{
                        marginTop: '10%',
                    }}
                >
                    <View
                        style={{
                            padding: 10,
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '18rem',
                            }}
                        >
                            Current Threshold: {(sliderValue * 100).toFixed(0)}%
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                padding: 10,
                                // backgroundColor: 'white',
                                // marginBottom: 20,
                            }}
                        >
                            <Slider
                                style={{
                                    width: 250,
                                    height: 40,
                                }}
                                minimumValue={0}
                                maximumValue={1}
                                value={sliderValue}
                                minimumTrackTintColor='#6b5ae8'
                                maximumTrackTintColor='#6b5ae8'
                                thumbTintColor='#6b5ae8'
                                onValueChange={(value) =>
                                    setSliderValue(
                                        Math.round(value * 100) / 100
                                    )
                                }
                                onSlidingComplete={updateThresholdValue}
                                step={0.05}
                            />
                        </View>
                    </View>
                    {/* <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>{sliderValue * 100}%</Text>
                    </View> */}
                    <View style={{ height: '74%' }}>
                        <View style={{ height: '40%' }}>
                            <Text
                                style={{
                                    fontSize: '18rem',
                                }}
                            >
                                Current Administrators
                            </Text>

                            <FlatList
                                data={calendarAdmins}
                                keyExtractor={(item) => item.id}
                                renderItem={renderAdminItem}
                                // refreshControl={
                                //     <RefreshControl
                                //         refreshing={refreshing}
                                //         onRefresh={() => onRefresh()}
                                //     />
                                // }
                            />
                        </View>
                        {/* <View> */}
                        <Text
                            style={{
                                fontSize: '18rem',
                            }}
                        >
                            Calendar Members
                        </Text>

                        <FlatList
                            data={calendarMembers}
                            keyExtractor={(item) => item.id}
                            renderItem={renderMemberItem}
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={refreshing}
                            //         onRefresh={() => onRefresh()}
                            //     />
                            // }
                        />
                        {/* </View> */}
                        {/* <View
                        style={{
                            marginTop: '10%',
                        }}
                    >
                        <Button title='Submit' onPress={() => {}} />
                    </View> */}
                    </View>
                </View>
            </View>
            {/* {loading && <ActivityIndicator />} */}
        </View>
    );
};

function mapStateToProps(state) {
    return {
        user: state.user,
        dispatch: state.dispatch,
    };
}

export default connect(mapStateToProps)(Administrator);
