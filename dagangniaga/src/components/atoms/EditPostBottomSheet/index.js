import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import {Feather} from '@expo/vector-icons';
import { Context as AuthContext } from '../../../context/AuthContext';
import { MUTATION_EDIT_POST } from '../../../graphql/mutation';
import { BottomSheetHeader, Button, FormInput } from '../../../components';
import {colors, postUpdatedNotification } from '../../../utils';

const EditPostBottomSheet= (({ postId, caption }, ref) => {

  const { state } = useContext(AuthContext);
  const [editableCaption, setEditableCaption] = useState(caption);
  const [isUpdating, setIsUpdating] = useState(false);
  const editableCaptionRef = useRef();

  const [editPost] = useMutation(MUTATION_EDIT_POST);

  const updatePost = async () => {
    setIsUpdating(true);
    try {
      await editPost({ variables: { postId, caption: editableCaption } });
    } catch ({ message }) {
    //   crashlytics.recordCustomError(Errors.EDIT_POST, message);
    }
    setIsUpdating(false);
    postUpdatedNotification();
    ref.current.close();
  };

  const Icon = () => <Feather
    name='check'
    color={colors.white}
    size={20}
  />;

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles.container}
      adjustToContentHeight>
      <BottomSheetHeader
        heading='Edit Post'
        subHeading='Edit your post'
      />
      <View style={styles.content}>
        <FormInput
          ref={editableCaptionRef}
          multiline
          label='Caption'
          placeholder='Update your caption...'
          value={editableCaption}
          onChangeText={setEditableCaption}
          characterRestriction={200}
        />
        <Button
          Icon={Icon}
          label='Update'
          onPress={updatePost}
          loading={isUpdating}
          containerStyle={styles.updateButton}
        />
      </View>
    </Modalize >
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.base
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  updateButton: {
    marginVertical: 20
  }
});

export default EditPostBottomSheet;