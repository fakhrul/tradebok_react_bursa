import { NavigationActions } from "react-navigation";
import { DrawerRouter } from "react-navigation-drawer";

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  console.log("Navigate to", routeName,);
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: routeName,
      params: params,
    })
  );
};
