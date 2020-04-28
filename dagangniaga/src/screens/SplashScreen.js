import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const SplashScreen = () => {
  const { tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
