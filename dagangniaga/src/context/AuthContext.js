import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import { navigate } from "../helper/navigationRef";
import * as dnApi from "../api/dnApi";
import * as fb from "../config/firebase";
// import * as Facebook from 'expo-facebook';

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
    await dnApi.loginWithFacebook();
  };
};

const signout = (dispatch) => {
  return async () => {
    await fb.auth
    .signOut()
    .then(() => console.log('User signed out!'));
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
    clearErrorMessage,
    tryLocalSignIn,
  },
  { currentUser: null, errorMessage: "" }
);
