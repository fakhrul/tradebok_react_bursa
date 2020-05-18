import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Button from "../Button";
import { colors } from "../../../utils";

const ConfirmationModal = ({
  title,
  description,
  isVisible,
  toggle,
  label,
  color,
  onConfirm,
}) => {
  return (
    <Modal
      useNativeDriver
      animationInTiming={400}
      animationOutTiming={400}
      hideModalContentWhileAnimating
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={toggle}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.subHeading}>{description}</Text>
        <Button
          label={label}
          onPress={onConfirm}
          loading={false}
          containerStyle={[
            styles.confirm,
            { backgroundColor: color || colors.accent },
          ]}
        />
        <Button
          label="Cancel"
          onPress={toggle}
          loading={false}
          labelStyle={{ color: colors.text02 }}
          containerStyle={[styles.cancel, { backgroundColor: colors.base }]}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.base,
  },
  heading: {
    fontSize:20,
    color: colors.text01,
  },
  subHeading: {
    fontSize: 16,
    marginTop: 10,
    color: colors.text02,
  },
  confirm: { marginTop: 40 },
  cancel: { marginTop: 10 },
});

export default ConfirmationModal;
