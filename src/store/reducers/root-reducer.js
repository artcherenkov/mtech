import { combineReducers } from "redux";
import { appStore } from "./app-store/app-store";
import { appState } from "./app-state/app-state";
import { appUser } from "./app-user/app-user";
import { CCErrors } from "./cc-errors/cc-errors";

export const Namespace = {
  STORE: "STORE",
  STATE: "STATE",
  USER: "USER",
  CCErrors: "CCErrors",
};

export default combineReducers({
  [Namespace.STORE]: appStore,
  [Namespace.STATE]: appState,
  [Namespace.USER]: appUser,
  [Namespace.CCErrors]: CCErrors,
});
