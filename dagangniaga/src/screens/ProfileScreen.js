import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components";

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="Profile" navigation={navigation}></Header>
      <Text>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#EFECF4",
    },
});

export default ProfileScreen;
