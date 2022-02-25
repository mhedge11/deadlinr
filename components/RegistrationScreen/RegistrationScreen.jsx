import React from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Scrollview,
    SafeAreaView,
} from 'react-native';

import RegistrationForm from '../RegistrationForm';

const RegistrationScreen = (props) => {
    const registerUser = (user) => {
        userid = Math.random().toString();
    };

    return <RegistrationForm setUser={props.setUser} />;
};

export default RegistrationScreen;
