import React from 'react';
import { Animated, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {colors} from "../../../utils";

const DeleteCardRightActions = ({ progress, dragX, onDelete, style }) => {
  
  const translateX = dragX.interpolate({
    inputRange: [0, 80, 100, 101],
    outputRange: [-10, 0, 0, 1]
  });

  const slideEffect = { opacity: progress, transform: [{ translateX }] };

  return (
    <Animated.View style={[styles.container, slideEffect, style]}>
      <MaterialIcons
        name='delete'
        onPress={onDelete}
        color={colors.white}
        size={24}
        style={styles.delete}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.delete,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  delete: {
    width: 50,
    textAlign: 'center'
  }
});

export default DeleteCardRightActions;