import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeImage } from "../../../components";
import { colors, parseLikes } from "../../../utils";
import { AntDesign } from "@expo/vector-icons";
import { Context as AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import { responsiveWidth } from 'react-native-responsive-dimensions';


const PostCard = ({ navigation, id, author, time, uri, likes, caption }) => {
  const { state } = useContext(AuthContext);

  const navigateToPost = () => navigation.navigate("PostView", { postId: id });

  // const readableTime = moment(time).fromNow();
  // const readableLikes = parseLikes(likes.length);
  // const isLiked = likes.includes(state.userId);

  
  const parseLikes = (likeCount) => {
    return likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`;
  };

  const readableTime = moment(time).fromNow();
  const isContainMyLike = likes.filter(
    (likePost) => {
      return likePost.author.id === state.userId
    }
  );
  const isLiked = isContainMyLike.length > 0 ? true: false;
  const readableLikes = parseLikes(likes.length);

  return (
    <TouchableOpacity
      onPress={navigateToPost}
      activeOpacity={0.9}
      style={styles.container}
    >
      <NativeImage uri={uri} style={styles.postImage} />

      <View style={styles.upperContent}>
        <NativeImage uri={author.avatar} style={styles.avatarImage} />
        <View>
          <Text style={styles.handleText}>{author.handle}</Text>
          <Text style={styles.timeText}>{readableTime}</Text>
        </View>
      </View>

      <View style={styles.lowerContent}>
        <View style={styles.likeContent}>
          <AntDesign
            name="heart"
            color={isLiked ? colors.like : colors.unlike}
            size={20}
          />
          <Text style={styles.likesText}>{readableLikes}</Text>
        </View>

        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.captionText}>
          {caption}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveWidth(90),
    width: responsiveWidth(90),
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: colors.black,
    overflow: "hidden",
    borderRadius: 10,
  },
  postImage: {
    position: "absolute",
    height: responsiveWidth(90),
    width: responsiveWidth(90),
  },
  avatarImage: {
    height: 44,
    width: 44,
    backgroundColor: colors.placeholder,
    borderRadius: 45,
    marginRight: 10,
  },
  upperContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.translucent,
  },
  lowerContent: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: colors.translucent,
  },
  likeContent: {
    flexDirection: "row",
  },
  handleText: {
    fontSize: 16,
    color: colors.white,
  },
  timeText: {
    fontSize: 14,
    color: colors.white,
    marginTop: 2,
  },
  likesText: {
    fontSize: 16,
    marginLeft: 8,
    color: colors.white,
  },
  captionText: {
    fontSize: 16,
    color: colors.white,
    marginTop: 5,
  },
});

export default PostCard;
