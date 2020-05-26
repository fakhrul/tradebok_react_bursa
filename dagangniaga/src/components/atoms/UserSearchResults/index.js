import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { FlatGrid } from "react-native-super-grid";
import UserCard from "../UserCard";
import ListEmptyComponent from "../ListEmptyComponent";
import { Context as AuthContext } from "../../../context/AuthContext";

const UserSearchResults = ({navigation, searchResults }) => {
  const { state } = useContext(AuthContext);

  const filteredSearchResults = [...searchResults].filter(
    (result) => result.id !== state.userId
  );

  const renderItem = ({ item }) => {
    const { id, avatar, handle, name } = item;
    return <UserCard navigation={navigation} userId={id} avatar={avatar} handle={handle} name={name} />;
  };

  return (
    <FlatGrid
      itemDimension={responsiveWidth(85)}
      showsVerticalScrollIndicator={false}
      items={filteredSearchResults}
      ListEmptyComponent={() => (
        <ListEmptyComponent placeholder="No users found" spacing={60} />
      )}
      style={styles.container}
      spacing={20}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveWidth(100),
  },
});

export default UserSearchResults;
