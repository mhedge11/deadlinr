import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';


export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    intToMonth = (idx) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        console.log(idx);
        return monthNames[idx];
    }

    renderDays = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let elems = [];
        days.forEach((day, idx) => {
            elems.push(<Text key={idx} style={{
                color: '#6e6e6e',
                fontSize: '18rem'
            }}>{day}</Text>)
        });
        return elems;
    }

    render() {
        const navigation = this.props.navigation;
        const date = this.state.date;
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = date.getMonth();
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                    }}>
                        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon name='chevron-left' type='font-awesome' color='black'/>
                        </TouchableOpacity>
                        <View
                            style={{
                                marginLeft: '10%'
                            }}
                        >
                        <Text
                            style={{
                                color: '#6e6e6e',
                                fontWeight: '300',
                                fontSize: '20rem'
                            }}
                        >
                            {dd} {' ' + this.intToMonth(mm)}
                        </Text>
                        <Text
                            style={{
                                color: 'black',
                                fontWeight: '600',
                                fontSize: '40rem'
                            }}
                        >
                            Today
                        </Text>
                        </View>
                    </View>
                    <View>
                        <Button title='Choose Calendar' onPress={() => navigation.navigate('Choose Calendar')}>
                        
                        </Button>
                    </View>
                </View>
                <View style={styles.datePicker}>
                    {this.renderDays()}
                </View>
            </View>
        )
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
        justifyContent: 'space-between'
    },
    datePicker: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-around'

    }
});
