import React from "react";
import {View, Text} from "react-native";
import {Header} from "../components";
import {colors} from  "../utils";
import {createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import MostActiveScreen from "./MostActiveScreen";
import TopGainerScreen from "./TopGainersScreen";
import TopLooserScreen from "./TopLooserScreen";

const HomeTabNavigator = createMaterialTopTabNavigator(
  {
    MostActive: {
      screen: MostActiveScreen,
      navigationOptions: {
        tabBarLabel: 'Most Active',
      },
    },
    TopGainer: {
      screen: TopGainerScreen,
      navigationOptions: {
        tabBarLabel: 'Top Gainer',
      },
    },
    TopLooser: {
      screen: TopLooserScreen,
      navigationOptions: {
        tabBarLabel: 'Top Looser',
      },
    },
  },
);

const Tabs = createAppContainer(HomeTabNavigator);

const DashboardScreen = ({navigation}) => {
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="Home"
        navigation={navigation}
        onPress={() => {
          alert("More option here");
        }}
      ></Header>
      <Tabs></Tabs>
    </View>
  );
};

export default DashboardScreen;
