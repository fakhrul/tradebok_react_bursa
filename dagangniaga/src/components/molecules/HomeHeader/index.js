// import dateFormat from "dateformat";
import React, { useContext } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../utils";
import moment from "moment";

const HomeHeader = ({ IconRight }) => {
  const weekdayNow = moment(new Date()).format("LLLL");
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.topTitle}>PROXIMITY</Text>
        <Text style={styles.title}>{weekdayNow}</Text>
      </View>
      {IconRight && <IconRight />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  topTitle: {
    fontSize: 14,
    color: colors.text02,
    letterSpacing: 4,
  },
  title: {
    fontSize: 32,
    marginTop: Platform.select({ ios: 2, android: 0 }),
    color: colors.text01,
  },
});

export default HomeHeader;
