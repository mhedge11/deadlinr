import React from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    Button,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Icon, ButtonGroup } from 'react-native-elements';
import {
    joinCalendar,
    leaveCalendar,
    updatePrivacy,
    getCalendar,
} from '../../api/calendar';
import { getDeadline } from '../../api/deadline';

export default class CalendarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privateCalendar: this.props.route.params.isPrivate,
            isMember: this.props.route.params.members.includes(
                this.props.user.user._id
            ),
            isAdmin: this.props.route.params.administrators.includes(
                this.props.user.user._id
            ),
            loading: false,
            members: this.props.route.params.members,
            deadlines: [],
            refreshing: false,
            selectedFilter: 0,
            reverseSort: false,
        };
    }

    onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.fetchDeadlines();
        this.setState({ refreshing: false });
    };

    componentDidMount() {
        this.fetchDeadlines();
    }

    sortByDeadline = (a, b) => {
        if (a.dueDate < b.dueDate) {
            return this.state.reverseSort ? 1 : -1;
        } else if (a.dueDate > b.dueDate) {
            return this.state.reverseSort ? -1 : 1;
        } else {
            return 0;
        }
    };

    sortByDifficulty = (a, b) => {
        if (a.averageDifficulty < b.averageDifficulty) {
            return this.state.reverseSort ? 1 : -1;
        } else if (a.averageDifficulty > b.averageDifficulty) {
            return this.state.reverseSort ? -1 : 1;
        } else {
            return 0;
        }
    };

    sortByCompletionTime = (a, b) => {
        if (a.averageCompletionTime < b.averageCompletionTime) {
            return this.state.reverseSort ? 1 : -1;
        } else if (a.averageCompletionTime > b.averageCompletionTime) {
            return this.state.reverseSort ? -1 : 1;
        } else {
            return 0;
        }
    };

    sortDeadlines = () => {
        const { selectedFilter, deadlines, reverseSort } = this.state;

        console.log(deadlines);
        this.setState({
            reverseSort: !reverseSort,
        });
        if (selectedFilter == 0) {
            deadlines.sort(this.sortByDeadline);
        } else if (selectedFilter == 1) {
            deadlines.sort(this.sortByCompletionTime);
        } else if (selectedFilter == 2) {
            deadlines.sort(this.sortByDifficulty);
        }
        console.log(deadlines);
        this.setState({
            deadlines,
        });
    };

    fetchDeadlines = async () => {
        const c = await getCalendar({ cid: this.props.route.params._id });
        this.setState({
            deadlines: [],
            loading: true,
        });
        try {
            c.deadlines.forEach(async (did) => {
                const item = await getDeadline({
                    id: did,
                    token: this.props.user.token,
                });

                this.setState({
                    deadlines: [...this.state.deadlines, item.deadline],
                });
            });

            const deadlines = this.state.deadlines;
            deadlines.sort(this.sortByDeadline);
            this.setState({
                deadlines,
            });
        } catch (e) {
            console.error(e);
        }
    };

    changePrivacy = async () => {
        this.setState({
            loading: true,
        });
        const res = await updatePrivacy({
            cid: this.props.route.params._id,
            token: this.props.user['token'],
        });

        this.setState({
            loading: false,
        });

        if (res === 'success') {
            this.setState({
                privateCalendar: !this.state.privateCalendar,
            });
        } else {
            return Alert.alert('An error occured. Please try later');
        }
    };

    alterMemberStatus = async () => {
        if (this.state.isMember === true) {
            // add API call to remove user from this calendar
            const res = await leaveCalendar({
                cid: this.props.route.params._id,
                token: this.props.user.token,
            });
            if (res === true) {
                this.setState({
                    isMember: false,
                });
            } else {
                return Alert.alert('An error occured. Please try later');
            }
            this.setState({
                isMember: false,
            });
        } else {
            // add API call to add user to this calendar
            const res = await joinCalendar({
                cid: this.props.route.params._id,
                token: this.props.user.token,
            });
            if (res === true) {
                this.setState({
                    isMember: true,
                });
            } else {
                return Alert.alert('An error occured. Please try later');
            }
        }
    };

    getDarkColor = () => {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    };

    renderDeadline = (deadline) => {
        const {
            title,
            id,
            dueDate,
            notes,
            averageCompletionTime,
            averageDifficulty,
            usersVoted,
            usersFinished,
            votesRemaining,
            groups,
        } = deadline.item;

        let diffColor = '';
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
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Deadline View', {
                        deadline: deadline.item,
                        calendar: this.props.route.params,
                    });
                }}
            >
                <View
                    key={id}
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.84,
                        elevation: 5,
                        borderRadius: 8,
                        borderColor: '#e0e0e0',
                        borderWidth: 1,
                        padding: '5%',
                        marginTop: '5%',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '20rem',
                                color: 'black',
                            }}
                        >
                            {title}
                        </Text>
                        <Text
                            style={{
                                fontSize: '20rem',
                            }}
                        >
                            {dueDate.slice(0, 10)}
                        </Text>
                    </View>

                    <View
                        style={{
                            marginTop: '5%',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '15rem',
                                color: '#8c8c8c',
                            }}
                        >
                            {notes}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: '10%',
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
                                    {averageCompletionTime} hr
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <Icon
                                    type='font-awesome'
                                    name='check'
                                    color='green'
                                />
                                <Text
                                    style={{
                                        fontSize: '21rem',
                                    }}
                                >
                                    {usersFinished.length}
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
                                    {' ' + votesRemaining}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: '5%',
                            overflow: 'wrap',
                        }}
                    >
                        {groups.map((g) => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: this.getDarkColor(),
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
                        })}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { route, user, navigation } = this.props;
        const { title, isPrivate, members, deadlines } = route.params;
        return (
            <View
                style={{
                    padding: '10%',
                    paddingTop: '20%',
                    flex: 1,
                }}
            >
                <View
                    style={{
                        // flexDirection: 'row',
                        paddingTop: '5%',
                        justifyContent: 'flex-start',
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                            }}
                            onPress={() => navigation.goBack()}
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
                                marginLeft: '10%',
                            }}
                        >
                            {title}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => {
                                    this.alterMemberStatus();
                                }}
                            >
                                <Text
                                    style={{
                                        color: this.state.isMember
                                            ? 'red'
                                            : 'green',
                                        fontSize: '20rem',
                                        fontWeight: '300',
                                        marginTop: '4%',
                                    }}
                                >
                                    {this.state.isMember
                                        ? 'Leave Calendar'
                                        : 'Join Calendar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 30 }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'Administrator',
                                        {
                                            calendarID:
                                                this.props.route.params._id,
                                            members:
                                                this.props.route.params.members,
                                            threshold:
                                                this.props.route.params
                                                    .threshold,
                                        }
                                    );
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'green',
                                        fontSize: '20rem',
                                        fontWeight: '300',
                                        marginTop: '4%',
                                    }}
                                >
                                    {this.state.isAdmin ? 'Settings' : ''}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        // flexDirection: 'row',
                        marginTop: '10%',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '45%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Icon name='users' type='font-awesome' color='black' />
                        <Text
                            style={{
                                fontSize: '20rem',
                            }}
                        >
                            {members.length} members
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            marginTop: '5%',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '45%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Icon
                                name='calendar'
                                type='font-awesome'
                                color='black'
                            />
                            <Text
                                style={{
                                    fontSize: '20rem',
                                }}
                            >
                                {this.state.deadlines.length} deadlines
                            </Text>
                        </View>
                        <View
                            style={{
                                marginTop: '-10%',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: '20rem',
                                }}
                            >
                                Private
                            </Text>
                            <Switch
                                //  disabled={createrUID !== user.uid}
                                style={{
                                    marginTop: '3%',
                                }}
                                value={this.state.privateCalendar}
                                onValueChange={() => this.changePrivacy()}
                                trackColor={{ false: 'white', true: '#2776f5' }}
                            />
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: '10%',
                    }}
                >
                    <ButtonGroup
                        onPress={(idx) => {
                            this.setState({
                                reverseSort: false,
                            });
                            const deadlines = this.state.deadlines;
                            if (idx == 0) {
                                deadlines.sort(this.sortByDeadline);
                            } else if (idx == 1) {
                                deadlines.sort(this.sortByCompletionTime);
                            } else if (idx == 2) {
                                deadlines.sort(this.sortByDifficulty);
                            }
                            this.setState({
                                selectedFilter: idx,
                                deadlines,
                            });
                        }}
                        selectedIndex={this.state.selectedFilter}
                        buttons={['Due Date', 'Time', 'Difficulty']}
                    />

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                        }}
                        onPress={() => {
                            this.sortDeadlines();
                        }}
                    >
                        <Icon name='arrow-up' type='font-awesome' />
                        <Icon name='arrow-down' type='font-awesome' />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{
                        marginTop: '10%',
                    }}
                    data={this.state.deadlines}
                    renderItem={this.renderDeadline}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                />
                <TouchableOpacity
                    style={{
                        marginTop: 'auto',
                    }}
                    onPress={() => {
                        this.props.navigation.navigate('Create Deadline', {
                            calendarID: this.props.route.params._id,
                            members: this.props.route.params.members,
                        });
                    }}
                >
                    <Icon
                        name='plus-circle'
                        type='font-awesome'
                        color='#005ac7'
                        size={50}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: 0,
    },
});
