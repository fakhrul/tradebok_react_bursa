import React, { useContext } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { NativeImage } from "../../../components";
import { Context as AuthContext } from "../../../context/AuthContext";
import { colors } from "../../../utils";

const UserCard = ({
  navigation,
  userId,
  avatar,
  handle,
  name,
  onPress,
  style,
}) => {
  const { state } = useContext(AuthContext);

  const navigateToProfile = () => {
    if (userId === state.userId) return;
    console.log("userId", userId);
    console.log("name", name);

    navigation.navigate("ProfileView", { profileId: userId });
    console.log("navigate done");

  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress || navigateToProfile}
      style={[styles.container, style]}
    >
      <NativeImage uri={avatar} style={styles.avatarImage} />
      <View style={styles.info}>
        <Text style={styles.handleText}>{handle}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameText}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 5,
    width: "100%",
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.placeholder,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
  handleText: {
    fontSize: 16,
    color: colors.text01,
  },
  nameText: {
    fontSize: 14,
    color: colors.text02,
    marginTop: 5,
  },
});

export default UserCard;
