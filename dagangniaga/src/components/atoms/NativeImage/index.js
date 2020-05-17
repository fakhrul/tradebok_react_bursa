import React from "react";
import { View, Image } from "react-native";
// import FastImage from "react-native-fast-image";

const NativeImage = ({ uri, style }) => {
  if (!uri) return <View style={style} />;
  return (
    // <FastImage
    //   style={style}
    //   source={{ uri, priority: FastImage.priority.normal }}
    // />
    <Image
      source={uri ? { uri: uri } : null}
      style={style}
      resizeMode="cover"
    ></Image>
  );
};

export default NativeImage;
