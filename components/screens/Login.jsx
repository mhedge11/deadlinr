import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RegistrationScreen from "../RegistrationScreen/RegistrationScreen";
import { emailValidation } from "../../validation/emailValidation";
import { passwordValidation } from "../../validation/passwordValidation";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = props.navigation;

  const userPressedLogin = () => {
    let emailReturn = emailValidation(email);
    let passwordReturn = passwordValidation(password);

    if (emailReturn !== "" || passwordReturn !== "") {
      if (emailReturn !== "") alert(emailReturn);
      if (passwordReturn !== "") alert(passwordReturn);
      emailReturn = "";
      passwordReturn = "";
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require("../../assets/phone.jpg")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter email"
          placeholderTextColor="black"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter password"
          secureTextEntry={true}
          placeholderTextColor="black"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={userPressedLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Forgot Password')}
      >
        <Text style={styles.forgot_button}>Forgot Password</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="CREATE ACCOUNT"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            // props.navigation.navigate("RegistrationForm");
            props.navigation.navigate("Registration");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 10,
    marginBottom: 40,
    width: "70%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 20,
  },
  inputView: {
    backgroundColor: "grey",
    borderRadius: 30,
    width: "60%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: "90%",
    // marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginTop: 15,
  },
  loginButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 40,
    backgroundColor: "blue",
  },
});

export default Login;
