import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Scrollview,
  SafeAreaView,
} from "react-native";

import RegistrationForm from "../RegistrationForm";

const RegistrationScreen = () => {
  const registerUser = (user) => {
    userid = Math.random().toString();
  };

  return <RegistrationForm />;
};

export default RegistrationScreen;
