import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components";
import { colors } from "../../utils";

const ConnectionScreen = ({ navigation }) => {
  const onMorePress = () => {};
  return (
    <View style={styles.container}>
      <Header
        title="Connections"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      {/* <AnimatedSearchBar
        onFocus={onFocus}
        onBlur={onBlur}
        value={userSearch}
        onChangeText={setUserSearch}
        placeholder="Search for users..."
      />
      <View style={styles.content}>{content}</View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // borderWidth: 1
  },
  content: {
    flex: 1,
  },
});

export default ConnectionScreen;
