import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import { colors, parseConnectionsCount } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";

const DrawerHeader = ({ onPress, avatar, name, handle, following, followers }) => {
    return (

        <TouchableOpacity onPress={onPress} style={{ flexDirection: "row" }}>
            <ImageBackground
                source={{ uri: avatar ? avatar : "" }}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderWidth: 3,
                    borderColor: "#FFF",
                }}
                imageStyle={styles.avatarImage}
            ></ImageBackground>
            <View
                style={{
                    marginLeft: 10,
                }}
            >
                <Text
                    style={{
                        // color: "#FFF",
                        fontSize: 16,
                        fontWeight: "800",
                        marginVertical: 2,
                    }}
                >
                    @{handle}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <Text
                        style={{
                            // color: "rgba(255,255,255, 0.8)",
                            fontSize: 13,
                            marginRight: 4,
                        }}
                    >
                        {parseConnectionsCount(followers)} followers, {parseConnectionsCount(following)} following
            </Text>
                </View>
                <Text
                    style={{
                        // color: "rgba(255,255,255, 0.8)",
                        // fontSize: 13,
                        marginTop: 15,

                        fontStyle: "italic"
                    }}
                >
                    View Profile
            </Text>

            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    avatarImage: {
        backgroundColor: colors.placeholder,
        borderRadius: 120,
    },
})
export default DrawerHeader;
