import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button,
    ActivityIndicator,
} from 'react-native';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import Navigator from '../Navigator';
import { getUser } from '../../api/user';
import { getCalendar } from '../../api/calendar';

import { getWeekDeadlines } from '../../api/user';

import { connect, dispatch } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: props.calendars,
            calendars: [],
            loading: true,
            upcomingTasks: 0
        };
    }

    getAllCalendars = () => {
        this.setState({
            loading: true,
        });
        if (this.props.user.calendars) {
            this.props.user.calendars.forEach(async (c) => {
                const data = await getCalendar({ cid: c });
                this.setState({
                    calendars: [...this.state.calendars, data],
                });
            });
        }
        //console.log(this.state.calendars);
        this.props.dispatch({
            type: 'SET_CALENDARS',
            calendars: this.state.calendars,
        });
        this.setState({
            loading: false,
        });
    };

    componentDidMount = async () => {
        const user = await getUser(this.props.user.token);
        this.props.dispatch({
            type: 'SET_USER', user: {
                ...user.user,
                token: this.props.user.token
        }
     })

        this.getAllCalendars();
        getWeekDeadlines({ token: this.props.user.token })
            .then(res => { 
                this.setState({
                    upcomingTasks: res.length
                })
            })
    }

    getDarkColor = () => {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    };

    renderCourseCard = (calendar) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: this.getDarkColor(),
                    borderRadius: 15,
                    width: '10%',
                    marginRight: '1%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                key={calendar._id}
                onPress={() => {
                    if (!this.props.navigation) return;
                    this.props.navigation.navigate('Calendar View', {
                        ...calendar,
                    });
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}
                >
                    {calendar.title}
                </Text>
            </TouchableOpacity>
        );
    };

    renderCourses = () => {
        while (
            this.state.loading
        ) {
            return <ActivityIndicator />;
        }
        let elemes = [];
        this.state.calendars.forEach((c) => {
            const d = this.renderCourseCard(c);
            elemes.push(d);
        });
        return elemes;
    };

    render() {
        const picture = this.props.user.picture;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View
                        style={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#787878',
                            }}
                        >
                            Hello {this.props.user.firstName}
                        </Text>
                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: '700',
                            }}
                        >
                            You've got {'\n'}
                            <Text
                                style={{
                                    color: '#36e373',
                                }}
                            >
                                { this.state.upcomingTasks } upcoming tasks
                            </Text>
                        </Text>
                    </View>
                    <Avatar
                        activeOpacity={0.9}
                        avatarStyle={{}}
                        containerStyle={{
                            backgroundColor: '#BDBDBD',
                            marginRight: 0,
                            shadowColor: '#171717',
                            shadowOffset: { width: -1, height: 4 },
                            shadowOpacity: 0.5,
                            shadowRadius: 4,
                        }}
                        overlayContainerStyle={{}}
                        placeholderStyle={{}}
                        rounded
                        size='large'
                        source={{
                            uri: picture,
                        }}
                        title={ this.props.user.firstName[0]}
                        titleStyle={{}}
                    />
                </View>
                <View
                    styles={[
                        styles.header,
                        { fontSize: '30', fontWeight: '600', marginTop: 300 },
                    ]}
                >
                    {/* <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('Join Calendar')
                        }
                    >
                        <Text>Join Calendar</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.courses}>
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: '700',
                        }}
                    >
                        Calendars
                    </Text>
                    <Text
                        style={{
                            color: '#a2a3a6',
                        }}
                    >
                        Your running calendars
                    </Text>
                    <ScrollView
                        horizontal
                        nestedScrollEnabled
                        style={{
                            height: '25%',
                            paddingTop: '5%',
                            paddingBottom: '5%',
                            width: '100%',
                            overflow: 'scroll',
                        }}
                        contentContainerStyle={{
                            flexGrow: 1,
                            width: '500%',
                            overflow: 'hidden',
                        }}
                    >
                        {this.renderCourses()}
                    </ScrollView>
                </View>

                <View style={styles.courses}>
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: '700',
                        }}
                    >
                        Your Schedule
                    </Text>
                    <Text
                        style={{
                            color: '#a2a3a6',
                        }}
                    >
                        Upcoming Tasks
                    </Text>
                    <ScrollView
                        horizontal
                        nestedScrollEnabled
                        style={{
                            height: '50%',
                            paddingTop: '5%',
                            paddingBottom: '5%',
                            width: '100%',
                            overflow: 'scroll',
                        }}
                        contentContainerStyle={{
                            flexGrow: 1,
                            width: '500%',
                            overflow: 'hidden',
                            height: '100%',
                        }}
                    ></ScrollView>
                </View>
                <Navigator navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: '20%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '10%',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    courses: {
        width: '100%',
        marginTop: '10%',
    },
});

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(Home);
