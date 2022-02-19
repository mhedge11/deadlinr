import React from 'react';
import { View, Text, Switch } from 'react-native';

/*

    Calendar Props: {
        route: {
            title,
            isPrivate,
            createrUID
        },
        user
    }

    Calendar: {
        title: String,
        deadlines: Deadline [],
        isPrivate: boolean,
        createrUID: string
    }
*/

export default class CalendarView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            privateCalendar: this.props.route.params.isPrivate
        }
    }


    render() {
        const { route, user } = this.props;
        const { title, isPrivate, createrUID } = route.params;
        return (
            <View
                style={{
                    padding: '10%',
                    paddingTop: '20%',
                }}
            >
                <Text
                    style={{
                        fontSize: '25rem',
                        fontWeight: '600'
                    }}
                >
                    {title}
                </Text>
                
                <View
                    style={{
                        // flexDirection: 'row',
                        marginTop: '10%'
                    }}
                >
                    <Text
                        style={{
                            fontSize: '20rem'
                        }}
                    >
                        Private
                    </Text>
                    <Switch
                        disabled={createrUID !== user.uid}
                        style={{
                            marginTop: '3%'
                        }}
                        value={this.state.privateCalendar}
                        onValueChange={() => {
                            this.setState({
                                privateCalendar: !this.state.privateCalendar
                            })
                            // add API call to change setting
                        }}
                        trackColor={{ false: "white", true: "#2776f5" }}
                    />
                </View>

            </View>
        )
    }

}