import React, { useState, useEffect, useRef, useContext } from "react";
import {
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/react-hooks";

import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { Header } from "../../components";
import { colors } from "../../utils";
import {
  PostViewPlaceHolder,
  CommentInput,
  NativeImage,
} from "../../components";
import { Entypo } from "@expo/vector-icons";
import { QUERY_POST } from "../../graphql/query";
import moment from "moment";
import { responsiveWidth } from 'react-native-responsive-dimensions';
import {Context as AuthContext} from "../../context/AuthContext";

const PostViewScreen = ({ navigation }) => {
  const postId = navigation.getParam("postId");
  const { state } = useContext(AuthContext);

  const scrollViewRef = useRef();
  const likeBounceAnimationRef = useRef();

  const [postData, setPostData] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [lastTap, setLastTap] = useState(Date.now());

  const [
    queryPost,
    {
      data: postQueryData,
      called: postQueryCalled,
      loading: postQueryLoading,
      error: postQueryError,
    },
  ] = useLazyQuery(QUERY_POST, {
    variables: { id: postId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (postQueryCalled && !postQueryLoading) {
      setPostData(postQueryData);
      console.log(postQueryData);
    } else if (!postQueryCalled) {
      queryPost();
    }
  }, [postQueryData, postQueryCalled, postQueryLoading]);

  const onMorePress = () => {};
  const navigateToProfile = (authorId) => {
    navigation.navigate("ProfileView", { authorId });
  };
  const openOptions = () => {};

  const handleDoubleTap = (isLiked) => {};

  const openLikes = () => {};

  const readableLikes = () => {};

  let content = <PostViewPlaceHolder></PostViewPlaceHolder>;

  if (postQueryCalled && !postQueryLoading && !postQueryError && postData) {
    const {
      // @ts-ignore
      post: {
        author: { id, avatar, handle },
        comments,
        uri,
        likes,
        caption,
        createdAt,
      },
    } = postData;

    const readableTime = moment(createdAt).format("LLLL");
    const isLiked = likes.includes(state.userId);
    // const readableLikes = parseLikes(likes.length);

    content = (
      <View style={{borderWidth:1}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigateToProfile(authorId)}
          style={styles.postHeader}
        >
          <NativeImage uri={avatar} style={styles.avatarImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.handleText}>{handle}</Text>
            <Text style={styles.timeText}>{readableTime}</Text>
          </View>
          {/* <IconButton
            onPress={openOptions}
            Icon={() => (
              <Entypo
                name="dots-three-vertical"
                size={IconSizes.x4}
                color={theme.text01}
              />
            )}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDoubleTap(isLiked)}
          activeOpacity={1}
        >
          <NativeImage uri={uri} style={styles.postImage} />
          {/* <LikeBounceAnimation ref={likeBounceAnimationRef} /> */}
        </TouchableOpacity>
        <View style={styles.likes}>
          {/* <BounceView
            scale={1.5}
            onPress={() => likeInteractionHandler(isLiked)}
          >
            <AntDesign
              name="heart"
              color={isLiked ? ThemeStatic.like : ThemeStatic.unlike}
              size={IconSizes.x5}
            />
          </BounceView> */}
          {/* <Text onPress={openLikes} style={styles.likesText}>
            {readableLikes}
          </Text> */}
        </View>
        <Text style={styles.captionText}>
          <Text
            onPress={() => navigateToProfile(authorId)}
            style={styles.handleText}
          >
            {handle}
          </Text>
          {caption}
        </Text>
        {/* <Comments postId={postId} comments={comments} /> */}
      </View>
    );
  }

  const bottomSheets = (
    <View>
      <Text>bottom Sheets</Text>
    </View>
  );

  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;

  return (
    <>
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
        keyboardVerticalOffset={20}
        style={styles.container}
      >
        <Header
          isBackButton
          title="Post View"
          navigation={navigation}
          onPress={onMorePress}
        ></Header>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={styles.content}
        >
          {content}
        </ScrollView>
        <CommentInput postId={postId} scrollViewRef={scrollViewRef} />
        {bottomSheets}
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
    borderWidth: 1,
  },
  content: {
    borderWidth: 1,
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    height: 50,
    width: 50,
    backgroundColor: colors.placeholder,
    borderRadius: 50,
    marginRight: 12,
  },
  handleText: {
    fontSize: 16,
    color: colors.text01
  },
  timeText: {
    fontSize: 14,
    color: colors.text02,
    marginTop: 2
  },
  postImage: {
    height: responsiveWidth(90),
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: colors.placeholder
  },
});

export default PostViewScreen;
