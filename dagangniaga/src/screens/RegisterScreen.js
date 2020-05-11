import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { NavLink, InputCustom, ActionButtonCustom } from "../components";
import { NavigationEvents, SafeAreaView } from "react-navigation";

const RegisterScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  const [form, setForm] = new useState({
    displayName: "fakhrul",
    email: "fakhrulazran@gmail.com",
    password: "qwe123",
    isLoading: false,
  });

  const onInputChanged = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  const sendData = () => {
    console.log("sendData");
    setForm({ isLoading: true });
    signup({
      displayName: form.displayName,
      email: form.email,
      password: form.password,
    });
    setForm({ isLoading: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../resources/register.png")}></Image>
      </View>
      <Text style={styles.title}>Registration</Text>
      <View style={{ height: 40 }}></View>
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage} </Text>
      ) : null}
      <InputCustom
        placeholder="Display Name"
        value={form.displayName}
        onChangeText={(value) => onInputChanged(value, "displayName")}
      ></InputCustom>
      <View style={{ height: 20 }}></View>
      <InputCustom
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => onInputChanged(value, "email")}
      ></InputCustom>
      <View style={{ height: 20 }}></View>
      <InputCustom
        placeholder="Password"
        value={form.password}
        onChangeText={(value) => onInputChanged(value, "password")}
        secureTextEntry={true}
      ></InputCustom>
      <View style={{ height: 30 }}></View>
      <ActionButtonCustom
        title="Register"
        onPress={sendData}
      ></ActionButtonCustom>
      <View style={{ height: 30 }}></View>
      <NavLink
        text="Already have an account? Sign In instead!"
        routeName="Login"
      ></NavLink>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    width: 200,
    height: 164,
    backgroundColor: "white",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A5B1C2",
    maxWidth: 200,
    backgroundColor: "white",
    marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default RegisterScreen;
