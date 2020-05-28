import React from 'react';
import { StyleSheet, View } from 'react-native';
import {LoadingIndicator} from '../../../components';
import {colors} from "../../../utils";

const ConversationScreenPlaceholder = () => (
  <View style={styles.container}>
    <LoadingIndicator size={12} color={colors.accent} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ConversationScreenPlaceholder;