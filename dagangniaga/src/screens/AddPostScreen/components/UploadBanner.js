import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import UploadSvg from "../../../resources/upload.svg";
import { IconButton, SvgBanner } from "../../../components";
import { colors, getImageFromLibrary } from "../../../utils";
import { responsiveWidth } from "react-native-responsive-dimensions";

const UploadBanner = ({ pickedAsset, onAsset }) => {
  const discardImage = () => onAsset("");

  const pickImage = async () => {
    const { uri } = await getImageFromLibrary(340, 340);
    onAsset(uri);
  };

  let content = (
    <SvgBanner
      Svg={UploadSvg}
      placeholder="Click to upload a new post"
      textStyle={styles.placeholderText}
    />
  );

  if (pickedAsset) {
    content = (
      <>
        <IconButton
          onPress={discardImage}
          style={styles.discardImageButton}
          Icon={() => (
            <AntDesign name="closecircle" color={colors.white} size={24} />
          )}
        />
        <Image source={{ uri: pickedAsset }} style={styles.pickedImage} />
      </>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={pickImage}
      style={[
        styles.container,
        { borderWidth: pickedAsset ? 0 : StyleSheet.hairlineWidth },
      ]}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveWidth(90),
    width: responsiveWidth(90),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: colors.accent,
    marginVertical: 20,
    borderRadius: 10,
  },
  discardImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingBottom: 10,
    zIndex: 100,
  },
  pickedImage: {
    height: responsiveWidth(90),
    width: responsiveWidth(90),
    borderRadius: 10,
  },
  placeholderText: {
    color: colors.accent,
  },
});

export default UploadBanner;
