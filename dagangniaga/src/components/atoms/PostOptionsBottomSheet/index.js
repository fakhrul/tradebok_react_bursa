import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { BottomSheetHeader, Option } from '../../../components';
import { colors, postReportedNotification } from '../../../utils';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_REPORT_POST } from '../../../graphql/mutation';
import {Context as AuthContext} from "../../../context/AuthContext";

const PostOptionsBottomSheet = React.forwardRef(({ authorId, postId, onPostEdit, onPostDelete }, ref) => {

  const { state } = useContext(AuthContext);
  const [reportPost] = useMutation(MUTATION_REPORT_POST, { variables: { postId } });
  const isOwnPost = state.userId === authorId;

  const onPostReport = () => {
    reportPost();
    postReportedNotification();
    // @ts-ignore
    ref.current.close();
  };

  let subHeading = 'What do you want to post?';
  let content = (
    <Option
      label='Report'
      iconName='ios-flag'
      color={colors.delete}
      onPress={onPostReport}
    />
  );

  if (isOwnPost) {
    subHeading = 'Manage your post'
    content = (
      <>
        <Option
          label='Edit'
          iconName='md-create'
          onPress={onPostEdit}
        />
        <Option
          label='Delete'
          iconName='md-trash'
          color={colors.delete}
          onPress={onPostDelete}
        />
      </>
    );
  }

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles.container}
      adjustToContentHeight>
      <BottomSheetHeader
        header='Options'
        subHeader={subHeading}
      />
      <View style={styles.content}>
        {content}
      </View>
    </Modalize >
  );
});

const styles =  StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.base
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 16
  }
});

export default PostOptionsBottomSheet;