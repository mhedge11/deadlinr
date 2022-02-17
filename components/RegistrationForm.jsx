import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Scrollview,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const RegistrationForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleEmail = (event) => {
  //   setUser({
  //     email: event.target.value,
  //     password: user.password,
  //     confirmPassword: user.confirmPassword,
  //   });
  // };
  // const handlePassword = (event) => {
  //   setUser({
  //     email: user.email,
  //     password: event.target.value,
  //     confirmPassword: user.confirmPassword,
  //   });
  // };
  // const handleConfirmPassword = (event) => {
  //   setUser({
  //     email: user.email,
  //     password: user.password,
  //     confirmPassword: event.target.value,
  //   });
  // };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (!(user.password === user.confirmPassword)) {
      alert("Passwords do not match");
      return;
    }
    if (user.password.length < 7) {
      alert("Password not long enough");
      return;
    }

    let userAlreadyExists = false;

    props.users.forEach((element) => {
      if (element.email === user.email) {
        userAlreadyExists = true;
        alert("username already exists");
      }
    });

    if (userAlreadyExists) {
      return;
    }

    // props.register(user);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/student_on_phone.jpg")}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter email"
          placeholderTextColor="black"
          onChangeText={(email) => setEmail(email)}

          // onChangeText={handleEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter password"
          secureTextEntry={true}
          placeholderTextColor="black"
          onChangeText={(password) => setPassword(password)}

          // onChangeText={handlePassword}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor="black"
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }

          // onChangeText={handleConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.registerButton}>
        <Text
          onPress={() => {
            handleSubmission;
          }}
        >
          REGISTER
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: "70%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 20,
  },
  inputView: {
    backgroundColor: "grey",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  registerButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
});

export default RegistrationForm;
