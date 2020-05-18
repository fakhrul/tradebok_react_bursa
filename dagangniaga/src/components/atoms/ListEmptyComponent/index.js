import React, { useContext } from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import {colors} from "../../../utils";

const ListEmptyComponent = ({ listType, spacing, style, placeholder, placeholderStyle }) => {
  let content = `No ${listType} yet`;
  if (placeholder) {
    content = placeholder;
  }

  return (
    <View style={[styles.container, { height: responsiveHeight(spacing) }, style]}>
      <Text style={[styles.placeholderText, placeholderStyle]}>{content}</Text>
    </View>
  );
};

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  placeholderText: {
    color: colors.text.text02
  }
});

export default ListEmptyComponent;