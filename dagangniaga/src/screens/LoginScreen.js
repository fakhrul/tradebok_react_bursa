import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { InputCustom, ActionButtonCustom, NavLink } from "../components";
import { Context as AuthContext } from "../context/AuthContext";
import { SocialIcon } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

const LoginScreen = ({ navigation }) => {
  const {
    state,
    signinWithFacebook,
    signInWithGoogle,
    clearErrorMessage,
  } = useContext(AuthContext);

  const loginWithEmail = () => {
    navigation.navigate("loginWithEmailFlow");
  };

  const loginWithFacebook = () => {
    signinWithFacebook();
  };

  const loginWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />

      <View style={styles.logo}>
        <Image source={require("../resources/login_logo.png")}></Image>
      </View>
      <Text style={styles.title}>Welcome !</Text>
      <View style={{ height: 65 }}></View>
      <View style={{ height: 30 }}></View>
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage} </Text>
      ) : null}
      <View style={{ height: 30 }}></View>

      <View
        style={{
          // borderWidth: 1,
          width: 280,
        }}
      >
        <SocialIcon
          style={{}}
          title="Sign In With Email"
          button
          type="envelope"
          onPress={loginWithEmail}
        />
        <SocialIcon
          style={{}}
          title="Sign In With Facebook"
          button
          type="facebook"
          onPress={loginWithFacebook}
        />
        <SocialIcon
          style={{}}
          title="Sign In With Google"
          button
          type="google"
          onPress={loginWithGoogle}
        />
      </View>
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

export default LoginScreen;
