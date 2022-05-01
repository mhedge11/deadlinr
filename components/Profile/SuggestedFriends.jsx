import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as Contacts from 'expo-contacts';
import { checkContacts } from '../../api/user';
import { connect } from 'react-redux';

function SuggestedFriends(props) {
    const navigation = props.navigation;
    const [contacts, setContacts] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    const renderItems = () => {
        let elems = [];
        contacts.forEach((c) => {
            const { username } = c;
            elems.push(
                <TouchableOpacity
                    style={{
                        marginTop: '10%',
                    }}
                    onPress={() => {
                        navigation.navigate('FriendProfile', {
                            user: c,
                        });
                    }}
                >
                    <Text
                        style={{
                            fontSize: 27,
                            fontWeight: '400',
                        }}
                    >
                        {username}
                    </Text>
                </TouchableOpacity>
            );
        });

        return elems;
    };

    useEffect(async () => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync();

                let phoneNums = [];

                data.forEach((c) => {
                    c.phoneNumbers?.forEach((num) => {
                        if (num.number.length <= 13) phoneNums.push(num.number);
                    });
                });
                const res = await checkContacts({
                    token: props.user.token,
                    phoneNumbers: phoneNums,
                });
                setLoading(false);
                setContacts(res);
            }
        })();
    }, []);

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
                </TouchableOpacity>{' '}
                Suggested Friends
            </Text>

            {loading ? (
                <ActivityIndicator />
            ) : contacts.length > 0 ? (
                <ScrollView>{renderItems()}</ScrollView>
            ) : (
                <Text
                    style={{
                        marginTop: '25%',
                        color: 'grey',
                        fontSize: 20,
                    }}
                >
                    Looks like none of your contacts use Deadlinr. How about you
                    recommend them?
                </Text>
            )}
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

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(SuggestedFriends);
