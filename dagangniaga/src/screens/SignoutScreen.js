import React, {useContext, useEffect} from "react";
import { SafeAreaView, Text, Button } from "react-native";
import {Context as AuthContext} from "../context/AuthContext";
import {Spacer} from "../components"

const SingoutScreen = () => {
  const { state, signout } = useContext(AuthContext);

  useEffect(() => {
    console.log(state.currentUser.displayName);
  });

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>{state.currentUser.displayName}</Text>
      <Spacer>
        <Button title="SingOut" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

export default SingoutScreen;
