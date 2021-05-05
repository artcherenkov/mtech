import { combineReducers } from "redux";
import { appStore } from "./app-store/app-store";
import { appState } from "./app-state/app-state";
import { appUser } from "./app-user/app-user";
import { CCErrors } from "./cc-errors/cc-errors";
import { melsytech } from "./melsytech/melsytech";

export const Namespace = {
  STORE: "STORE",
  STATE: "STATE",
  USER: "USER",
  CCErrors: "CCErrors",
  melsytech: "melsytech",
};

export default combineReducers({
  [Namespace.STORE]: appStore,
  [Namespace.STATE]: appState,
  [Namespace.USER]: appUser,
  [Namespace.CCErrors]: CCErrors,
  [Namespace.melsytech]: melsytech,
});
