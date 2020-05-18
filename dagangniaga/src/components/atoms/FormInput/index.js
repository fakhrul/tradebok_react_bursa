import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { TextField } from "react-native-material-textfield";
import { colors } from "../../../utils";

const FormInput = React.forwardRef(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      children,
      multiline,
      characterRestriction,
      error,
    },
    ref
  ) => {
    return (
      <TextField
        ref={ref}
        error={error}
        autoCapitalize="none"
        tintColor={colors.accent}
        baseColor={colors.accent}
        fontSize={16}
        labelFontSize={16}
        labelTextStyle={styles.labelTextStyle}
        style={styles.textStyle}
        lineWidth={0}
        activeLineWidth={0}
        label={label}
        placeholder={placeholder}
        placeholderTextColor={colors.text.text02}
        onChangeText={onChangeText}
        value={value}
        multiline={multiline || false}
        characterRestriction={characterRestriction}
        renderRightAccessory={() => children}
      />
    );
  }
);

const styles = StyleSheet.create({
  labelTextStyle: {},
  textStyle: {
    color: colors.text.text01,
  },
});

export default FormInput;
