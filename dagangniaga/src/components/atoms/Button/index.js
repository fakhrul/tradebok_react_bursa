import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import LoadingIndicator from '../LoadingIndicator';
import {colors} from "../../../utils";

const Button= ({ Icon, label, onPress, loading, containerStyle, labelStyle, indicatorColor }) => {

  let content = <LoadingIndicator size={8} color={indicatorColor || colors.white} />
  if (!loading) content = (
    <>
      {Icon && <Icon />}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </>
  );

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.container, containerStyle]}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: colors.accent
  },
  label: {
      fontSize: 16,
    marginLeft: 5,
    color: colors.white
  }
});

export default Button;