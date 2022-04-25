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
import { connect } from 'react-redux';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            selectedDate: moment(),
            today: moment(),
            tasks: [],
        };
    }

    renderTask = (task) => {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return (
            <View
                style={{
                    backgroundColor: '#' + randomColor,
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
                    {task.dueDate.date() +
                        ' ' +
                        this.intToMonth(task.dueDate.month()) +
                        ' ' +
                        task.dueDate.hour() +
                        ':' +
                        task.dueDate.minute()}
                </Text>
            </View>
        );
    };

    renderTasks = () => {
        let elems = [];
        let tasks = [];

        this.props.calendars.forEach((c) => {
            c.tasks.forEach((task) =>
                tasks.push({
                    title: c.title,
                    ...task,
                })
            );
        });

        let res = tasks.filter(
            (task) =>
                task.dueDate.date() === this.state.selectedDate.date() &&
                task.dueDate.month() == this.state.selectedDate.month()
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

function mapStateToProps(state) { 
    return {
        user: state.user,
        calendars: state.calendars
    }
}

export default connect(mapStateToProps)(Calendar);
