import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Placeholder, PlaceholderLine, ShineOverlay } from 'rn-placeholder';
import {colors} from "../../../utils";
import { responsiveWidth } from 'react-native-responsive-dimensions';

const PostCardPlaceholder = () => {

  return (
    <View style={styles.container}>
      <Placeholder Animation={ShineOverlay}>
        {new Array(4)
          .fill({})
          .map((_, index) =>
            <PlaceholderLine
              noMargin
              color={colors.placeholder}
              key={index}
              height={responsiveWidth(90)}
              style={styles.card}
            />
          )}
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingHorizontal: 20
  },
  card: {
    marginTop: 20,
    borderRadius: 10
  }
});

export default PostCardPlaceholder;