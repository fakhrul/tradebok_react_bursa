import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { colors } from "../../../utils";

const InputCustom = ({placeholder, ...rest}) => {
  return (
    <View style={{ maxWidth: 300 }}>
      <TextInput style={styles.input} placeholder={placeholder} 
      placeholderTextColor={colors.default} 
      autoCorrect = {false}
      autoCapitalize="none"
      {...rest}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.default,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
    fontSize: 14,
    width: 300,
    justifyContent:"center",
    textAlign:"center"
  },
});

export default InputCustom;
