import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-navigation";

const PortfolioScreen = ({navigation}) => {
  const addNewNote = () => {
    navigation.navigate("PortfolioNote");
};
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>StockScreen</Text>
      <Button title="Add Note" onPress={addNewNote}></Button>
    </SafeAreaView>
  );
};

export default PortfolioScreen;
