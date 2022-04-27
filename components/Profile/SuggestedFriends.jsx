import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Contacts from 'expo-contacts';


export default function SuggestedFriends(props) { 

    const [contacts, setContacts] = React.useState([]);

    const renderItems = () => { 
        let elems = [];
        contacts.forEach(c => {
            elems.push(
                <View style={{
                    marginTop: '10%'
                }}>
                    <Text
                        style={{
                            fontSize: 27,
                            fontWeight: '400'
                        }}
                    >
                        {c}
                    </Text>
                </View>);
        });

        return elems;
    }

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync();
                
                let phoneNums = [];

                data.forEach(c => { 
                    c.phoneNumbers?.forEach(num => { 
                        if (num.number.length <= 13) phoneNums.push(num.number);
                    })
                })
                setContacts(phoneNums);
            }
        })();
    }, []);

    const navigation = props.navigation;
    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: '30rem',
                    fontWeight: '700',
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
                { ' ' } Suggested Friends
            </Text>

            <ScrollView>
                { renderItems() }
            </ScrollView>
        </View>
    );
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
});
