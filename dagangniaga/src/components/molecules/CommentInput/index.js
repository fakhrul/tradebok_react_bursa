import React, { useState, useContext } from "react";
import { Keyboard, View, StyleSheet, Platform, TextInput } from "react-native";
import {
  colors,
  inputLimitErrorNotification,
  createAsyncDelay,
} from "../../../utils";
import { NativeImage, LoadingIndicator, IconButton } from "../../atoms";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../../../context/AuthContext.js";
import { MUTATION_ADD_COMMENT } from "../../../graphql/mutation";
import { useMutation } from "@apollo/react-hooks";

const CommentInput = ({ postId, scrollViewRef }) => {
  const { state } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [addComment, { loading }] = useMutation(MUTATION_ADD_COMMENT);

  const postComment = async () => {
    if (comment.length < 1) {
      inputLimitErrorNotification("Comment", "more", 1);
      return;
    }
    if (comment.length > 200) {
      inputLimitErrorNotification("Comment", "less", 200);
      return;
    }
    await addComment({
      variables: { userId: state.userId, postId, body: comment },
    });
    Keyboard.dismiss();
    setComment("");
    await createAsyncDelay(1200);
    scrollViewRef.current.scrollToEnd();
  };

  const Icon = () => (
    <MaterialIcons name="done" size={24} color={colors.accent} />
  );

  let content = (
    <View style={styles.loading}>
      <LoadingIndicator color={colors.accent} size={4}></LoadingIndicator>
    </View>
  );
  if (!loading) {
    content = (
      <IconButton
        Icon={Icon}
        onPress={postComment}
        style={styles.postButton}
      ></IconButton>
    );
  }
  return (
    <View style={styles.container}>
      <NativeImage
        uri={state.currentUser.avatar}
        style={styles.commentAvatarImage}
      />
      <TextInput
        style={styles.commentTextInput}
        value={comment}
        placeholder={`Add a comment as ${state.currentUser.handle}...`}
        placeholderTextColor={colors.text02}
        onChangeText={setComment}
      />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopColor: colors.translucent,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.base,
  },
  commentAvatarImage: {
    height: 36,
    width: 36,
    backgroundColor: colors.placeholder,
    marginRight: 10,
    borderRadius: 50,
  },
  commentTextInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.select({ ios: 8, android: 6 }),
    paddingHorizontal: 20,
    backgroundColor: colors.placeholder,
    color: colors.text01,
    borderRadius: 20,
    marginVertical: 5,
  },
  loading: {
    marginLeft: 10,
  },
  postButton: {
    width: undefined,
    marginLeft: 10,
  },
});

export default CommentInput;
