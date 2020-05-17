import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {colors} from "../../../utils";

const BottomSheetHeader = ({ header, subHeader }) => {
  return (
    <View style={{}}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.subHeader}>{subHeader}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    header:{
        fontSize: 20,
        color: colors.text.text01
    },
    subHeader:{
        fontSize: 16,
        color: colors.text.text02,
        marginTop: 2
    }
});
export default BottomSheetHeader;
