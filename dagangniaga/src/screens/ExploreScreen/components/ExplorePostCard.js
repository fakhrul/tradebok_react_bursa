import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { NativeImage } from "../../../components";
import {colors} from "../../../utils";
import { responsiveWidth } from 'react-native-responsive-dimensions';

const ExplorePostCard = ({ navigation, postId, uri }) => {

  const navigateToPost = () => {
    navigation.navigate("PostView", { postId });
  };

  return (
    <TouchableOpacity
      onPress={navigateToPost}
      activeOpacity={0.95}
      style={styles.container}
    >
      <NativeImage uri={uri} style={styles.postImage} />
      {/* <Text>{uri}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveWidth(28.5),
    width: responsiveWidth(28.5),
    overflow: "hidden",
    borderRadius: 5,
    // borderWidth: 1

  },
  postImage: {
    flex: 1,
    backgroundColor: colors.placeholder,
    // borderWidth: 1

  },
});

export default ExplorePostCard;
