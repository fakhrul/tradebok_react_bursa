import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../utils";

const Option = ({ label, iconName, onPress, children, color }) => {
    if (children)
      return (
        <View style={styles.container}>
          <Ionicons
            name={iconName}
            size={20}
            color={color || colors.text.text01}
          />
          {children}
        </View>
      );

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <Ionicons name={iconName} size={20} color={color || colors.text.text01} />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    color: colors.text.text01,
  },
});

export default Option;
