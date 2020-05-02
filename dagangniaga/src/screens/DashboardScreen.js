import React from "react";
import {View, Text} from "react-native";
import {Header} from "../components";
import {colors} from  "../utils";

const DashboardScreen = ({navigation}) => {
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Home"
        navigation={navigation}
        onPress={() => {
          alert("More option here");
        }}
      ></Header>
    </View>
  );
};

export default DashboardScreen;
