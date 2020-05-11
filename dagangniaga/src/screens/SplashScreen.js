import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const SplashScreen = () => {
  const { tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("SplashScree-useEffect")
    tryLocalSignIn();
  }, []);

  return (
    <View>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
};

export default SplashScreen;
