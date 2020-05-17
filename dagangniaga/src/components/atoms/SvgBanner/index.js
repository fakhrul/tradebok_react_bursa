import React, { useContext } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { colors } from "../../../utils";

const SvgBanner = ({ Svg, placeholder, spacing, textStyle }) => {
  return (
    <View
      style={[
        styles.container,
        { marginTop: responsiveHeight(spacing) || undefined },
      ]}
    >
      {/* <Svg /> */}
      <Text style={[styles.placeholderText, textStyle]}>{placeholder}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.text.text02,
    marginTop: 40,
  },
});

export default SvgBanner;
