import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { deleteAccount } from '../../api/user';
import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary as launchImageLibraryTemp } from 'react-native-image-picker';

let options = {
    title: 'Select Image',
    customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            filepath: {
                data: '',
                uri: '',
            },
            fileData: '',
            fileUri: '',
        };
        this.showDeleteAccountDialog.bind(this);
    }

    chooseImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option',
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibraryTemp(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // alert(JSON.stringify(response));s
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri,
                });
            }
        });
    };

    launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri,
                });
            }
        });
    };

    showDeleteAccountDialog = () => {
        if (!this.props.user) {
            return alert('An error occured');
        }

        const token = this.props.user['token'];

        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to delete your account?',
            [
                // The "Yes" button
                {
                    text: 'Yes',
                    onPress: async () => {
                        this.setState({
                            loading: true,
                        });
                        // API Route for deleting account
                        const res = await deleteAccount({ token });
                        this.setState({
                            loading: false,
                        });
                        if (res === 'success') {
                            this.props.setUser(null);
                            return Alert.alert('User successfully deleted!');
                        } else {
                            return Alert.alert(
                                'There was a problem with your request. Please try again later.'
                            );
                        }
                    },
                },

                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: 'No',
                },
            ]
        );
    };

    showLogoutConfirmation = () => {
        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to logout?',
            [
                // The "Yes" button
                {
                    text: 'Yes',
                    onPress: () => {
                        this.props.setUser(null);
                    },
                },
                ,
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: 'No',
                },
            ]
        );
    };

    render() {
        if (this.state.loading) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        const navigation = this.props.navigation;
        const { firstName, lastName, uid } = this.props.user;
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
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Icon
                            name='chevron-left'
                            type='font-awesome'
                            color='black'
                        />
                    </TouchableOpacity>
                    {'    '}Hey {firstName}!
                </Text>
                <Avatar
                    activeOpacity={0.9}
                    avatarStyle={{}}
                    containerStyle={{
                        backgroundColor: '#BDBDBD',
                        marginRight: 0,
                        shadowColor: '#171717',
                        shadowOffset: { width: -1, height: 4 },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                        alignSelf: 'flex-end',
                    }}
                    onLongPress={() => alert('onLongPress')}
                    onPress={() => this.chooseImage()}
                    overlayContainerStyle={{}}
                    placeholderStyle={{}}
                    rounded
                    size='large'
                    source={{
                        uri: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png',
                    }}
                    title='P'
                    titleStyle={{}}
                />
                <View
                    style={{
                        marginTop: '30%',
                        flex: 1,
                        justifyContent: 'space-around',
                    }}
                >
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => this.showLogoutConfirmation()}
                        >
                            <Text
                                style={{
                                    fontSize: '20rem',
                                    color: 'black',
                                    fontWeight: '600',
                                    padding: '5%',
                                }}
                            >
                                Log Out
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Change Password');
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: '20rem',
                                    color: 'black',
                                    fontWeight: '600',
                                    padding: '5%',
                                }}
                            >
                                Change Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.showDeleteAccountDialog()}
                    >
                        <Text
                            style={{
                                fontSize: '20rem',
                                color: '#f55a42',
                                fontWeight: '600',
                                padding: '5%',
                            }}
                        >
                            Delete Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
});
