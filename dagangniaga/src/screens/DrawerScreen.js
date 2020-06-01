import React, { useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Foundation,
  Fontisto,
  FontAwesome5,
  Octicons
} from "@expo/vector-icons";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { NavigationActions } from "react-navigation";
import { colors } from "../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { SidebarLink, SidebarTitle } from "../components";
import { Context as AuthContext } from "../context/AuthContext";
import { DrawerHeaderPlaceholder, DrawerHeader } from "../components";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../graphql/query";
import { PollIntervals } from "../constants";

const DrawerScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { id: state.userId },
    pollInterval: PollIntervals.profile,
    fetchPolicy: "network-only",
  });

  const onHeaderPress = () => {
    navigation.navigate("profileFlow");
  }
  let drawerHeader = <DrawerHeaderPlaceholder />;

  if (!loading && !error) {
    const {
      getUser: {
        avatar,
        name,
        handle,
        following,
        followers,
      },
    } = data;

    drawerHeader = (
      <>
        <View>
          <DrawerHeader
            onPress={onHeaderPress}
            avatar={avatar}
            name={name}
            handle={handle}
            following={following.length}
            followers={followers.length}
            
          ></DrawerHeader>
        </View>
      </>
    );
  }

  const navigateToScreen = (route) => () => {
    navigation.navigate(route);
  };

  return (
    <ScrollView>
      <View
        style={{
          width: undefined,
          height: 150,
          padding: 16,
          paddingTop: 48,
          backgroundColor: colors.background,
          // flexDirection: "row",
        }}
      >
        {drawerHeader}

      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <View>
          <SidebarLink
            navigation={navigation}
            title="Home"
            route="homeFlow"
            icon={
              <Ionicons
                name="md-home"
                size={20}
                color={colors.text.title}
              ></Ionicons>
            }
          ></SidebarLink>
          {/* <SidebarLink
            navigation={navigation}
            title="Profile"
            route="profileFlow"
            icon={
              <Ionicons
                name="md-person"
                size={20}
                color={colors.text.title}
              ></Ionicons>
            }
          ></SidebarLink> */}
          <Divider></Divider>
          <SidebarTitle title="TRADE"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Portfolio"
            route="homeFlow"
            icon={
              <MaterialIcons
                name="monetization-on"
                size={20}
                color={colors.text.title}
              ></MaterialIcons>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Watchlist"
            route="homeFlow"
            icon={
              <MaterialCommunityIcons
                name="pin"
                size={20}
                color={colors.text.title}
              ></MaterialCommunityIcons>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Notifications"
            route="Notification"
            icon={
              <MaterialCommunityIcons
                name="bell-alert"
                size={20}
                color={colors.text.title}
              ></MaterialCommunityIcons>
            }
          ></SidebarLink>

          <Divider />
          <SidebarTitle title="DISCOVER"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Market Status"
            route="homeFlow"
            icon={
              <Foundation
                name="graph-pie"
                size={20}
                color={colors.text.title}
              ></Foundation>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Stocks"
            route="homeFlow"
            icon={
              <Fontisto
                name="line-chart"
                size={16}
                color={colors.text.title}
              ></Fontisto>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Posts"
            route="exploreFlow"
            icon={
              <FontAwesome5
                name="stream"
                size={20}
                color={colors.text.title}
              ></FontAwesome5>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Connections"
            route="connectionFlow"
            icon={
              <Ionicons name="ios-people" size={20} color={colors.text.title} />
            }
          ></SidebarLink>
          {/* <SidebarLink
            navigation={navigation}
            title="Messages"
            route="messageFlow"
            icon={
              <Ionicons name="ios-people" size={20} color={colors.text.title} />
            }
          ></SidebarLink> */}

          <Divider />
          <SidebarTitle title="COMMUNICATE"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Chat"
            route="messageFlow"
            icon={
              <Ionicons
                name="md-chatboxes"
                size={20}
                color={colors.text.title}
              ></Ionicons>
            }
          ></SidebarLink>
          <Divider />
          <SidebarTitle title="LEARN"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="About Trading"
            route="homeFlow"
            icon={
              <FontAwesome5
                name="book"
                size={16}
                color={colors.text.title}
              ></FontAwesome5>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="How To Use App"
            route="homeFlow"
            icon={
              <FontAwesome5
                name="mobile"
                size={18}
                color={colors.text.title}
              ></FontAwesome5>
            }
          ></SidebarLink>
          <Divider />
          <SidebarTitle title="ABOUT"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="App Info"
            route="homeFlow"
            icon={
              <Octicons
                name="organization"
                size={20}
                color={colors.text.title}
              ></Octicons>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Feedback"
            route="homeFlow"
            icon={
              <MaterialIcons
                name="email"
                size={20}
                color={colors.text.title}
              ></MaterialIcons>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Disclaimer"
            route="homeFlow"
            icon={
              <FontAwesome5
                name="handshake"
                size={20}
                color={colors.text.title}
              ></FontAwesome5>
            }
          ></SidebarLink>
          <Divider></Divider>
          <SidebarTitle title="MORE"></SidebarTitle>
          <SidebarLink
            navigation={navigation}
            title="Setting"
            route="homeFlow"
            icon={
              <MaterialCommunityIcons
                name="settings"
                size={20}
                color={colors.text.title}
              ></MaterialCommunityIcons>
            }
          ></SidebarLink>
          <SidebarLink
            navigation={navigation}
            title="Logout"
            route="SignoutScreen"
            icon={
              <Ionicons
                name="ios-exit"
                size={20}
                color={colors.text.title}
              ></Ionicons>
            }
          ></SidebarLink>


        </View>
        {/* <DrawerNavigatorItems {...props}></DrawerNavigatorItems> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  navItemStyle: {
    padding: 10,
  },
  navSectionStyle: {
    backgroundColor: "lightgrey",
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footerContainer: {
    padding: 20,
    backgroundColor: "lightgrey",
  },
});

export default DrawerScreen;
