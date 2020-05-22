import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createRef,
} from "react";
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
import {
  Header,
  PostOptionsBottomSheet,
  BounceView,
  ConfirmationModal,
  LikesBottomSheet,
} from "../../components";
import { colors, postDeletedNotification } from "../../utils";
import {
  PostViewPlaceHolder,
  CommentInput,
  NativeImage,
  IconButton,
  Comments,
  LikeBounceAnimation,
} from "../../components";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { QUERY_POST } from "../../graphql/query";
import {
  MUTATION_DELETE_POST,
  MUTATION_ADD_LIKE,
  MUTATION_DELETE_LIKE,
} from "../../graphql/mutation";
import { SUBSCRIPTION_POST } from "../../graphql/subscription";

import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Context as AuthContext } from "../../context/AuthContext";
import EditPostBottomSheet from "./components/EditPostBottomSheet";
import { deleteFromStorage } from "../../config/firebase";

const PostViewScreen = ({ navigation }) => {
  const postId = navigation.getParam("postId");
  const { state } = useContext(AuthContext);

  const scrollViewRef = useRef();
  const postOptionsBottomSheetRef = useRef();
  const editPostBottomSheetRef = useRef();
  const likesBottomSheetRef = useRef();
  const likeBounceAnimationRef = createRef();

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

  const {
    data: postSubscriptionData,
    loading: postSubscriptionLoading,
  } = useSubscription(SUBSCRIPTION_POST, { variables: { id: postId } });

  const [deletePost] = useMutation(MUTATION_DELETE_POST);

  useEffect(() => {
    if (!postSubscriptionLoading) {
      setPostData(postSubscriptionData);
    } else if (postSubscriptionLoading) {
      if (postQueryCalled && !postQueryLoading) {
        setPostData(postQueryData);
      } else if (!postQueryCalled) {
        queryPost();
      }
    }
  }, [
    postQueryData,
    postQueryCalled,
    postQueryLoading,
    postSubscriptionData,
    postSubscriptionLoading,
  ]);
  // }, [postQueryData, postQueryCalled, postQueryLoading]);

  // const [likeInteraction, { loading: likeInteractionLoading }] = useMutation(
  //   MUTATION_LIKE_INTERACTION
  // );

  const [addLike, { loading: addLikeLoading }] = useMutation(MUTATION_ADD_LIKE);

  const [deleteLike, { loading: deleteLikeLoading }] = useMutation(
    MUTATION_DELETE_LIKE
  );

  const onMorePress = () => {
    openOptions();
  };
  const navigateToProfile = (authorId) => {
    navigation.navigate("ProfileView", { authorId });
  };

  const openOptions = () => {
    // @ts-ignore
    postOptionsBottomSheetRef.current.open();
  };

  const closeOptions = () => {
    postOptionsBottomSheetRef.current.close();
  };

  const handleDoubleTap = (isLiked) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 500;
    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      likeInteractionHandler(isLiked);
    } else {
      setLastTap(now);
    }

  };

  const openLikes = () => {
    likesBottomSheetRef.current.open();
  };

  // const readableLikes = () => {};
  const likeInteractionHandler = (isLiked: boolean) => {
    if (addLikeLoading) return;
    if (deleteLikeLoading) return;

    console.log("lineInteractionHandler");
    const variables = {
      postId,
      userId: state.userId,
    };

    if (isLiked) {
      return deleteLike({ variables });
    } else {
      likeBounceAnimationRef.current.animate();
      return addLike({ variables });
    }
  };

  const confirmationToggle = () => {
    setIsConfirmModalVisible(!isConfirmModalVisible);
  };

  const onPostEdit = () => {
    closeOptions();
    // @ts-ignore
    editPostBottomSheetRef.current.open();
  };

  const onPostDelete = () => {
    closeOptions();
    confirmationToggle();
  };

  const onDeleteConfirm = (uri: string) => {
    confirmationToggle();
    navigation.goBack();
    postDeletedNotification();
    deletePost({ variables: { postId } });
    deleteFromStorage(uri);
  };

  let content = <PostViewPlaceHolder></PostViewPlaceHolder>;

  if (postQueryCalled && !postQueryLoading && !postQueryError && postData) {
    const {
      // @ts-ignore
      post: {
        author: { id: authorId, avatar, handle },
        comments,
        uri,
        likes,
        caption,
        createdAt,
      },
    } = postData;

    const parseLikes = (likeCount) => {
      return likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`;
    };

    const readableTime = moment(createdAt).fromNow();
    // const isLiked = likes.includes(state.userId);
    const isContainMyLike = likes.filter(
      (likePost) => {
        return likePost.author.id === state.userId
      }
    );
    const isLiked = isContainMyLike.length > 0 ? true: false;
    const readableLikes = parseLikes(likes.length);

    content = (
      <View
        style={{
          borderWidth: 1,
        }}
      >
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
                size={16}
                color={colors.text01}
              />
            )}
          /> */}
        </TouchableOpacity>
        <Text style={styles.captionText}>
          {/* <Text
            onPress={() => navigateToProfile(authorId)}
            style={styles.handleText}
          >
            {handle}
          </Text>{" "} */}
          {caption}{" "}
        </Text>

        <TouchableOpacity
          onPress={() => handleDoubleTap(isLiked)}
          activeOpacity={1}
        >
          <NativeImage uri={uri} style={styles.postImage} />
          <LikeBounceAnimation ref={likeBounceAnimationRef} />
        </TouchableOpacity>
        <View style={styles.likes}>
          <BounceView
            scale={1.5}
            onPress={() => likeInteractionHandler(isLiked)}
          >
            <AntDesign
              name="heart"
              color={isLiked ? colors.like : colors.unlike}
              size={20}
            />
          </BounceView>
          <Text onPress={openLikes} style={styles.likesText}>
            {readableLikes}
          </Text>
        </View>
        <Comments
          navigation={navigation}
          postId={postId}
          comments={comments}
        ></Comments>
      </View>
    );
  }
  let bottomSheets;
  if (postQueryCalled && !postQueryLoading && !postQueryError && postData) {
    const {
      post: {
        author: { id: authorId },
        uri,
        likes,
        caption,
      },
    } = postData;

    // console.log("postData", postData);
    // console.log("likes", likes);

    bottomSheets = (
      <>
        <PostOptionsBottomSheet
          ref={postOptionsBottomSheetRef}
          authorId={authorId}
          postId={postId}
          onPostEdit={onPostEdit}
          onPostDelete={onPostDelete}
        />
        <EditPostBottomSheet
          ref={editPostBottomSheetRef}
          postId={postId}
          caption={caption}
        />
        <ConfirmationModal
          label="Delete"
          title="Delete post?"
          description={`Do you want to delete the current post? Post won't be recoverable later`}
          color={colors.delete}
          isVisible={isConfirmModalVisible}
          toggle={confirmationToggle}
          onConfirm={() => onDeleteConfirm(uri)}
        />
        <LikesBottomSheet
          ref={likesBottomSheetRef}
          likes={likes}
          onUserPress={navigateToProfile}
        />
      </>
    );
  }

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
    paddingHorizontal: 0,
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
    color: colors.text01,
  },
  timeText: {
    fontSize: 14,
    color: colors.text02,
    marginTop: 2,
  },
  postImage: {
    height: responsiveWidth(90),
    // width: responsiveWidth(90),
    width: "100%",
    alignSelf: "center",
    marginTop: 5,
    borderRadius: 0,
    backgroundColor: colors.placeholder,
  },
  likes: {
    flexDirection: "row",
    marginTop: 20,
  },
  likesText: {
    fontSize: 16,
    marginLeft: 10,
    color: colors.text01,
  },
  captionText: {
    fontSize: 16,
    color: colors.text01,
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: 5,
  },
});

export default PostViewScreen;
