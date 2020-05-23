// import React from "react";
// import { View, Text } from "react-native";

// const Comments = () => {

//   return (
//     <View>
//       <Text>ha</Text>
//     </View>
//   );
// };

// export default Comments;

import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { colors } from "../../../utils";
import { ListEmptyComponent, CommentCard } from "../../../components";

const Comments = ({ navigation, postId, comments }) => {
  const renderItem = ({ item }) => {
    const {
      id: commentId,
      author: { id: authorId, avatar, handle },
      body,
      createdAt,
    } = item;

    return (
      // <View></View>
      <CommentCard
        navigation={navigation}
        postId={postId}
        commentId={commentId}
        authorId={authorId}
        avatar={avatar}
        handle={handle}
        body={body}
        time={createdAt}
      />
    );
  };

  const ListHeaderComponent = () => (
    <Text style={[styles.commentsHeader, { marginBottom }]}>Comments</Text>
  );

  // console.log("comments", comments);
  // console.log("length", comments.length);

  const marginBottom = comments.length === 0 ? 0 : 10;

  return (
    // <View></View>
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      data={comments}
      renderItem={renderItem}
      style={styles.listStyle}
      ListEmptyComponent={() => (
        <ListEmptyComponent
          placeholder="Be the first one to comment"
          placeholderStyle={styles.placeholderStyle}
          spacing={10}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  commentsHeader: {
    fontSize: 16,
    color: colors.text01,
    marginTop: 5
  },
  listStyle: {
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
});

export default Comments;
