import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import { navigate } from "../helper/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("Main");
  } else {
    navigate("anonymousFlow");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      // await AsyncStorage.getItem('token');
      dispatch({ type: "signup", payload: response.data.token });

      navigate("Main");
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: "add_error", payload: "Something went wrong" });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      // await AsyncStorage.getItem('token');
      dispatch({ type: "signin", payload: response.data.token });

      navigate("Main");
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("anonymousFlow");
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: ""}
);
