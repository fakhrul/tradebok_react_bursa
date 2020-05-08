import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import { navigate } from "../helper/navigationRef";
import * as dnApi from "../api/dnApi";
import * as fb from "../config/firebase";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
    case "signup":
      return { errorMessage: "", currentUser: action.payload };
    case "signout":
      return { currentUser: null, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  await fb.auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({ type: "signin", payload: user });
      navigate("userFlow");
    } else {
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
        navigate("userFlow");
      })
      .catch((error) => {
        alert(error.message);
        dispatch({ type: "add_error", payload: error.message });
      });

    // try {
    //   await dnApi.signup({
    //     email: email,
    //     password: password,
    //     displayName: displayName,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    // try {
    //   const response = await trackerApi.post("/signup", { email, password });
    //   console.log(response.data);
    //   await AsyncStorage.setItem("token", response.data.token);
    //   // await AsyncStorage.getItem('token');
    //   dispatch({ type: "signup", payload: response.data.token });

    //   navigate("Main");
    // } catch (err) {
    //   console.log(err.response.data);
    //   dispatch({ type: "add_error", payload: "Something went wrong" });
    // }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    await fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((userInfo) => {
        console.log(userInfo);
        dispatch({ type: "signin", payload: userInfo });
      })
      .catch((error) => {
        dispatch({
          type: "add_error",
          payload: error.message,
        });
      });

    // try {
    //   const response = await trackerApi.post("/signin", { email, password });
    //   console.log(response.data);
    //   await AsyncStorage.setItem("token", response.data.token);
    //   // await AsyncStorage.getItem('token');
    //   dispatch({ type: "signin", payload: response.data.token });

    //   navigate("Main");
    // } catch (err) {
    //   console.log(err.response.data);
    //   dispatch({
    //     type: "add_error",
    //     payload: "Something went wrong with sign in",
    //   });
    // }
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
    signInWithGoogleAsync(dispatch);
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
      onSignIn(dispatch, result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

const onSignIn = (dispatch, googleUser) => {
  console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = fb.auth.onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      console.log("1");
      var credential = fb.fb.auth.GoogleAuthProvider.credential(
        // googleUser.getAuthResponse().id_token
        googleUser.idToken,
        googleUser.accessToken
      );
      console.log("2");

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
    dispatch({ type: "signout" });
    navigate("anonymousFlow");
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
  },
  { currentUser: null, errorMessage: "" }
);
