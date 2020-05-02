import React from "react";
import { View, Text } from "react-native";
import {colors} from "../../../utils";

const SidebarTitle = ({ title }) => {
  return (
    <View
      style={{
        // borderWidth: 1,
        padding: 10,
        paddingLeft: 10,

      }}
    >
      <Text
        style={{
        //   marginLeft: 30,
          fontWeight: "bold",
          fontSize: 16,
          color: colors.text.default
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default SidebarTitle;
