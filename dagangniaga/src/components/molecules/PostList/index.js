import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import moment from "moment";
import { colors } from "../../../utils/colors";
import { MaterialIcons } from "@expo/vector-icons";

const PostList = ({navigation, name, avatar, item }) => {
  const { id, caption, uri, createdAt } = item;
  const displayTime = moment(createdAt).format("LLLL");
  const onPostPress = () => {
    navigation.navigate("PostView", {postId: id})
  };
  return (
    <View
      style={
        {
          // borderWidth: 1
        }
      }
    >
      <View
        style={{
          backgroundColor: "#FFF",
          borderRadius: 5,
          padding: 8,
          marginVertical: 5,
          height: 280,
        }}
      >
        <View
          style={{
            // borderColor: "#000",
            // borderWidth: 1,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={{ uri: avatar ? avatar : "" }}
            style={styles.avatar}
            imageStyle={styles.avatarImage}
          ></ImageBackground>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.text.default,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.text.timestamp,
              }}
            >
              {displayTime}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={onPostPress}>
            <Text>{caption}</Text>
            <View
              style={
                {
                  // borderWidth: 1
                }
              }
            >
              {{ uri } ? (
                <Image
                  source={uri ? { uri: uri } : null}
                  // source={{ uri: uri }}
                  style={{
                    width: undefined,
                    height: 150,

                    // borderRadius: 5,
                    marginVertical: 16,
                  }}
                  resizeMode="cover"
                ></Image>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 35,
    width: 35,
  },
  avatarImage: {
    backgroundColor: colors.placeholder,
    borderRadius: 35,
  },
});
export default PostList;
