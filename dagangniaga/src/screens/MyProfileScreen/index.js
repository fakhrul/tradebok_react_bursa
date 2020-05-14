import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  Header,
  ProfileScreenPlaceholder,
  ProfileCard,
  ListEmptyComponent,
} from "../../components";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../../graphql/query";
import { PollIntervals } from "../../constants";
import { Context as AuthContext } from "../../context/AuthContext";
import { FlatGrid } from "react-native-super-grid";
import { responsiveWidth } from "react-native-responsive-dimensions";

const MyProfileScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { id: state.userId },
    pollInterval: PollIntervals.profile,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log(state.userId);
  });

  const onFollowingOpen = () => console.log("onFollowingOpen");
  // @ts-ignore
  const onFollowersOpen = () => console.log("onFollowersOpen");
  // @ts-ignore
  const onEdit = () => console.log("onEdit");

  const ProfileHeader = ({
    avatar,
    following,
    followers,
    name,
    handle,
    about,
  }) => {
    console.log("following", following);
    console.log("follower", followers);
    return (
      <View>
        <ProfileCard
          editable
          onEdit={onEdit}
          onFollowingOpen={onFollowingOpen}
          onFollowersOpen={onFollowersOpen}
          avatar={avatar}
          following={following}
          followers={followers}
          name={name}
          handle={handle}
          about={about}
        />
      </View>
    );
  };

  const ListHeaderComponent = () => {
    const {
      getUser: { avatar, name, handle, followingIds, followerIds, about },
    } = data;

    return (
      <ProfileHeader
        avatar={avatar}
        name={name}
        handle={handle}
        following={followingIds.length}
        followers={followerIds.length}
        about={about}
      ></ProfileHeader>
    );
  };

  const renderItem = ({ item }) => {
    console.log(item);
    const { id, caption, uri } = item;
    return (
      <Text>{caption}</Text>
      //   <PostThumbnail id={id} uri={uri} dimensions={PostDimensions.Medium} />
    );
  };

  let content = <ProfileScreenPlaceholder />;

  if (!loading && !error) {
    const {
      getUser: {
        avatar,
        name,
        handle,
        followingIds,
        followerIds,
        about,
        posts,
      },
    } = data;
    // console.log("posts", posts);
    // const sortedPosts = posts;
    content = (
      <>
        <ProfileHeader
          avatar={avatar}
          name={name}
          handle={handle}
          following={followingIds.length}
          followers={followerIds.length}
          about={about}
        ></ProfileHeader>
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => renderItem({ item })}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" navigation={navigation}></Header>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
});

export default MyProfileScreen;
