import React, { useEffect, useState } from "react";
import { Text, View, Button, Vibration, Platform } from "react-native";
import { ApolloProvider, useMutation } from "@apollo/react-hooks";
import client from "./src/graphql/client";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import {
  createAppContainer,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { setNavigator } from "./src/helper/navigationRef";
import {
  FontAwesome,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import StockScreen from "./src/screens/StockScreen";
import StreamScreen from "./src/screens/StreamScreen";
import SettingScreen from "./src/screens/SettingScreen";
import PortfolioScreen from "./src/screens/PortfolioScreen";
import PortfolioNoteScreen from "./src/screens/PortfolioNoteScreen";
import AboutScreen from "./src/screens/AboutScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignoutScreen from "./src/screens/SignoutScreen";
import ChatScreen from "./src/screens/ChatScreen";
import DrawerScreen from "./src/screens/DrawerScreen";
import LoginWithEmailScreen from "./src/screens/LoginWithEmailScreen";

import { createDrawerNavigator } from "react-navigation-drawer";
import WelcomeScreen from "./src/screens/WelcomeScreen";

const dashboardFlow = createStackNavigator({
  Dashboard: DashboardScreen,
});
dashboardFlow.navigationOptions = {
  title: "Home",
  tabBarIcon: (
    <MaterialCommunityIcons
      name="monitor-dashboard"
      size={20}
    ></MaterialCommunityIcons>
  ),
};

const stockFlow = createStackNavigator({
  Stock: StockScreen,
});

const streamFlow = createStackNavigator({
  Stream: StreamScreen,
});

const settingFlow = createStackNavigator({
  Setting: SettingScreen,
});

const chatFlow = createStackNavigator({
  Chat: ChatScreen,
});

const portfolioFlow = createStackNavigator({
  Portfolio: PortfolioScreen,
  PortfolioNote: PortfolioNoteScreen,
});

PortfolioScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
PortfolioNoteScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

DashboardScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

streamFlow.navigationOptions = {
  title: "Stream",
  tabBarIcon: <FontAwesome5 name="newspaper" size={20}></FontAwesome5>,
};

settingFlow.navigationOptions = {
  title: "Setting",
  tabBarIcon: <AntDesign name="setting" size={20}></AntDesign>,
};

portfolioFlow.navigationOptions = {
  title: "Portfolio",
  tabBarIcon: <FontAwesome name="money" size={20}></FontAwesome>,
};

stockFlow.navigationOptions = {
  title: "Stocks",
  tabBarIcon: <Entypo name="line-graph" size={20}></Entypo>,
};

chatFlow.navigationOptions = {
  title: "Chat",
  tabBarIcon: (
    <MaterialIcons name="chat-bubble-outline" size={20}></MaterialIcons>
  ),
};

SettingScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
ChatScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

RegisterScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const switchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  anonymousFlow: createSwitchNavigator({
    Login: LoginScreen,
    loginWithEmailFlow: createStackNavigator({
      LoginWithEmail: {
        screen: LoginWithEmailScreen,
        navigationOptions: { title: "Email", headerShown: false },
      },
      Register: RegisterScreen,
    }),
  }),
  Welcome: WelcomeScreen,
  userFlow: createDrawerNavigator(
    {
      homeFlow: createBottomTabNavigator({
        dashboardFlow,
        stockFlow,
        streamFlow,
        portfolioFlow,
        chatFlow,
      }),
      ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          title: "Profile",
          drawerIcon: ({ tintColor }) => (
            <Feather name="user" size={16} color={tintColor}></Feather>
          ),
        },
      },
      SettingScreen,
      AboutScreen,
      SignoutScreen,
    },
    { contentComponent: (props) => <DrawerScreen {...props}></DrawerScreen> }
  ),
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
StockScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

StreamScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const App = createAppContainer(switchNavigator);

export default () => {
  console.ignoredYellowBox = ["Setting a timer"];
  const [state, setState] = new useState({
    expoPushToken: "",
    notification: {},
  });

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  useEffect(() => {
    // this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  });

  _handleNotification = (notification) => {
    Vibration.vibrate();
    console.log(notification);
    setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    const message = {
      to: this.state.expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { data: "goes here" },
      _displayInForeground: true,
    };
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        ></App>
      </AuthProvider>
    </ApolloProvider>
  );
};
