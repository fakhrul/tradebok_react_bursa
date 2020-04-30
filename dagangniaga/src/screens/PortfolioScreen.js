import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const PortfolioScreen = ({ navigation }) => {
  const posts = [
    {
      id: "1",
      name: "asd dasda",
      text: "dasda asdad ,asda asd,asd ",
      timestamp: 1588204660217,
      image: require("../resources/welcome.png"),
      avatar: require("../resources/login_logo.png"),
    },
    {
      id: "2",
      name: "asd dasda",
      text: "dasda asdad ,asda asd,asd ",
      timestamp: 1588204660217,
      image: require("../resources/register.png"),
      avatar: require("../resources/login_logo.png"),
    },
    {
      id: "3",
      name: "asd dasda",
      text: "dasda asdad ,asda asd,asd ",
      timestamp: 1588204660217,
      image: require("../resources/register.png"),
      avatar: require("../resources/login_logo.png"),
    },
    {
      id: "4",
      name: "asd dasda",
      text: "dasda asdad ,asda asd,asd dasda asdad ,asda asd,asd dasda asdad ,asda asd,asd dasda asdad ,asda asd,asd dasda asdad ,asda asd,asd dasda asdad ,asda asd,asd ",
      timestamp: 1588204660217,
      image: require("../resources/register.png"),
      avatar: require("../resources/login_logo.png"),
    },
  ];

  const addNewNote = () => {
    navigation.navigate("PortfolioNote");
  };

  const renderPost = (post) => {
    console.log(post);
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar}></Image>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
            </View>
            <Ionicons name="ios-more" size={24} color="#73788B"></Ionicons>
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image source={post.image} style={styles.postImage} resizeMode="cover"></Image>
          <View style={{flexDirection:"row"}}>
            <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{marginRight:16}}></Ionicons>
            <Ionicons name="ios-chatboxes" size={24} color="#73788B"></Ionicons>

          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stream</Text>
        <TouchableOpacity onPress={addNewNote}>
          <Text style={{ fontWeight: "500" }}>Add Note</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.feed}
        data={posts}
        renderItem={({ item }) => renderPost(item)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      ></FlatList>
      {/* <Button title="Add Note" onPress={addNewNote}></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingTop: 64,
    paddingHorizontal: 32,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    flexDirection:"row"

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage :{
    width: undefined,
    height: 150,

    borderRadius: 5,
    marginVertical: 16
  }
});
export default PortfolioScreen;
