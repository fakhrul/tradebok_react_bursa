import { colors } from "../colors";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";


export const transformMessages = messages =>
  messages.map(message => {
    const {
      id,
      body,
      createdAt,
      author: {
        id: authorId,
        name,
        avatar
      }
    } = message;

    return {
      _id: id,
      text: body,
      createdAt: new Date(createdAt),
      user: {
        _id: authorId,
        name,
        avatar
      }
    };
  });
  
export const searchQueryFilter = (array, userId: string, query: string, ) =>
  [...array].filter(({ participants }) => {
    const [participant] = filterChatParticipants(userId, participants);
    if (query === '') return true;
    return participant
      .handle
      .toLowerCase()
      .includes(query.toLocaleLowerCase());
  });

export const sortMessageAscendingTime = array =>
  [...array].sort((a, b) => {
    const [lastMessageA] = a.messages;
    const [lastMessageB] = b.messages;

    // @ts-ignore
    return new Date(lastMessageB.createdAt) - new Date(lastMessageA.createdAt);
  });
  
export const filterChatParticipants = (userId: string, participants) =>
  participants.filter((participant) => userId !== participant.id);

export const isUserOnline = (lastSeen: number) => {
  const now = Date.now() / 1000;
  return now - lastSeen < 12;
};

export const createAsyncDelay = (duration: number) => {
  return new Promise((resolve, _) =>
    setTimeout(() => {
      resolve();
    }, duration)
  );
};

export const sortPostsAscendingTime = (array) =>
  // @ts-ignore
  [...array].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const parseConnectionsCount = (connectionCount) => {
  // parse larger numbers here
  return connectionCount.toString();
};

export const getImageFromLibrary = async (height, width, circular) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      return result;
    }
  } catch (error) {
    console.log(error.message);
  }
};

// export const getImageFromLibrary = async (height, width, circular) => {
//   const options = {
//     height,
//     width,
//     cropperCircleOverlay: circular,
//     cropping: true,
//     cropperActiveWidgetColor: colors.accent,
//     cropperStatusBarColor: colors.accent,
//     cropperToolbarColor: colors.accent,
//     compressImageQuality: 0.8,
//     mediaType: 'photo'
//   };

//   try {
//     const assetData = await ImagePicker.openPicker(options);
//     return assetData;
//   } catch ({ code }) {
//     if (!code.includes('CANCELLED')) {
//       noPermissionNotification();
//     }
//   }
// };

//NOTIFICATION

export const welcomeNotification = () =>
  showMessage({
    message: "Welcome to Proximity",
    icon: "success",
    type: "success",
    duration: 2000,
  });

export const postUploadedNotification = () =>
  showMessage({
    message: "Upload complete, your post is live",
    icon: "success",
    type: "success",
    duration: 2000,
  });

export const uploadErrorNotification = (asset: string) =>
  showMessage({
    message: `${asset} upload failed, please try again later`,
    icon: "danger",
    type: "danger",
    duration: 2000,
  });

export const inputLimitErrorNotification = (type, condition, limit) => {
  showMessage({
    message: `${type} should be ${condition} than ${limit} characters`,
    icon: "danger",
    type: "danger",
    duration: 4000,
  });
};

export const somethingWentWrongErrorNotification = () =>
  showMessage({
    message: "Oops, please try again later",
    icon: "danger",
    type: "danger",
    duration: 4000,
  });

export const showErrorNotification = (message: string) =>
  showMessage({
    message,
    icon: "danger",
    type: "danger",
    duration: 4000,
  });

export const noAssetInfoNotification = () =>
  showMessage({
    message: "Please pick an image before uploading",
    icon: "info",
    type: "info",
    backgroundColor: colors.accent,
    duration: 2000,
  });

export const noPermissionNotification = () =>
  showMessage({
    message: "Please allow photo gallery permissions",
    icon: "danger",
    type: "danger",
    duration: 4000,
  });

export const longPressDeleteNotification = (onLongPress) =>
  showMessage({
    message: "Long press this notification to delete",
    icon: "danger",
    type: "danger",
    duration: 4000,
    backgroundColor: colors.delete,
    onLongPress,
  });

export const tryAgainLaterNotification = () =>
  showMessage({
    message: "Please try again later",
    icon: "danger",
    type: "danger",
    duration: 4000,
  });

export const postReportedNotification = () =>
  showMessage({
    message: "Post has been reported and submitted for review",
    icon: "info",
    type: "info",
    backgroundColor: colors.accent,
    duration: 4000,
  });

export const postUpdatedNotification = () =>
  showMessage({
    message: "Post has been updated",
    icon: "success",
    type: "success",
    duration: 2000,
  });

export const postDeletedNotification = () =>
  showMessage({
    message: "Post has been deleted",
    icon: "info",
    type: "info",
    backgroundColor: colors.accent,
    duration: 2000,
  });

export const userBlockedNotification = (handle: string = "User") =>
  showMessage({
    message: `${handle} has been blocked, please refresh your feed`,
    icon: "info",
    type: "info",
    backgroundColor: colors.accent,
    duration: 4000,
  });

export const longPressUnblockNotification = (onLongPress, handle) =>
  showMessage({
    message: `Long press this notification to unblock ${handle}`,
    icon: "danger",
    type: "danger",
    duration: 4000,
    backgroundColor: colors.delete,
    onLongPress,
  });
