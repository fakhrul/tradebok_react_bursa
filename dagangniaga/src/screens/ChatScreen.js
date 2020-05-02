import React from "react";
import { View } from "react-native";
import {Header} from "../components";
import {colors} from "../utils";

const ChatScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Chat"
        navigation={navigation}
        onPress={() => {
          alert("More option here");
        }}
      ></Header>
    </View>
  );
};

export default ChatScreen;
