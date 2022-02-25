import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button,
} from 'react-native';
import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import Navigator from '../Navigator';

function renderScheduleBlock() {}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: props.courses,
        };
    }

    renderCourseCard = (course) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: course.bgColor,
                    borderRadius: '30%',
                    width: '10%',
                    marginRight: '1%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#171717',
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                }}
                key={course.id}
                onPress={() => {
                    if (!this.props.navigation) return;
                    this.props.navigation.navigate('Calendar View', {
                        ...course,
                        isPrivate: true,
                        createrUID: '1',
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
                    {course.title}
                </Text>
            </TouchableOpacity>
        );
    };

    renderCourses(courses) {
        let elements = [];
        courses.forEach((course) => {
            elements.push(this.renderCourseCard(course));
        });
        return elements;
    }

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
                                color: '#a2a3a6',
                            }}
                        >
                            Hello Tim
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
                                4 upcoming tasks
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
                            uri: 'https://cdn.vox-cdn.com/thumbor/LJsKwxxJ8VYHNXpWCIlYljhIIps=/0x104:438x396/1820x1213/filters:focal(0x104:438x396):format(webp)/cdn.vox-cdn.com/imported_assets/846325/steve-jobs-1.jpg',
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
                        Courses
                    </Text>
                    <Text
                        style={{
                            color: '#a2a3a6',
                        }}
                    >
                        Your running courses
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
                        {this.renderCourses(this.state.courses)}
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
