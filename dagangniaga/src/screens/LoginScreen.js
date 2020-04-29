import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { InputCustom, ActionButtonCustom, NavLink } from "../components";
import { Context as AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const { state, signin, signinWithFacebook, clearErrorMessage } = useContext(
    AuthContext
  );
  const [form, setForm] = new useState({
    email: "fakhrulazran@gmail.com",
    password: "qwe123",
  });

  const sendData = () => {
    signin({
      email: form.email,
      password: form.password,
    });
  };

  const loginWithFacebook = () => {
    signinWithFacebook();
  };

  const onInputChanged = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../resources/login_logo.png")}></Image>
      </View>
      {/* <Text style={styles.title}>Welcome !</Text> */}
      <View style={{ height: 65 }}></View>
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
      <View style={{ height: 30 }}></View>
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage} </Text>
      ) : null}

      <ActionButtonCustom
        title="Login with Facebook"
        onPress={loginWithFacebook}
      ></ActionButtonCustom>

      <NavLink
        text="Don't have an account? Register new account!"
        routeName="Register"
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
});

export default LoginScreen;
