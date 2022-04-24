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

import { connect, dispatch } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: props.calendars,
            calendars: [],
            loading: true,
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
        this.setState({
            loading: false,
        });
    };

    componentDidMount() {
        const token = this.props.user.token;
        getUser(token).then((user) => {
            dispatch({ type: 'SET_USER', user: {
                ...user,
                token,
            }});
        });
        this.getAllCalendars();
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
                        fontSize: '20rem',
                    }}
                >
                    {calendar.title}
                </Text>
            </TouchableOpacity>
        );
    };

    renderCourses = () => {
        while (
            this.state.loading ||
            !this.props.user.calendars ||
            this.state.calendars.length !==
                this.props.user.calendars.length
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
                                fontSize: '15rem',
                                color: '#787878',
                            }}
                        >
                            Hello {this.props.user.firstName}
                        </Text>
                        <Text
                            style={{
                                fontSize: '25rem',
                                fontWeight: '700',
                            }}
                        >
                            You've got {'\n'}
                            <Text
                                style={{
                                    color: '#36e373',
                                }}
                            >
                                0 upcoming tasks
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
                        onLongPress={() => alert('onLongPress')}
                        onPress={() => alert('onPress')}
                        overlayContainerStyle={{}}
                        placeholderStyle={{}}
                        rounded
                        size='large'
                        source={{
                            uri: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png',
                        }}
                        title='P'
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
                            fontSize: '30rem',
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
                            fontSize: '30rem',
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
