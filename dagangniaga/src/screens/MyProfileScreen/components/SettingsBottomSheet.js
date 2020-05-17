import React, {useContext} from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Modalize } from "react-native-modalize";
import { BottomSheetHeader, Option } from "../../../components";
import {Context as AuthContext} from "../../../context/AuthContext";

const SettingsBottomSheet = ({ onAddPostPress, onBlockListPress }) => {
    const {signout} = useContext(AuthContext);

  const logOut = () => {
      signout();
  };

  return (
    <SafeAreaView
      style={{
        // borderWidth: 1,
        flex: 1,
      }}
    >
      <BottomSheetHeader header="Options" subHeader="Profile options" />
      <View style={styles.content}>
        <Option
          label="Add new post"
          iconName="md-add-circle-outline"
          onPress={onAddPostPress}
        />
        <Option
          label="Blocked users"
          iconName="ios-list"
          onPress={onBlockListPress}
        />
        {/* <Option
          label="About"
          iconName="ios-information-circle-outline"
          onPress={onAboutPress}
        /> */}
        <Option label="Logout" iconName="ios-log-out" onPress={logOut} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingsBottomSheet;
