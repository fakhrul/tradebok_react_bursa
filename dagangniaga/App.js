import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { setNavigator } from "./src/helper/navigationRef";
import {FontAwesome} from '@expo/vector-icons';

import { Provider as AuthProvider } from "./src/context/AuthContext"
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import StockScreen from "./src/screens/StockScreen";
import StreamScreen from "./src/screens/StreamScreen";
import SettingScreen from "./src/screens/SettingScreen";


const dashboardFlow = createStackNavigator({
  Dashboard: DashboardScreen,
});
dashboardFlow.navigationOptions = {
  title: "Home",
  tabBarIcon: <FontAwesome name="home" size={20}></FontAwesome>,
};

const stockFlow = createStackNavigator({
  Stock: StockScreen,
});
stockFlow.navigationOptions = {
  title: "Stocks",
  tabBarIcon: <FontAwesome name="home" size={20}></FontAwesome>,
};

const streamFlow = createStackNavigator({
  Stream: StreamScreen,
});
streamFlow.navigationOptions = {
  title: "Stream",
  tabBarIcon: <FontAwesome name="home" size={20}></FontAwesome>,
};

const settingFlow = createStackNavigator({
  Setting: SettingScreen,
});
settingFlow.navigationOptions = {
  title: "Setting",
  tabBarIcon: <FontAwesome name="home" size={20}></FontAwesome>,
};

SettingScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const switchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  anonymousFlow: createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
  }),
  userFlow: createBottomTabNavigator({
    dashboardFlow,
    stockFlow,
    streamFlow,
    settingFlow,
  }),
});


LoginScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
RegisterScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      ></App>
    </AuthProvider>
  );
};
