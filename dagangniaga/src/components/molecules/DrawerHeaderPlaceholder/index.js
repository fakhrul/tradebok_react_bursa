import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    ShineOverlay,
} from "rn-placeholder";
import { colors } from "../../../utils";

const DrawerHeaderPlaceholder = () => {
    return (
        <View style={styles.container}>
            <Placeholder Animation={ShineOverlay}>
                <View style={styles.avatarPlaceholder}>
                    <PlaceholderMedia color={colors.placeholder} size={80} isRound />
                    <PlaceholderLine
                        noMargin
                        color={colors.placeholder}
                        style={styles.connectionsPlaceholder}
                        width={24}
                        height={40}
                    />
                    <PlaceholderLine
                        noMargin
                        color={colors.placeholder}
                        style={styles.connectionsPlaceholder}
                        width={24}
                        height={40}
                    />
                </View>
            </Placeholder>
        </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     padding: 20,
    //     paddingTop: 10,
    //     paddingBottom: 0,
    // },
    avatarPlaceholder: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    // connectionsPlaceholder: {
    //     borderRadius: 10,
    // },
    // infoPlaceholder: {
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: 20,
    //     marginBottom: 10,
    // },
    // namePlaceholder: {
    //     borderRadius: 10,
    // },
    // handlePlaceholder: {
    //     marginTop: 10,
    //     borderRadius: 10,
    // },
    // interact: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //     width: "100%",
    //     marginTop: 20,
    // },
    // interaction: {
    //     borderRadius: 50,
    // },
    // aboutPlaceholder: {
    //     marginTop: 16,
    //     marginBottom: 4,
    //     borderRadius: 10,
    // },
    // postContainer: {
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //     marginBottom: 10,
    // },
    // postPlaceholder: {
    //     borderRadius: 5,
    // },
});

export default DrawerHeaderPlaceholder;
