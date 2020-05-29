import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useContext, useEffect } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import {FontAwesome} from '@expo/vector-icons';
import EmptyFeed from '../../resources/empty-feed.svg';
import { Context as AuthContext } from '../../context/AuthContext';
import { MUTATION_UPDATE_FCM_TOKEN } from '../../graphql/mutation';
import { QUERY_USER_FEED } from '../../graphql/query';
import { HomeHeader, IconButton, PostCardPlaceholder, SvgBanner } from '../../components';
// import { crashlytics, initializeFCM, messaging } from '@app/utils/firebase';
import {crashlytics,  initializeFCM } from '../../config/firebase';
import PostCard from './components/PostCard';
import {colors} from "../../utils";

const PostFeedScreen= ({navigation}) => {

  const { state } = useContext(AuthContext);

  const {
    data: userFeedQueryData,
    loading: userFeedQueryLoading,
    error: userFeedQueryError,
    refetch: userFeedRefetch
  } = useQuery(QUERY_USER_FEED, { variables: { userId: state.userId }, fetchPolicy: 'network-only' });
  
  const [updateFcmToken] = useMutation(MUTATION_UPDATE_FCM_TOKEN);

  const initialize = async () => {
    const fcmToken = await initializeFCM();
    if (fcmToken) {
      updateFcmToken({
        variables: {
          userId: state.userId,
          fcmToken
        }
      });
    }
  };

  useEffect(() => {
    // const onTokenRefreshListener = messaging.onTokenRefresh(fcmToken => {
    //   try {
    //     if (fcmToken) updateFcmToken({
    //       variables: {
    //         userId: state.userId,
    //         fcmToken
    //       }
    //     });
    //   } catch ({ message }) {
    //     crashlytics.recordCustomError("UPDATE_FCM_TOKEN", message)
    //   }
    // });

    return () => {
      // onTokenRefreshListener();
    };
  }, []);

  useEffect(() => {
    initialize();
  }, [])

  const navigateToMessages = () => navigation.navigate("messageFlow");

  const refreshControl = () => {
    const onRefresh = () => {
      try {
        userFeedRefetch();
      } catch { }
    };

    return (
      <RefreshControl
        tintColor={colors.text02}
        refreshing={userFeedQueryLoading}
        onRefresh={onRefresh}
      />
    );
  };

  const renderItem = ({ item }) => {

    const { id, uri, caption, likes, createdAt, author } = item;

    return <PostCard
      navigation={navigation}
      id={id}
      author={author}
      time={createdAt}
      uri={uri}
      likes={likes}
      caption={caption}
    />;
  };

  let content = <PostCardPlaceholder />;

  if (!userFeedQueryLoading && !userFeedQueryError) {
    const { userFeed } = userFeedQueryData;
    content = (
      <FlatGrid
        refreshControl={refreshControl()}
        itemDimension={responsiveWidth(85)}
        showsVerticalScrollIndicator={false}
        items={userFeed}
        ListEmptyComponent={() => <SvgBanner Svg={EmptyFeed} spacing={20} placeholder={`Let's follow someone`} />}
        style={styles.postList}
        spacing={20}
        renderItem={renderItem}
      />
    );
  }

  const IconRight = () => {
    const hasBadge = state.unreadMessages !== 0;
    return <IconButton
      hasBadge={hasBadge}
      badgeCount={state.unreadMessages}
      onPress={navigateToMessages}
      Icon={() =>
        <FontAwesome
          name='send'
          size={20}
          color={colors.text01}
        />}
    />;
  };

  return (
    <View style={styles.container}>
      <HomeHeader IconRight={IconRight} />
      {content}
    </View>
  );
};

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base
  },
  postList: {
    flex: 1
  }
});

export default PostFeedScreen;