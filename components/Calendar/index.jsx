import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';

import { getWeekDeadlines } from '../../api/user';

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment(),
            today: moment(),
            weeklyDeadlines: [],
        };
    }

    componentDidMount() { 
        getWeekDeadlines({
            token: this.props.user.token
        })
            .then(data => { 
                this.setState({
                    weeklyDeadlines: data
                });
            })
    }

    getDarkColor = () => {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    }

    renderTask = (task) => {
        let randomColor = this.getDarkColor();
        const dueDate = new Date(Date.parse(task.dueDate));
        return (
            <View
                style={{
                    backgroundColor: randomColor,
                    padding: '4%',
                    borderRadius: 20,
                    shadowColor: '#171717',
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    marginTop: '5%',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: '30rem',
                        fontWeight: '500',
                    }}
                >
                    {task.title}
                </Text>
                <Text
                    style={{
                        marginTop: '5%',
                        color: 'white',
                        fontSize: '20rem',
                    }}
                >
                    {task.taskTitle}
                </Text>
                <Text
                    style={{
                        color: 'white',
                        marginTop: '5%',
                        fontSize: '15rem',
                    }}
                >
                    Due at{' '}
                    {dueDate.getDate() +
                        ' ' +
                        this.intToMonth(dueDate.getMonth()) +
                        ' ' +
                        (dueDate.getHours() >= 10 ? dueDate.getHours() : '0' + dueDate.getHours()) +
                        ':' +
                        (dueDate.getMinutes() >= 10 ? dueDate.getMinutes() : '0' + dueDate.getMinutes())}
                </Text>
            </View>
        );
    };

    renderTasks = () => {
        let elems = [];

        let res = this.state.weeklyDeadlines.filter(
            (task) => {
                const dueDate = new Date(Date.parse(task.dueDate));
                return dueDate.getDate() === this.state.selectedDate.date() &&
                    dueDate.getMonth() == this.state.selectedDate.month()
            }
        );

        if (res.length == 0) {
            return (
                <View style={{}}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: '20rem',
                            fontWeight: '500',
                        }}
                    >
                        No Tasks scheduled for this day :)
                    </Text>
                </View>
            );
        }

        res.forEach((task) => elems.push(this.renderTask(task)));

        return elems;
    };

    intToMonth = (idx) => {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        return monthNames[idx];
    };

    renderDays = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let elems = [];
        days.forEach((day, idx) => {
            elems.push(
                <Text
                    key={idx}
                    style={{
                        color: '#6e6e6e',
                        fontSize: '18rem',
                    }}
                >
                    {day}
                </Text>
            );
        });
        return elems;
    };

    render() {
        const navigation = this.props.navigation;
        const dd = this.state.selectedDate.date();
        const mm = this.state.selectedDate.month();
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                        }}
                    >
                        <TouchableOpacity
                            style={{ justifyContent: 'center' }}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon
                                name='chevron-left'
                                type='font-awesome'
                                color='black'
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                marginLeft: '10%',
                            }}
                        >
                            <Text
                                style={{
                                    color: '#6e6e6e',
                                    fontWeight: '300',
                                    fontSize: '20rem',
                                }}
                            >
                                {dd} {' ' + this.intToMonth(mm)}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        selectedDate: moment(),
                                    });
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'black',
                                        fontWeight: '600',
                                        fontSize: '40rem',
                                    }}
                                >
                                    Today
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Button
                            title='Choose Calendar'
                            onPress={() =>
                                navigation.navigate('Choose Calendar')
                            }
                        ></Button>
                    </View>
                </View>
                <View style={styles.datePicker}>
                    <CalendarStrip
                        style={{
                            width: 350,
                            height: 200,
                            fontSize: 50,
                        }}
                        selectedDate={this.state.selectedDate}
                        onDateSelected={(newDate) =>
                            this.setState({
                                selectedDate: newDate,
                            })
                        }
                        minDate={new Date()}
                        maxDate={moment(moment(), "DD-MM-YYYY").add(7, 'days')}
                        scrollable
                        headerText=''
                        iconStyle={
                            {
                                // backgroundColor: 'red'
                            }
                        }
                        calendarHeaderStyle={{
                            color: 'black',
                            fontSize: '20rem',
                        }}
                        dayContainerStyle={{
                            marginTop: 0,
                        }}
                        dateNumberStyle={{
                            color: 'black',
                            fontSize: '20rem',
                        }}
                        dateNameStyle={{
                            color: 'black',
                            fontSize: '12rem',
                        }}
                    />
                </View>
                <ScrollView
                    style={{
                        marginTop: '-10%',
                        paddingLeft: '2%',
                        paddingRight: '2%',
                        paddingBottom: '2%',
                    }}
                >
                    {this.renderTasks()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: '20%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '30%',
        justifyContent: 'flex-start',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datePicker: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
