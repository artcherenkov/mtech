import { APIRoute } from "../../../utils/const";
import { toggleAuthForm } from "../../action";

export const ActionType = {
  AUTHENTICATE_START: "user/authenticate_start",
  AUTHENTICATE_SUCCESS: "user/authenticate_success",
  AUTHENTICATE_ERROR: "user/authenticate_error",
  CLEAR_ERRORS: "user/clear_errors",
  LOGOUT: `user/logout`,
};

export const authenticate = (authData) => (dispatch, getState, api) => {
  dispatch(authenticateStart());
  return api
    .post(APIRoute.LOGIN, authData)
    .then(({ data }) => {
      dispatch(authenticateSuccess({ ...data, name: authData.name }));
      dispatch(toggleAuthForm());
    })
    .catch((err) => dispatch(authenticateError(err.message)));
};
export const authenticateStart = () => ({
  type: ActionType.AUTHENTICATE_START,
});
export const authenticateSuccess = (payload) => ({
  type: ActionType.AUTHENTICATE_SUCCESS,
  payload,
});
export const authenticateError = (payload) => ({
  type: ActionType.AUTHENTICATE_ERROR,
  payload,
});

export const logout = () => ({
  type: ActionType.LOGOUT,
});

export const clearErrors = () => ({
  type: ActionType.CLEAR_ERRORS,
});
