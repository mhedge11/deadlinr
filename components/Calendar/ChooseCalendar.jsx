import React from 'react';
import { View, Text, SafeAreaView, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import {Icon} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

const ChooseCalendar = (props) => {
    const calendars = props.calendars;

    const renderList = () => {
        let elems = [];
        let swipeBtns = [{
            text: 'Delete',
            // backgroundColor: 'red',
            // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            type: 'delete',
            onPress: () => { 
                // delete this task
                return Alert.alert(

                )
            },
            
          }];

        calendars.forEach(c => {
            elems.push(
                <Swipeout
                    id={c.id}
                    right={swipeBtns}
                    style={{
                        backgroundColor: 'transparent'
                    }}
                >
                    <Text
                        style={{
                            fontSize: '30rem'
                        }}
                    >
                        {c.title}
                    </Text>
                </Swipeout>
            )
        });

        return elems;
    }

    return (
        
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: '5%',
                    justifyContent: "space-around"
                }}
            >
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => props.navigation.goBack()}>
                    <Icon name='chevron-left' type='font-awesome' color='black'/>
                 </TouchableOpacity>
                <Text
                    style={{
                        fontSize: '30rem',
                        fontWeight: '600'
                    }}
                >
                    Choose Calendar
                </Text>
                <Button style={{
                    borderWidth: 1,
                    borderColor: "black",
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',

                }}
                    title='Create Calendar'
                    onPress={() => props.navigation.navigate('Create Calendar')}
                />
            </View>
            <ScrollView
                style={{
                    padding: '5%',
                    marginTop: '5%',
                    flex: 1,
                    minHeight: '100%',
                }}
            >
                {renderList()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChooseCalendar;