import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Header = ({ title, navigation, isBackButton, ...more }) => {
  const navigateGoBack = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.header}>
      {isBackButton ? (
        <TouchableOpacity onPress={navigateGoBack}>
          <Ionicons name="md-arrow-back" size={32} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="ios-menu" size={32} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity {...more}>
        <Ionicons name="ios-more" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default Header;
