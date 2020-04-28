import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { NavLink, InputCustom, ActionButtonCustom } from "../components";
import { NavigationEvents, SafeAreaView } from "react-navigation";

const RegisterScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  const [form, setForm] = new useState({
    email: "fakhrulazran@gmail.com",
    password: "qwe123",
  });

  const sendData = () => {
    signup({
      email: form.email,
      password: form.password,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../resources/register.png")}></Image>
      </View>
      <Text style={styles.title}>Registration</Text>
      <View style={{ height: 40 }}></View>
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
      <ActionButtonCustom title="Register" onPress={sendData}></ActionButtonCustom>

      <NavLink
        text="Already have an account? Sign In instead!"
        routeName="Login"
      >
      </NavLink>
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
});


export default RegisterScreen;
