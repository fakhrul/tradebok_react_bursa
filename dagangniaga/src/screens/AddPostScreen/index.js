import React, { useState, useRef, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import UploadBanner from "./components/UploadBanner";
import FormInput from "./components/FormInput";
import { colors } from "../../utils";
import { MUTATION_CREATE_POST } from "../../graphql/mutation";
import {
  inputLimitErrorNotification,
  noAssetInfoNotification,
  postUploadedNotification,
  uploadErrorNotification,
} from "../../utils";
import { uploadToStorage } from "../../config/firebase";
import { Header, Button } from "./../../components";
import { Feather } from "@expo/vector-icons";
import { Context as AuthContext } from "../../context/AuthContext";

const AddPostScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);

  const [pickedAsset, setPickedAsset] = useState("");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [createPost] = useMutation(MUTATION_CREATE_POST);

  const captionInputRef = useRef();

  const uploadImage = async () => {
    if (!pickedAsset) {
      noAssetInfoNotification();
      return;
    }

    if (caption.length > 200) {
      inputLimitErrorNotification("Caption", "less", 200);
      return;
    }
    try {
      setIsUploading(true);
      const remoteUri = await uploadToStorage(
        "post",
        pickedAsset,
        state.userId
      );
      console.log("userId", state.userId);
      console.log("remoteUri", remoteUri);
      console.log("caption", caption);

      // @ts-ignore
      const {
        data: {
          createPost: { id: postId },
        },
      } = await createPost({
        variables: {
          authorId: state.userId,
          uri: remoteUri,
          caption: caption,
        },
      });
      console.log("3");

      setIsUploading(false);
      setPickedAsset("");
      setCaption("");
      // @ts-ignore
      captionInputRef.current.clear();
      postUploadedNotification();
      navigation.navigate("PostView", { postId });
    } catch ({ message }) {
      uploadErrorNotification("Post");
      // crashlytics.recordCustomError(Errors.ASSET_UPLOAD, message);
    }
  };

  const Icon = () => (
    <Feather name="upload-cloud" color={colors.white} size={20} />
  );

  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;
  const onMorePress = () => {};

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} style={styles.container}>
      <Header
        title="Add Post"
        navigation={navigation}
        onPress={onMorePress}
      ></Header>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <UploadBanner pickedAsset={pickedAsset} onAsset={setPickedAsset} />
        <FormInput
          ref={captionInputRef}
          multiline
          label="Caption"
          placeholder="Write a caption..."
          value={caption}
          onChangeText={setCaption}
          characterRestriction={200}
        />
      </ScrollView>
      <Button
        Icon={Icon}
        label="Upload"
        onPress={uploadImage}
        loading={isUploading}
        containerStyle={styles.uploadButton}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  uploadButton: {
    marginVertical: 20,
    marginBottom: 40,
  },
});
export default AddPostScreen;
