import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { StyleSheet, View, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { FlatGrid } from "react-native-super-grid";
import EmptyLikesBanner from "../../../resources/empty-likes.svg";
import { QUERY_LIKE_USERS } from "../../../graphql/query";
import {
  BottomSheetHeader,
  ConnectionsPlaceholder,
  SvgBanner,
  UserCard,
} from "../../../components";
import { colors } from "../../../utils";

const LikesBottomSheet = React.forwardRef(({ likes, onUserPress }, ref) => {
  // const { id } = likes;
  // console.log(likes);

  // const { data, loading, error } = useQuery(QUERY_LIKE_USERS, {
  //   variables: { likes },
  //   fetchPolicy: "network-only",
  // });

  let content = <ConnectionsPlaceholder />;

  const ListEmptyComponent = () => (
    <SvgBanner Svg={EmptyLikesBanner} placeholder="No likes yet" spacing={16} />
  );

  const renderItem = ({ item }) => {
    const {
      author: { id, avatar, handle, name },
    } = item;
    // console.log("id", id);
    // console.log("handle", handle);
    // console.log("name", name);
    return (
      <UserCard
        userId={id}
        avatar={avatar}
        handle={handle}
        name={name}
        onPress={() => onUserPress(id)}
      />
    );
  };

  // if (!loading && !error) {
    // const { likeUsers } = data;

    // content = (
    //   <FlatGrid
    //     bounces={false}
    //     itemDimension={responsiveWidth(85)}
    //     showsVerticalScrollIndicator={false}
    //     items={likes}
    //     itemContainerStyle={styles.listItemContainer}
    //     contentContainerStyle={styles.listContentContainer}
    //     ListEmptyComponent={ListEmptyComponent}
    //     style={styles.listContainer}
    //     spacing={20}
    //     renderItem={renderItem}
    //   />
    // );
  // }

  if (likes.length > 0) {
    // const { likeUsers } = likes;

    content = (
      <FlatGrid
        bounces={false}
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={likes}
        itemContainerStyle={styles.listItemContainer}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={ListEmptyComponent}
        style={styles.listContainer}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  return (
    <Modalize
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles.container}
    >
      <BottomSheetHeader header="Likes" subHeader="Users who liked this post" />
      <View style={styles.content}>{content}</View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: colors.base,
  },
  content: {
    flex: 1,
    paddingBottom: responsiveHeight(5),
  },
  listContainer: {
    flex: 1,
  },
  listItemContainer: {
    width: "106%",
  },
  listContentContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default LikesBottomSheet;
