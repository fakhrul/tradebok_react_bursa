import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import {
  InputCustom,
  ActionButtonCustom,
  NavLink,
  TermsAndConditions,
} from "../components";
import { Context as AuthContext } from "../context/AuthContext";
import { SocialIcon } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { colors } from "../utils";
import { Modalize } from "react-native-modalize";

const LoginScreen = ({ navigation }) => {
  const {
    state,
    tryLocalSignIn,
    signinWithFacebook,
    signInWithGoogle,
    clearErrorMessage,
  } = useContext(AuthContext);

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const modalizeRef = useRef(null);

  const loginWithEmail = () => {
    navigation.navigate("loginWithEmailFlow");
  };

  const loginWithFacebook = () => {
    signinWithFacebook();
  };

  const loginWithGoogle = async () => {
    if (isGoogleLoading) {
      console.log("Google currently is loading.");
      return;
    }
    try {
      setIsGoogleLoading(true);
      const user = await signInWithGoogle();
      console.log("login screen", user);
      setIsGoogleLoading(false);
      // if (user) tryLocalSignIn();
    } catch ({ message }) {
      setIsGoogleLoading(false);
    }
  };

  const showTerms = () => {
    modalizeRef.current?.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />

      <View style={styles.logo}>
        <Image source={require("../resources/login_logo.png")}></Image>
      </View>
      <View style={{ height: 45 }}></View>
      <Text style={styles.title}>Welcome to StockHub!</Text>
      <View style={{ height: 10 }}></View>
      <Text style={styles.termsText}>A Social Media Platform</Text>
      <Text style={styles.termsText}>for Bursa Malaysia Traders</Text>
      <View style={{ height: 250 }}></View>
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage} </Text>
      ) : null}
      <View style={{ height: 30 }}></View>

      <View
        style={{
          borderWidth: 1,
          width: 280,
          borderColor: colors.base,
          // borderWidth:1,
          // backgroundColor: "#421234"
        }}
      >
        {/* <SocialIcon
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
        /> */}
        <SocialIcon
          style={{}}
          title="Sign In With Google"
          button
          type="google"
          onPress={loginWithGoogle}
        />
        <View style={{ height: 30 }}></View>
      </View>
      <TouchableOpacity onPress={showTerms} style={styles.terms}>
        <Text style={styles.termsText}>Terms a and conditions</Text>
      </TouchableOpacity>

      <Modalize
        ref={modalizeRef}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalStyle={{
          flex: 1,
          backgroundColor: colors.base,
          padding: 15,
        }}
        adjustToContentHeight={false}
      >
        <TermsAndConditions></TermsAndConditions>
      </Modalize>
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
  terms: {
    alignItems: "center",
    justifyContent: "center",
  },
  termsText: {
    color: colors.text.text02,
  },
});

export default LoginScreen;
