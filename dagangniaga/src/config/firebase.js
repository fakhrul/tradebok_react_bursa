import * as firebase from "firebase";
import "firebase/firestore";


export const StoragePaths = {
  avatars: 'avatars',
  posts: 'posts'
};

export const Asset = {
  avatar: 'avatar',
  post: 'post'
};

export const Errors = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  UPDATE_LAST_SEEN: 'UPDATE_LAST_SEEN',
  LOAD_THEME: 'LOAD_THEME',
  INITIALIZE_FCM: 'INITIALIZE_FCM',
  INITIALIZE_CHAT: 'INITIALIZE_CHAT',
  UPDATE_FCM_TOKEN: 'UPDATE_FCM_TOKEN',
  ASSET_UPLOAD: 'ASSET_UPLOAD',
  EDIT_POST: 'EDIT_POST'
};

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBDDvuXGAxYl7oH9U9WFZTOxBrKbYjlG6U",
  authDomain: "tradebok-cc46e.firebaseapp.com",
  databaseURL: "https://tradebok-cc46e.firebaseio.com",
  projectId: "tradebok-cc46e",
  storageBucket: "tradebok-cc46e.appspot.com",
  messagingSenderId: "91921130468",
  appId: "1:91921130468:web:93de39184aff46187fddf1",
  measurementId: "G-BZYXKE7KWE",
};

firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });


export const initializeFCM = async () => {
  try {
    if (Platform.OS === 'android') {
      const channel = new firebase
        .notifications
        .Android
        .Channel('proximity-channel', 'Notification Channel', firebase.notifications.Android.Importance.Max)
        .setDescription('Proximity Notification Channel')
        .setSound('default');

      notifications.android.createChannel(channel);
    }
    const hasPermission = await messaging.hasPermission();
    if (!hasPermission) {
      await messaging.requestPermission();
      return null;
    } else if (hasPermission) {
      return await messaging.getToken();
    }
  } catch ({ message }) {
    // crashlytics.recordCustomError(Errors.INITIALIZE_FCM, message);
  }
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};


export const uploadToStorage = (asset, uri, userId) => {
  console.log(uri);
  const [type] = getMediaType(uri);
  let storageRef;
  console.log(asset);
  console.log(userId);

  if (asset === "avatar") {
    storageRef = `${StoragePaths.avatars}/${userId}.${type}`;
  } else if (asset === "post") {
    storageRef = `${StoragePaths.posts}/${userId}/${generateUUID()}.${type}`;
  }
  console.log(storageRef);
 
  return new Promise(async (res, rej) => {
    const response = await fetch(uri);
    const file = await response.blob();

    let upload = firebase.storage().ref(storageRef).put(file);

    upload.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        rej(err);
      },
      async () => {
        const downloadURL = await upload.snapshot.ref.getDownloadURL();
        console.log(downloadURL);
        res(downloadURL);
      }
    );
  }); 
  
  // return firebase.storage()
  //   .ref(storageRef)
  //   .putFile(uri);
};


// export async function uploadPhotoAsync(uri) {
//   const uid = (fb.auth.currentUser || {}).uid;
//   const path = `photos/${uid}/${Date.now()}.jpg`;
//   return new Promise(async (res, rej) => {
//     const response = await fetch(uri);
//     const file = await response.blob();

//     let upload = fb.storage.ref(path).put(file);

//     upload.on(
//       "state_changed",
//       (snapshot) => {},
//       (err) => {
//         rej(err);
//       },
//       async () => {
//         const url = await upload.snapshot.ref.getDownloadURL();
//         console.log(url);
//         res(url);
//       }
//     );
//   });
// }



export const getMediaType = (uri) => uri.split('.').slice(-1);
export const deleteFromStorage = (uri) => firebase.storage().refFromURL(uri).delete();


export const fb = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
export const firestore = firebase.firestore()
