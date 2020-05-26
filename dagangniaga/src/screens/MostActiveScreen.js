import React from "react";
import { View, Text, Button } from "react-native";
// import client from "../graphql/client";
// import { QUERY_USER_EXISTS } from "../graphql/query";
import { useMutation } from "@apollo/react-hooks";
import { MUTATION_CREATE_USER } from "../graphql/mutation";

const MostActiveScreen = () => {
  //   const [createUser] = useMutation(MUTATION_CREATE_USER);

  const getData = async () => {};
  return (
    <View>
      <Text>Most Active</Text>
      <Button title="test" onPress={getData}></Button>
    </View>
  );
};

export default MostActiveScreen;
