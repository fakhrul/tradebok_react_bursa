import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import { navigate } from "../helper/navigationRef";
import * as fb from "../config/firebase";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...state, errorMessage: "", currentUser: action.payload };
    case "signup":
      // console.log(action.payload)
      return { ...state, errorMessage: "", currentUser: action.payload };
    case "signout":
      return { ...state, currentUser: null, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "update_user_id":
      return { ...state, userId: action.payload };
    case "update_unread_messages":
      return { ...state, unreadMessages: action.payload };
    default:
      return state;
  }
};

// const authReducer = (state, action) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       switch (action.type) {
//         case "add_error":
//           return { ...state, errorMessage: action.payload };
//         case "signin":
//           resolve( { ...state, errorMessage: "", currentUser: action.payload });
//           break;
//         case "signup":
//           // console.log(action.payload)
//           resolve( { ...state, errorMessage: "", currentUser: action.payload });
//         case "signout":
//           resolve( { ...state, currentUser: null, errorMessage: "" });
//           break;
//         case "clear_error_message":
//           resolve( { ...state, errorMessage: "" });
//           break;
//         case "update_user_id":
//           resolve( { ...state, userId: action.payload });
//           break;
//         default:
//           resolve( state);
//           break;
//       }
//     }, 1000)
//   })

// };

// function reducer(state, action) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       switch (action.type) {
//         case 'up':
//           resolve({ ...state, count: state.count + 1 });
//           break;
//         case 'down':
//           resolve({ ...state, count: state.count - 1 });
//           break;
//         case 'reset':
//           resolve({ ...initialState });
//           break;
//         default:
//           resolve(state);
//           break;
//       }
//     }, 1000);
//   });
// }

const tryLocalSignIn = (dispatch) => async () => {
  await fb.auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User had sign in");

      dispatch({ type: "signin", payload: user });
      navigate("Welcome");
    } else {
      console.log("User had sign out");
      dispatch({ type: "signout" });
      navigate("anonymousFlow");
    }
  });
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
  return async ({ email, password, displayName }) => {
    await fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        userInfo.user.updateProfile({ displayName: displayName.trim() });
        dispatch({ type: "signup", payload: userInfo.user });
        navigate("Welcome");
      })
      .catch((error) => {
        alert(error.message);
        dispatch({ type: "add_error", payload: error.message });
      });
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    await fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((userInfo) => {
        dispatch({ type: "signin", payload: userInfo });
      })
      .catch((error) => {
        dispatch({
          type: "add_error",
          payload: error.message,
        });
      });
  };
};

const signinWithFacebook = (dispatch) => {
  return async () => {
    await Facebook.initializeAsync("596268807638268");

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });
    if (type === "success" && token) {
      // Build Firebase credential with the Facebook access token.
      const credential = fb.fb.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      await fb.auth.signInWithCredential(credential);
    }
  };
};

const signInWithGoogle = (dispatch) => {
  return async () => {
    const data = await signInWithGoogleAsync(dispatch);
    // const { id, photoUrl, name, email } = data.user;
    // createUserIfNotExist(id, photoUrl, name, email);
    return data;
  };
};

const signInWithGoogleAsync = async (dispatch) => {
  try {
    const result = await Google.logInAsync({
      behavior: "web",
      androidClientId:
        "91921130468-u7trrha3dcc0j882if3tgjot0f3thg43.apps.googleusercontent.com",
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      await onSignIn(dispatch, result);
      return result;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

const onSignIn = (dispatch, googleUser) => {
  // console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = fb.auth.onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.

      var credential = fb.fb.auth.GoogleAuthProvider.credential(
        // googleUser.getAuthResponse().id_token
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      fb.auth
        .signInAndRetrieveDataWithCredential(credential)
        .then(function () {
          dispatch({ type: "signin", payload: googleUser });
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

          dispatch({
            type: "add_error",
            payload: error.message,
          });

          // ...
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          fb.fb.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const signout = (dispatch) => {
  return async () => {
    await fb.auth.signOut().then(() => console.log("User signed out!"));
  };
};

const updateUserId = (dispatch) => {
  return async ({ userId }) => {
    // console.log("userId", userId);
    dispatch({
      type: "update_user_id",
      payload: userId,
    });
    // dispatch({ type: "update_user_id", payload: userId });
  };
};

const updateUnreadMessages = (dispatch) => {
  return async ({ unreadMessages }) => {
    dispatch({
      type: "update_unread_messages",
      payload: unreadMessages,
    });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    signout,
    signinWithFacebook,
    signInWithGoogle,
    clearErrorMessage,
    tryLocalSignIn,
    updateUserId,
    updateUnreadMessages,
  },
  { userId: null, currentUser: null, errorMessage: "", unreadMessages: 0 }
);
