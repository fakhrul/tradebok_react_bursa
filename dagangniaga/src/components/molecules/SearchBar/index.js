import React, { useContext } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
import { colors } from "../../../utils";

const SearchBar = ({
  value,
  onChangeText,
  onFocus,
  onBlur,
  placeholder,
  style,
}) => {
  return (
    <TextInput
      onFocus={onFocus}
      onBlur={onBlur}
      style={[styles.container, style]}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors.text02}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    width: "90%",
    alignSelf: "center",
    paddingVertical: Platform.select({ ios: 10, android: 5 }),
    paddingHorizontal: 20,
    backgroundColor: colors.placeholder,
    color: colors.text01,
    borderRadius: 20,
    marginVertical: 5,
  },
});

export default SearchBar;
