import React from "react";
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
import MyProfileScreen from "./src/screens/MyProfileScreen";
import SignoutScreen from "./src/screens/SignoutScreen";
import ChatScreen from "./src/screens/ChatScreen";
import DrawerScreen from "./src/screens/DrawerScreen";
import LoginWithEmailScreen from "./src/screens/LoginWithEmailScreen";
import StreamAddScreen from "./src/screens/StreamAddScreen";
import AddPostScreen from "./src/screens/AddPostScreen";

import { createDrawerNavigator } from "react-navigation-drawer";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import ConversationScreen from "./src/screens/ConversationScreen";
import PostFeedScreen from "./src/screens/PostFeedScreen";
import { colors } from "./src/utils";

import {
  FontAwesome,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  Feather,
  Foundation,
  Ionicons
} from "@expo/vector-icons";

import {
  createAppContainer,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import PostViewScreen from "./src/screens/PostViewScreen";
import ExploreScreen from "./src/screens/ExploreScreen";
import ConnectionScreen from "./src/screens/ConnectionScreen";
import ProfileViewScreen from "./src/screens/ProfileViewScreen";
import MessageScreen from "./src/screens/MessageScreen";
import NotificationScreen from "./src/screens/NotificationScreen";

const dashboardFlow = createStackNavigator({
  Dashboard: DashboardScreen,
});
dashboardFlow.navigationOptions = {
  title: "Home",
  tabBarIcon: (
    <Foundation
      name="graph-pie"
      size={20}
      color={colors.text.title}
    ></Foundation>
  ),
};

const stockFlow = createStackNavigator({
  Stock: StockScreen,
});

const conversationFlow = createStackNavigator({
  Conversation: ConversationScreen,
});

const messageFlow = createStackNavigator({
  Message: MessageScreen,
  conversationFlow,
});

const exploreFlow = createStackNavigator({
  ExploreScreen,
  PostView: PostViewScreen,
});

const profileViewFlow = createStackNavigator({
  ProfileView: ProfileViewScreen,
  conversationFlow,
});

const connectionFlow = createStackNavigator({
  ConnectionScreen,
  // ProfileView: ProfileViewScreen,
  profileViewFlow,
});

const streamFlow = createStackNavigator({
  PostFeed: PostFeedScreen,
  // Stream: StreamScreen,
  // StreamAdd: StreamAddScreen,
});

const settingFlow = createStackNavigator({
  Setting: SettingScreen,
});

const chatFlow = createStackNavigator({
  // Chat: ChatScreen,
  messageFlow,
});

const portfolioFlow = createStackNavigator({
  Portfolio: PortfolioScreen,
  PortfolioNote: PortfolioNoteScreen,
});

conversationFlow.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

ProfileViewScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

MessageScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
messageFlow.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
profileViewFlow.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
NotificationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
ConnectionScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

ConversationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
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
ExploreScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

PostViewScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
DashboardScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

AddPostScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

streamFlow.navigationOptions = {
  title: "Stream",
  tabBarIcon: (
    <FontAwesome5
      name="stream"
      size={16}
      color={colors.text.title}
    ></FontAwesome5>
  ),
};

settingFlow.navigationOptions = {
  title: "Setting",
  tabBarIcon: <AntDesign name="setting" size={20}></AntDesign>,
};

portfolioFlow.navigationOptions = {
  title: "Portfolio",
  tabBarIcon: (
    <MaterialIcons
      name="monetization-on"
      size={20}
      color={colors.text.title}
    ></MaterialIcons>
  ),
};

stockFlow.navigationOptions = {
  title: "Watchlist",
  tabBarIcon: (
    <MaterialCommunityIcons
      name="pin"
      size={20}
      color={colors.text.title}
    ></MaterialCommunityIcons>
  ),
};

chatFlow.navigationOptions = {
  title: "Chat",
  tabBarIcon: (
    <Ionicons
      name="md-chatboxes"
      size={20}
      color={colors.text.title}
    ></Ionicons>
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

MyProfileScreen.navigationOptions = () => {
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
      profileFlow: createStackNavigator({
        Profile: MyProfileScreen,
        AddPost: AddPostScreen,
        PostView: PostViewScreen,
      }),
      //   ProfileScreen: {
      //     screen: ProfileScreen,
      //     navigationOptions: {
      //       title: "Profile",
      //       drawerIcon: ({ tintColor }) => (
      //         <Feather name="user" size={16} color={tintColor}></Feather>
      //       ),
      //     },
      //   },
      exploreFlow,
      connectionFlow,
      messageFlow,
      Notification: NotificationScreen,
      PostFeed: PostFeedScreen,
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

export default App;
