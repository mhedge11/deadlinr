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
                        uri:
                        'data:image/png;base64,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',
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

