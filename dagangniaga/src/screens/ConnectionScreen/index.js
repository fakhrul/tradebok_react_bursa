import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Header,
  AnimatedSearchBar,
  ExploreScreenPlaceholder,
  SearchUsersPlaceholder,
  SvgBanner,
  UserSearchResults,
} from "../../components";
import { colors } from "../../utils";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_SEARCH_USERS } from "../../graphql/query";
import { Context as AuthContext } from "../../context/AuthContext";
import SearchUsersBanner from "../../resources/search-users.svg";
import posed, { Transition } from "react-native-pose";

const FadeView = posed.View({
  enter: { opacity: 1 },
  exit: { opacity: 0.25 },
});

const ConnectionScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [
    searchUsersQuery,
    {
      data: searchUsersQueryData,
      loading: searchUsersQueryLoading,
      called: searchUsersQueryCalled,
      error: searchUsersQueryError,
    },
  ] = useLazyQuery(QUERY_SEARCH_USERS);

  useEffect(() => {
    if (userSearch !== "")
      searchUsersQuery({
        variables: { userId: state.userId, name: userSearch },
      });
    if (searchUsersQueryCalled && !searchUsersQueryLoading) {
      console.log("searchUsersQueryData", searchUsersQueryData);
      const { searchUsers } = searchUsersQueryData;
      setSearchResults(searchUsers);
    }
  }, [
    userSearch,
    searchUsersQueryData,
    searchUsersQueryCalled,
    searchUsersQueryLoading,
  ]);

  const onMorePress = () => {};

  const onFocus = () => setIsSearchFocused(true);
  const onBlur = () => setIsSearchFocused(false);

  let content = <ExploreScreenPlaceholder />;

  if (isSearchFocused) {
    let subContent;
    if (searchUsersQueryCalled && searchUsersQueryLoading) {
      subContent = <SearchUsersPlaceholder />;
    } else if (!searchUsersQueryLoading && userSearch === "") {
      subContent = (
        <SvgBanner
          Svg={SearchUsersBanner}
          spacing={16}
          placeholder="Search for users..."
        />
      );
    } else if (
      searchUsersQueryCalled &&
      !searchUsersQueryLoading &&
      !searchUsersQueryError
    ) {
      console.log("searchResults", searchResults);
      subContent = <UserSearchResults navigation={navigation} searchResults={searchResults} />;
    }

    content = (
      <Transition animateOnMount>
        <FadeView style={styles.fadeView} key="search-content">
          {subContent}
        </FadeView>
      </Transition>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Connections"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>
      <AnimatedSearchBar
        onFocus={onFocus}
        onBlur={onBlur}
        value={userSearch}
        onChangeText={setUserSearch}
        placeholder="Search for users..."
      />
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
    flex: 1,
  },
  fadeView: {
    flex: 1,
  },
});

export default ConnectionScreen;
