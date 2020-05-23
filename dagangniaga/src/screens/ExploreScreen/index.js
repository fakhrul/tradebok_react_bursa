import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_POSTS } from "../../graphql/query";
import { Context as AuthContext } from "../../context/AuthContext";
import {colors} from "../../utils";
import {Header, ExploreScreenPlaceholder} from "../../components";
import ExploreGrid from "./components/ExploreGrid";

const ExploreScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);

  const [
    queryPost,
    {
      data: postsQueryData,
      called: postsQueryCalled,
      loading: postsQueryLoading,
      error: postsQueryError,
      refetch: postsQueryRefetch,
    },
  ] = useLazyQuery(QUERY_POSTS, {
    variables: { userId: state.userId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    queryPost();
  }, []);

  const onMorePress = () => {

  }
  let content = <ExploreScreenPlaceholder />;

  
  const onRefresh = () => {
    try {
      postsQueryRefetch();
    } catch { }
  };

  if (postsQueryCalled && !postsQueryLoading && !postsQueryError) {
    const { posts } = postsQueryData;
    content = <ExploreGrid navigation = {navigation} posts={posts} onRefresh={onRefresh} tintColor={colors.text02} />;
  }

  return (
    <View style={styles.container}>
      <Header
        title="Explore"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      <View style={styles.content}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // borderWidth: 1
  },
  content: {
    flex: 1
  },
  settingContainer: {
    padding: 20,
    backgroundColor: colors.base,
  },
});

export default ExploreScreen;
