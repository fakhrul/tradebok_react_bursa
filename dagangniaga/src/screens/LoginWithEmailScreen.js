import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { InputCustom, ActionButtonCustom, NavLink } from "../components";
import { Context as AuthContext } from "../context/AuthContext";
import {NavigationEvents} from "react-navigation";

const LoginWithEmailScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(
    AuthContext
  );
  const [form, setForm] = new useState({
    email: "",
    password: "",
  });

  const sendData = () => {
    signin({
      email: form.email,
      password: form.password,
    });
  };

  const onInputChanged = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
              <NavigationEvents onWillBlur={clearErrorMessage} />

      <View style={{ height: 65 }}></View>
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage} </Text>
      ) : null}
      <View style={{ height: 30 }}></View>
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
      <ActionButtonCustom title="Login" onPress={sendData}></ActionButtonCustom>
      <NavLink
        text="Don't have an account? Register new account!"
        routeName="Register"
      ></NavLink>
      <NavLink
        text="Go to Main Screen"
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
    width: 80,
    height: 80,
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

export default LoginWithEmailScreen;
