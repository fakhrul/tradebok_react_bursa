import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { FollowInteraction, IconSizes, Routes, PollIntervals, Errors } from '@app/constants';
// import { AppContext } from '@app/context';
import client from "../../../graphql/client";
import {
  MUTATION_CREATE_TEMPORARY_CHAT,
  MUTATION_UPDATE_FOLLOWING,
} from "../../../graphql/mutation";
import { QUERY_CHAT_EXISTS, QUERY_DOES_FOLLOW } from "../../../graphql/query";
import { LoadingIndicator } from "../../../components";
import { crashlytics } from "../../../config/firebase";
import { colors, tryAgainLaterNotification } from "../../../utils";
import { Context as AuthContext } from "../../../context/AuthContext";

const UserInteractions = ({ navigation, targetId, avatar, handle }) => {
  const { state } = useContext(AuthContext);

  const {
    data: doesFollowData,
    loading: doesFollowLoading,
    error: doesFollowError,
  } = useQuery(QUERY_DOES_FOLLOW, {
    variables: { userId: user.id, targetId },
    pollInterval: PollIntervals.interaction,
  });

  const [updateFollowing, { loading: updateFollowingLoading }] = useMutation(
    MUTATION_UPDATE_FOLLOWING
  );
  const [createTemporaryChat] = useMutation(MUTATION_CREATE_TEMPORARY_CHAT);

  let content = <LoadingIndicator size={6} color={colors.white} />;

  if (!doesFollowLoading && !updateFollowingLoading && !doesFollowError) {
    const { doesFollow } = doesFollowData;
    content = (
      <Text style={styles.followInteractionText}>
        {`${doesFollow ? "FOLLOWING" : "FOLLOW"}`}
      </Text>
    );
  }

  const followInteraction = () => {
    if (doesFollowLoading) return;

    const { doesFollow } = doesFollowData;
    const updateFollowingArgs = { userId: state.userId, targetId };
    if (doesFollow) {
      updateFollowing({
        variables: {
          ...updateFollowingArgs,
          action: "UNFOLLOW",
        },
      });
    } else {
      updateFollowing({
        variables: {
          ...updateFollowingArgs,
          action: "FOLLOW",
        },
      });
    }
  };

  const messageInteraction = async () => {
    try {
      const {
        data: { chatExists },
      } = await client.query({
        query: QUERY_CHAT_EXISTS,
        variables: { userId: user.id, targetId },
      });

      if (chatExists) {
        navigate(Routes.ConversationScreen, {
          chatId: chatExists.id,
          avatar,
          handle,
          targetId,
        });
      } else {
        const { data } = await createTemporaryChat();
        navigate(Routes.ConversationScreen, {
          chatId: data.createTemporaryChat.id,
          avatar,
          handle,
          targetId,
        });
      }
    } catch ({ message }) {
      tryAgainLaterNotification();
      crashlytics.recordCustomError("INITIALIZE_CHAT", message);
    }
  };

  return (
    <View style={styles().container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={followInteraction}
        style={styles.followInteraction}
      >
        {content}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={messageInteraction}
        style={styles.messageInteraction}
      >
        <Text style={styles.messageInteractionText}>MESSAGE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  followInteraction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    paddingVertical: 7,
    borderRadius: 40,
    backgroundColor: colors.accent,
  },
  messageInteraction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    paddingVertical: 7,
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accent,
  },
  followInteractionText: {
    fontSize: 14,
    color: colors.white,
  },
  messageInteractionText: {
    fontSize: 14,
    color: colors.accent,
  },
});

export default UserInteractions;
