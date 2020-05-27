import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import {BottomSheetHeader, SvgBanner, UserCard} from '../../../components';
import EmptyConnectionsBanner from '../../../resources/empty-connections.svg';
import {colors} from "../../../utils";

const ConnectionsBottomSheet = React.forwardRef(({ viewMode, handle, data, type }, ref) => {

  let heading;
  let subHeading;

  if (type === "FOLLOWING") {
    heading = 'Following';
    if (viewMode) {
      subHeading = `People ${handle} is following`;
    } else {
      subHeading = 'People you are following';
    }
  } else if (type === "FOLLOWERS") {
    heading = 'Followers';
    if (viewMode) {
      subHeading = `People who are following ${handle}`;
    } else {
      subHeading = 'People who are following you';
    }
  }

  const ListEmptyComponent = () => (
    <SvgBanner
      Svg={EmptyConnectionsBanner}
      placeholder='No users found'
      spacing={16}
    />
  );

  const renderItem = ({ item }) => {
    const { id, avatar, handle, name } = item;
    console.log("user", item);
    return (
      <UserCard
        userId={id}
        avatar={avatar}
        handle={handle}
        name={name}
      />
    );
  };

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles.container}>
      <BottomSheetHeader
        header={heading}
        subHeader={subHeading}
      />
      <View style={styles.content}>
        <FlatGrid
          bounces={false}
          itemDimension={responsiveWidth(85)}
          showsVerticalScrollIndicator={false}
          items={data}
          itemContainerStyle={styles.listItemContainer}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={ListEmptyComponent}
          style={styles.listContainer}
          spacing={20}
          renderItem={renderItem}
        />
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: colors.base
  },
  content: {
    flex: 1,
    paddingBottom: responsiveHeight(5)
  },
  listContainer: {
    flex: 1
  },
  listItemContainer: {
    width: '106%'
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default ConnectionsBottomSheet;