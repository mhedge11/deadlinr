import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { Avatar } from "react-native-elements";

const mockCourses = [
    {
        id: 0,
        title: 'EAPS 106',
        bgColor: '#08c43d',
        data: []
    },
    {
        id: 1,
        title: 'CS 180',
        bgColor: '#414241',
        data: []
    },
    {
        id: 2,
        title: 'MA 165',
        bgColor: '#f22c3f',
        data: []
    },
    {
        id: 3,
        title: 'ENGL 106',
        bgColor: '#d66718',
        data: []
    },
    {
        id: 4,
        title: 'CS 193',
        bgColor: '#2180cf',
        data: []
    },
]

function renderCourseCard(course) {

    return (
        <View 
            style={{
                backgroundColor: course.bgColor,
                borderRadius: '30%',
                width: '50%',
                marginRight: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                // maxWidth: '50%',
                // paddingTop: '15%',
                // paddingBottom: '15%',
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
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
        </View>
    )
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderCourses(courses) {
        let elements = []
        courses.forEach(course => {
            elements.push(renderCourseCard(course))
        })
        return elements;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{
                        justifyContent: 'space-between'
                    }}>
                        <Text
                            style={{
                                fontSize: '15rem',
                                color: '#b7bdb9'
                            }}
                        >
                            Hello Tim
                        </Text>
                        <Text
                            style={{
                                fontSize: '25rem',
                                fontWeight: '700'
                            }}
                        >
                            You've got {'\n'}
                            <Text
                                style={{
                                    color: '#36e373'
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
                            backgroundColor: "#BDBDBD",
                            marginRight: 0
                        }}
                        onLongPress={() => alert("onLongPress")}
                        onPress={() => alert("onPress")}
                        overlayContainerStyle={{}}
                        placeholderStyle={{}}
                        rounded
                        size="large"
                        source={{ uri: "" }}
                        title="P"
                        titleStyle={{}}
                    />
                </View>
                <View style={styles.courses}>
                    <Text
                        style={{
                            fontSize: '30rem',
                            fontWeight: '700'
                        }}
                    >
                        Courses
                    </Text>
                    <ScrollView
                        horizontal
                        style={{
                            height: '25%',
                            paddingTop: '5%',
                            paddingBottom: '5%',
                            width: '100%',
                            overflow: 'scroll'
                        }}
                        contentContainerStyle={{
                            width: '100%',
                        }}
                    > 
                        {
                            this.renderCourses(mockCourses)
                        }
                    </ScrollView>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: '20%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '10%'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    courses: {
        width: '100%',
        marginTop: '10%'
    }
})