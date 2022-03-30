import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

const ViewDeadline = (props) => {

    console.log(props.route.params);

    return (
        <SafeAreaView>
            <View
                style={{
                    padding: '5%',
                    flexDirection: 'row',
                }}
            >
                <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() => props.navigation.goBack()}
                >
                    <Icon
                        name='chevron-left'
                        type='font-awesome'
                        color='black'
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: '32rem',
                        fontWeight: '600',
                        marginLeft: '5%',
                    }}
                >
                    {props.route.params.deadline.title}
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default ViewDeadline;