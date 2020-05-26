import React, { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { QUERY_USER_EXISTS } from "../graphql/query";
import { useMutation } from "@apollo/react-hooks";
import { MUTATION_CREATE_USER } from "../graphql/mutation";
import client from "../graphql/client";

const WelcomeScreen = ({ navigation }) => {
  const { state, updateUserId } = useContext(AuthContext);
  const [createUser] = useMutation(MUTATION_CREATE_USER);

  const createUserIfNotExist = async (
    email: string,
    name: string,
    avatar: string | null
  ) => {
    console.log("check exist user for email =", email);
    const {
      data: { userExist },
    } = await client.query({ query: QUERY_USER_EXISTS, variables: { email: email } });

    if (!userExist) {
      console.log("New user found. Create use in database.");

      const {
        data: {
          createUser: { id: userId },
        },
      } = await createUser({
        variables: { name, email, avatar },
      });

      console.log("userId", userId);
      // const userId = createUser.id;

      return await userId;
    } else {
      const userId = userExist.id;
      console.log("Existing user id", userId);

      return await userId;
    }
  };

  useEffect(() => {
    if (state.currentUser) {
      const { photoURL, displayName, email } = state.currentUser;
      createUserIfNotExist(email, photoURL, displayName, email).then((data) => {
        updateUserId({ userId: data });
        navigateHome();
      });
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
