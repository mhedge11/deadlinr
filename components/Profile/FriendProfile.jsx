import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';


export default function FriendProfile(props) {

    useEffect(async () => { 

        await fetchCalendards();
        // setLoading(false);

    }, [])

    const { firstName, lastName, bio, picture, calendars } = props.route.params.user ;

    const [loading, setLoading] = React.useState(true);

    const fetchCalendards = async () => { 
        setLoading(false);
    }
    return (
        <View
            style={styles.container}
        >
            <Text
                style={{
                    fontSize: 30,
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
                {'    '} {firstName + ' ' + lastName}
            </Text>
            <View
                style={{
                    padding: '5%',
                    marginTop: '10%',
                }}
            >
                <Avatar
                    size={"large"}
                    rounded
                    source={{
                        uri: picture
                    }}
                />

                <Text
                    style={{
                        color: 'grey',
                        marginTop: '10%',
                    }}
                >
                    { bio }
                </Text>
                {
                    loading ? <View style={styles.container}><ActivityIndicator /></View> : <View></View>
                }
            </View>
        </View>
    )
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

