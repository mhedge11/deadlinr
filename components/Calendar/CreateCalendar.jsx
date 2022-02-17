import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, TextInput, Switch, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const CreateCalendar = (props) => {

    const [privateCalendar, setPrivate] = React.useState(false);
    const [calendarName, setCalendarName] = React.useState('');

    const createCalendar = () => {
        
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    padding: '5%',
                    flexDirection: 'row',
                
                }}
            >
                 <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => props.navigation.goBack()}>
                    <Icon name='chevron-left' type='font-awesome' color='black'/>
                 </TouchableOpacity>
                <Text
                    style={{
                        fontSize: '32rem',
                        fontWeight: '600',
                        marginLeft: '5%'
                    }}
                >
                    Create Calendar
                </Text>
            </View>

            <View
                style={{
                    padding: '5%'
                }}
            >
                <Text style={styles.label}>
                    Name
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Calendar Name'
                    value={calendarName}
                    onChangeText={v => setCalendarName(v)}
                />
            </View>

            <View
                style={{
                    padding: '5%'
                }}
            >
                <Text style={styles.label}>
                    Private
                </Text>
                <Switch
                    style={{
                        marginTop: '3%'
                    }}
                    value={privateCalendar}
                    onValueChange={() => setPrivate(!privateCalendar)}
                    trackColor={{ false: "white", true: "#2776f5" }}
                />
            </View>

            <View>
                <Button title='Create' onPress={() => createCalendar()}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: '2%',
        fontSize: 20,
        color: '#0761f2',
        padding: '3%',
        borderRadius: 15,
        backgroundColor: '#ebebeb'
    },
    label: {
        fontSize: 25,
        color: 'black',
        marginLeft: '1%'
    }
});

export default CreateCalendar;

