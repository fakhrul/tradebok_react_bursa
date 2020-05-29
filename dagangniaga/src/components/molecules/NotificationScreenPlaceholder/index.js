import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from 'rn-placeholder';
import {colors} from "../../../utils";

const NotificationScreenPlaceholder = () => {

  return (
    <View style={styles.container}>
      <Placeholder Animation={ShineOverlay}>
        {new Array(20)
          .fill({})
          .map((_, index) =>
            <View key={index} style={styles.cardContainer}>
              <PlaceholderMedia color={colors.placeholder} size={50} isRound />
              <View style={styles.infoContainer}>
                <PlaceholderLine
                  noMargin
                  color={colors.placeholder}
                  style={styles.notificationCardPlaceholder}
                  width={90}
                />
                <PlaceholderLine
                  noMargin
                  color={colors.placeholder}
                  style={styles.notificationCardPlaceholder}
                  width={30}
                />
              </View>
            </View>
          )}
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10
  },
  notificationCardPlaceholder: {
    borderRadius: 10,
    marginTop: 10
  }
});

export default NotificationScreenPlaceholder;