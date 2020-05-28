import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { FlatGrid } from "react-native-super-grid";
import { Entypo } from "@expo/vector-icons";
// import { Connections, IconSizes, PollIntervals, PostDimensions } from '@app/constants';
// import { AppContext } from '@app/context';
import { QUERY_USER } from "../../graphql/query";
import {
  ConfirmationModal,
  ConnectionsBottomSheet,
  IconButton,
  ListEmptyComponent,
  PostThumbnail,
  ProfileCard,
  ProfileScreenPlaceholder,
  Header,
  ProfileHeader,
  PostList
} from "../../components";
import {
  colors,
  userBlockedNotification,
  sortPostsAscendingTime,
} from "../../utils";
import ProfileOptionsBottomSheet from "./components/ProfileOptionsBottomSheet";
import UserInteractions from "./components/UserInteractions";
import { MUTATION_BLOCK_USER } from "../../graphql/mutation";

const ProfileViewScreen = ({ navigation }) => {
  const profileId = navigation.getParam("profileId");

  const [blockConfirmationModal, setBlockConfirmationModal] = useState(false);

  const { data, loading, error } = useQuery(QUERY_USER, {
    variables: { id: profileId },
    pollInterval: 1000,
    fetchPolicy: "network-only",
  });

  const [blockUser] = useMutation(MUTATION_BLOCK_USER);

  const followingBottomSheetRef = useRef();
  const followersBottomSheetRef = useRef();
  const profileOptionsBottomSheetRef = useRef();

  // @ts-ignore
  const onFollowingOpen = () => {
    console.log("onFollowingOpen click");
    followingBottomSheetRef.current.open();
  }
  // @ts-ignore
  const onFollowersOpen = () => followersBottomSheetRef.current.open();
  // @ts-ignore
  const onProfileOptionsOpen = () =>
    profileOptionsBottomSheetRef.current.open();
  // @ts-ignore
  const onProfileOptionsClose = () =>
    profileOptionsBottomSheetRef.current.close();

  const toggleBlockConfirmationModal = () =>
    setBlockConfirmationModal(!blockConfirmationModal);

  const onEdit = () => console.log("onEdit");

  const ListHeaderComponent = () => {
    const {
      user: { avatar, following, followers, name, handle, about },
    } = data;
    return (
      <View></View>
      //   <ProfileCard
      //     avatar={avatar}
      //     onFollowingOpen={onFollowingOpen}
      //     onFollowersOpen={onFollowersOpen}
      //     following={following.length}
      //     followers={followers.length}
      //     name={name}
      //     handle={handle}
      //     renderInteractions={() => (
      //       <UserInteractions targetId={userId} avatar={avatar} handle={handle} />
      //     )}
      //     about={about}
      //   />
    );
  };

  const renderItem = ({ item }) => {
    const {
      getUser: { avatar, name },
    } = data;
    return <PostList name={name} avatar={avatar} navigation={navigation} item={item}></PostList>;
    // const { id, uri } = item;
    // return (
    //   <PostThumbnail
    //     id={id}
    //     uri={uri}
    //     dimensions={{ height: responsiveWidth(43), width: responsiveWidth(43) }}
    //   />
    // );
  };

  let content = <ProfileScreenPlaceholder viewMode />;

  if (!loading && !error) {
    console.log(data);
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
          <UserInteractions targetId={profileId} avatar={avatar} handle={handle} />
          <FlatList
            style={styles.feed}
            data={sortedPosts}
            renderItem={({ item }) => renderItem({ item })}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          ></FlatList>
          <ConnectionsBottomSheet
            viewMode
            ref={followingBottomSheetRef}
            data={following}
            handle={handle}
            type="FOLLOWING"
          />
          <ConnectionsBottomSheet
            viewMode
            ref={followersBottomSheetRef}
            data={followers}
            handle={handle}
            type="FOLLOWERS"
          />

        </ScrollView>
      </>
      //       <>
      //         <FlatGrid
      //           staticDimension={responsiveWidth(94)}
      //           ListHeaderComponent={ListHeaderComponent}
      //           itemDimension={150}
      //           items={sortedPosts}
      //           ListEmptyComponent={() => (
      //             <ListEmptyComponent listType="posts" spacing={30} />
      //           )}
      //           style={styles.postGrid}
      //           showsVerticalScrollIndicator={false}
      //           renderItem={renderItem}
      //         />
      //         {/* <ConnectionsBottomSheet
      //           viewMode
      //           ref={followingBottomSheetRef}
      //           data={following}
      //           handle={handle}
      //           type={Connections.FOLLOWING}
      //         />
      //         <ConnectionsBottomSheet
      //           viewMode
      //           ref={followersBottomSheetRef}
      //           data={followers}
      //           handle={handle}
      //           type={Connections.FOLLOWERS}
      //         /> */}
      //       </>
    );
  }

  const onBlockUser = () => {
    onProfileOptionsClose();
    toggleBlockConfirmationModal();
  };

  const processBlockUser = async () => {
    // const {
    //   user: { handle },
    // } = data;
    // toggleBlockConfirmationModal();
    // await blockUser({ variables: { from: user.id, to: userId } });
    // goBack();
    // userBlockedNotification(handle);
  };

  const IconRight = () => (
    <IconButton
      onPress={onProfileOptionsOpen}
      style={styles.profileOptions}
      Icon={() => (
        <Entypo name="dots-three-vertical" size={20} color={colors.text01} />
      )}
    />
  );

  const onMorePress = () => { };
  return (
    <View style={styles.container}>
      <Text>"test"</Text>
      <Header
        isBackButton
        title="Post View"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      {content}
      {/* <ProfileOptionsBottomSheet
        ref={profileOptionsBottomSheetRef}
        onBlockUser={onBlockUser}
      />
      <ConfirmationModal
        label="Confirm"
        title="Block"
        description="Are you sure you want to block this user?"
        color={colors.delete}
        isVisible={blockConfirmationModal}
        toggle={toggleBlockConfirmationModal}
        onConfirm={processBlockUser}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
  },
  postGrid: {
    flex: 1,
    marginHorizontal: 10,
  },
  profileOptions: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default ProfileViewScreen;
