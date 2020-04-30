import * as fb from "../config/firebase";

// export function uploadPhotoAsync(}) {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((value) => console.log(value));
// }
// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");


export async function addNote({ text, localUrl }) {
  const remoteUri = await uploadPhotoAsync(localUrl);
  const uid = (fb.auth.currentUser || {}).uid;
  const timestamp = Date.now();

  return new Promise((res, rej) => {
    fb.firestore
      .collection("notes")
      .add({
        text,
        uid: uid,
        timestamp: timestamp,
        image: remoteUri,
      })
      .then((ref) => {
        res(ref);
        alert("done");
      })
      .catch((error) => {
        rej(error);
      });
  });
}

export async function uploadPhotoAsync(uri) {
  const uid = (fb.auth.currentUser || {}).uid;
  const path = `photos/${uid}/${Date.now()}.jpg`;
  return new Promise(async (res, rej) => {
    const response = await fetch(uri);
    const file = await response.blob();

    let upload = fb.storage.ref(path).put(file);

    upload.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        rej(err);
      },
      async () => {
        const url = await upload.snapshot.ref.getDownloadURL();
        console.log(url);
        res(url);
      }
    );
  });
  //   await Facebook.initializeAsync("596268807638268");

  //   const { type, token } = await Facebook.logInWithReadPermissionsAsync({
  //     permissions: ["public_profile", "email"],
  //   });
  //   if (type === "success" && token) {
  //     // Build Firebase credential with the Facebook access token.
  //     const credential = fb.fb.auth.FacebookAuthProvider.credential(token);

  //     // Sign in with credential from the Facebook user.
  //     await fb.auth.signInWithCredential(credential);
  //   }
}

// get uid() {
//     return (fb.auth.currentUser || {}).uid;
// }
