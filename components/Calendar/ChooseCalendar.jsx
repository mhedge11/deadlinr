import React from 'react';
import { View, Text, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';

const ChooseCalendar = (props) => {


    const renderList = () => {

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

        </SafeAreaView>
    )
}

export default ChooseCalendar;