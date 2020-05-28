import React, { useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import {
  Header,
  ProfileScreenPlaceholder,
  ProfileCard,
  ListEmptyComponent,
  ProfileHeader
} from "../../components";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../../graphql/query";
import { PollIntervals } from "../../constants";
import { Context as AuthContext } from "../../context/AuthContext";
import SettingsBottomSheet from "./components/SettingsBottomSheet";
import { Modalize } from "react-native-modalize";
import { colors, sortPostsAscendingTime } from "../../utils";
import { PostList } from "../../components";

const MyProfileScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { id: state.userId },
    pollInterval: PollIntervals.profile,
    fetchPolicy: "network-only",
  });

  const settingsBottomSheetRef = useRef(null);

  useEffect(() => {
    console.log(state.userId);
  });

  const onFollowingOpen = () => console.log("onFollowingOpen");
  // @ts-ignore
  const onFollowersOpen = () => console.log("onFollowersOpen");
  // @ts-ignore
  const onEdit = () => console.log("onEdit");


  const renderItem = ({ item }) => {
    const {
      getUser: { avatar, name },
    } = data;
    return <PostList name={name} avatar={avatar} navigation={navigation} item={item}></PostList>;
  };

  let content = <ProfileScreenPlaceholder />;

  if (!loading && !error) {
    const {
      getUser: {
        avatar,
        name,
        handle,
        following,
        followers,
        about,
        posts,
      },
    } = data;
    // console.log("posts", posts);
    const sortedPosts = sortPostsAscendingTime(posts);
    content = (
      <>
        <ScrollView>
          <View>
            <ProfileHeader
              avatar={avatar}
              name={name}
              handle={handle}
              following={following.length}
              followers={followers.length}
              about={about}
              onEdit={onEdit}
              onFollowingOpen={onFollowingOpen}
              onFollowersOpen={onFollowersOpen}
            ></ProfileHeader>
            <FlatList
              style={styles.feed}
              data={sortedPosts}
              renderItem={({ item }) => renderItem({ item })}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            ></FlatList>
          </View>
        </ScrollView>
      </>
    );
  }

  const onMorePress = () => {
    settingsBottomSheetRef.current?.open();
  };

  const onAddPostPress = () => {
    settingsBottomSheetRef.current?.close();
    navigation.navigate("AddPost");
  };

  const onBlockListPress = () => {};

  return (
    <View style={styles.container}>
      <Header
        title="Profile"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      {content}
      <Modalize
        ref={settingsBottomSheetRef}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        modalStyle={styles.settingContainer}
        adjustToContentHeight
      >
        <SettingsBottomSheet
          onAddPostPress={onAddPostPress}
          onBlockListPress={onBlockListPress}
        ></SettingsBottomSheet>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  settingContainer: {
    padding: 20,
    backgroundColor: colors.base,
  },
});

export default MyProfileScreen;
