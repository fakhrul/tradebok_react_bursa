import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MUTATION_DELETE_NOTIFICATION } from '../../../graphql/mutation';
import { DeleteCardRightActions, NativeImage } from '../../../components';
import moment from "moment";
import { colors } from "../../../utils";

const NotificationCard = ({ navigation, notificationId, avatar, resourceId, handle, type, time }) => {

    const readableTime = moment(time).fromNow();
    let notificationText = "";
    if (type === "LIKE")
        notificationText = "liked your post";
    else if (type === "COMMENT")
        notificationText = "commented on your post";
    else if (type === "FOLLOW")
        notificationText = "has started following you";


    const [deleteNotification, { loading: deleteNotificationLoading, called: deleteNotificationCalled }] = useMutation(MUTATION_DELETE_NOTIFICATION);

    const swipeableRef = useRef();

    const navigateAction = () => {
        if (resourceId === '') return;

        if (type === "FOLLOW") {
            navigation.navigate("ProfileView", { userId: resourceId });
        } else if (type === "LIKE" || type === "COMMENT") {
            navigation.navigate("PostView", { postId: resourceId });
        }
    };

    const onDelete = () => {
        if (!deleteNotificationLoading && !deleteNotificationCalled) {
            // @ts-ignore
            swipeableRef.current.close();
            deleteNotification({ variables: { notificationId } });
        }
    };

    const renderRightActions = (progress, dragX) => (
        <DeleteCardRightActions
            progress={progress}
            dragX={dragX}
            onDelete={onDelete}
        />
    );

    return (
        // @ts-ignore
        <Swipeable ref={swipeableRef} useNativeAnimations rightThreshold={-80} renderRightActions={renderRightActions}>
            <TouchableOpacity activeOpacity={0.95} onPress={navigateAction} style={styles.container}>
                <NativeImage uri={avatar} style={styles.avatarImage} />
                <View style={styles.info}>
                    <Text style={styles.notificationText}>
                        <Text style={styles.handleText}>{handle}{' '}</Text>
                        {notificationText}
                    </Text>
                    <Text style={styles.timeText}>{readableTime}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 5
    },
    avatarImage: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: colors.placeholder
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    handleText: {
        fontSize: 16,
        color: colors.text01
    },
    notificationText: {
        fontSize: 16,
        color: colors.text01
    },
    timeText: {
        fontSize: 14,
        color: colors.text02,
        paddingTop: 5
    }
});

export default NotificationCard;