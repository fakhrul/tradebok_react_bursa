import React, { useContext, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import posed from "react-native-pose";
import { colors } from "../../../utils";

const TransitionInput = posed(TextInput)({
  focused: { width: "75%" },
  notFocused: { width: "90%" },
});

const TransitionTouchableOpacity = posed(TouchableOpacity)({
  focused: { width: 70 },
  notFocused: { width: 0 },
});

const AnimatedSearchBar = ({
  value,
  onChangeText,
  onFocus,
  onBlur,
  placeholder,
  style,
}) => {
  const [focused, setFocused] = useState(false);

  const onOpen = () => {
    setFocused(true);
    onFocus();
  };

  const onCancel = () => {
    setFocused(false);
    Keyboard.dismiss();
    onChangeText("");
    onBlur();
  };

  const pose = focused ? "focused" : "notFocused";

  return (
    <View style={styles.container}>
      <TransitionInput
        pose={pose}
        onFocus={onOpen}
        style={[styles.animatedSearchBar, style]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.text02}
        onChangeText={onChangeText}
      />
      <TransitionTouchableOpacity
        pose={pose}
        activeOpacity={0.9}
        onPress={onCancel}
        style={[styles.cancel]}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TransitionTouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  animatedSearchBar: {
    fontSize: 16,
    marginLeft: 20,
    paddingVertical: Platform.select({ ios: 10, android: 5 }),
    paddingHorizontal: 20,
    backgroundColor: colors.placeholder,
    color: colors.text01,
    borderRadius: 20,
    marginVertical: 5,
  },
  cancel: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    height: 20,
    fontSize: 16,
    color: colors.text01,
  },
});

export default AnimatedSearchBar;
