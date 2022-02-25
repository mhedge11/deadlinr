import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import { emailValidation } from "../validation/emailValidation";
import { nameValidation } from "../validation/nameValidation";
import { passwordValidation } from "../validation/passwordValidation";
import { usernameValidation } from "../validation/usernameValidation";
import { createUser } from "../api/user";

const RegistrationForm = (props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmission = async () => {
    emailReturn = "";
    passwordReturn = "";
    firstNameReturn = "";
    lastNameReturn = "";
    usernameReturn = "";

    setLoading(false);

    let emailReturn = emailValidation(email);
    let passwordReturn = passwordValidation(password);
    let firstNameReturn = nameValidation(firstName);
    let lastNameReturn = nameValidation(lastName);
    let usernameReturn = usernameValidation(username);

    if (
      firstNameReturn !== "" ||
      lastNameReturn !== "" ||
      usernameReturn !== ""
    ) {
      if (firstNameReturn !== "") {
        alert(firstNameReturn);
      } else if (lastNameReturn !== "") {
        alert(lastNameReturn);
      } else if (usernameReturn !== "") {
        alert(usernameReturn);
      }
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (emailReturn !== "" || passwordReturn !== "") {
      if (emailReturn !== "") alert(emailReturn);
      if (passwordReturn !== "") alert(passwordReturn);
      return;
    }

    // Would send to database at this point
    // Will have to check that email is unique and username is unique
    const data = await createUser(
      firstName,
      lastName,
      email,
      username,
      password
    );
    console.log("data---" + data);
    console.log(data.uid, data.token);
    props.setUser({
      firstName,
      lastName,
      username,
      email,
      uid: data.uid,
      token: data.token,
    });
    // .then((data) => {
    //   console.log(data);
    //   const { user, uid } = data;
    //   console.log(user);
    //   props.setUser(user);
    //   setLoading(false);
    //   if (res !== null) {
    //     // const val = data;
    //     console.log("res: " + res);
    //     const { user } = data;
    //     // console.log(user);
    //     // const { uid } = req.params;
    //     // props.setUser(user);
    //   }
    // })
    // .catch((err) => {
    //   setLoading(false);
    //   return Alert.alert(err);
    // });
  };

  // const handleSubmission = (e) => {
  //   e.preventDefault();
  //   if (!(user.password === user.confirmPassword)) {
  //     alert("Passwords do not match");
  //     return;
  //   }
  //   if (user.password.length < 7) {
  //     alert("Password not long enough");
  //     return;
  //   }
  // };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{ marginVertical: 50 }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/student_on_phone.jpg")}
        />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter First Name"
            placeholderTextColor="black"
            onChangeText={(firstName) => setFirstName(firstName)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Last Name"
            placeholderTextColor="black"
            onChangeText={(lastName) => setLastName(lastName)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Username"
            placeholderTextColor="black"
            onChangeText={(username) => setUsername(username)}
          />
        </View>
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
          />
        </View>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleSubmission}
        >
          <Text>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    width: "90%",
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
