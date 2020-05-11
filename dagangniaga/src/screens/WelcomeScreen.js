import React, { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { QUERY_USER_EXISTS } from "../graphql/query";
import { useMutation } from "@apollo/react-hooks";
import { MUTATION_CREATE_USER } from "../graphql/mutation";
import client from "../graphql/client";

const WelcomeScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [createUser] = useMutation(MUTATION_CREATE_USER);

  const createUserIfNotExist = async (
    authId: string,
    avatar: string | null,
    name: string,
    email: string
  ) => {
    const { data: {userExist}  } = await client.query({ query: QUERY_USER_EXISTS, variables: { authId } });
    // console.log("user found", userExist);
    if (!userExist) {
      console.log("New user found. Create use in database.");
      await createUser({ variables: { authId, avatar, name, email } });
    } else {
        console.log("Existing user.");
    }
  };

  useEffect(() => {
    console.log("welcome screen", state.currentUser);
    if (state.currentUser) {
      const {photoURL, displayName, email } = state.currentUser;
      createUserIfNotExist(email, photoURL, displayName, email);
      navigateHome();
    }
  });

  const navigateHome = () => {
    navigation.navigate("userFlow");
  };
  return (
    <View>
      <Text>Welcome Screen</Text>
      <Text>There is a problem during the sign in</Text>
      <Button title="Go to home page" onPress={navigateHome}></Button>
    </View>
  );
};

export default WelcomeScreen;
