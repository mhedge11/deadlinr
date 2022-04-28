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

const Administrator = (props) => {
    // const [admins, setAdmins] = React.useState(props.route.params.calendarID);
    // const [adminObjects, setAdminObjects] = React.useState;
    // const [calendarMembers, setCalendarMembers] = React.useState(
    //     props.route.params.members
    // );

    const [calendarMembers, setCalendarMembers] = React.useState([]);
    const [firstName, setFirstName] = React.useState(props.user.user.firstName);
    const [lastName, setLastName] = React.useState(props.user.user.lastName);
    const [username, setUsername] = React.useState(props.user.user.username);
    const [email, setEmail] = React.useState(props.user.user.email);
    const [bio, setBio] = React.useState(props.user.user.bio);

    const [loading, setLoading] = React.useState(false);

    const [bcolor, setBcolor] = React.useState('transparent');

    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    useEffect(() => {
        // initialFetch();
        members();
    }, []);

    // const initialFetch = async () => {
    //     const calendar = await getCalendar({
    //         cid: props.route.params.calendarID,
    //     });
    //     const adminIDs = calendar.administrators;
    //     console.log(adminIDs);
    //     adminIDs.forEach((id) => {
    //         console.log(id);
    //     });
    //     console.log(calendar.administrators);
    // };

    const members = async () => {
        setCalendarMembers([]);
        try {
            const calendar = await getCalendar({
                cid: props.route.params.calendarID,
            });
            const members = calendar.members;
            members.forEach(async (c) => {
                const item = await fetchUserAPI({ uid: c });
                // console.log(item);
                if (item !== null) {
                    setCalendarMembers((c) => [...c, item]);
                }
                // setCalendarMembers((person.firstName) => [...calendarMembers, person]
                // // Will fetch the members
                console.log(calendarMembers.Object);
            });
        } catch (e) {
            console.error(e);
        }
    };

    function renderMemberItem(itemData) {
        function pressHandler() {}
        return (
            <AdminGridTile calendar={itemData.item} onPress={pressHandler} />
        );
    }

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
                    Administration
                </Text>
            </View>
            <View>
                <View
                    style={{
                        marginTop: '10%',
                    }}
                >
                    <Text
                        style={{
                            fontSize: '18rem',
                        }}
                    >
                        Current Administrators
                    </Text>

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

                    <View
                        style={{
                            marginTop: '10%',
                        }}
                    >
                        <Button title='Submit' onPress={() => {}} />
                    </View>
                </View>
            </View>
            {loading && <ActivityIndicator />}
        </View>
    );
};

export default Administrator;
