import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as portfolioApi from "../api/portfolioApi";
import * as ImagePicker from "expo-image-picker";

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");


const PortfolioNoteScreen = ({ navigation }) => {
  const [state, setState] = useState({
    text: "",
    image: null,
  });

  const handleNote = () => {
    portfolioApi
      .addNote({
        text: state.text.trim(),
        localUrl: state.image,
      })
      .then((ref) => {
        setState({ text: "", image: null });
        navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };
  // getPhotoPermission = async() => {
  //     if(Constants.platform.ios)
  // };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setState({ ...state, image: result.uri });
    }
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNote}>
          <Text style={{ fontWeight: "500" }}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={10}
          style={styles.input}
          placeholder="Write a note for your future reference..."
          onChangeText={(text) => setState({ ...state, text })}
          value={state.text}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
      </TouchableOpacity>

      <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
        <Image
          source={{ uri: state.image }}
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    flexDirection: "row",
    margin: 32,
  },
  input: {
    flex: 1,
    borderColor: "#D8D9DB",
    borderWidth: 1,
    borderRadius: 10,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});

export default PortfolioNoteScreen;
