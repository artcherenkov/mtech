import { APIRoute } from "../../../utils/const";
import { toggleAuthForm } from "../../action";
import { fetchRecords } from "../melsytech/actions";

const Error = {
  OBJECT_DOESNT_EXIST: "Объект не найден.",
  EMAIL_ALREADY_EXISTS:
    "Пользователь с такой электронной почтой уже зарегистрирован.",
  INVALID_OR_EXPIRED_TOKEN: "Пожалуйста, авторизуйтесь снова.",
  WRONG_USERNAME_OR_PASSWORD: "Неверный логин или пароль.",
};

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
      dispatch(authenticateSuccess({ ...data, username: authData.username }));
      dispatch(fetchRecords());
      dispatch(toggleAuthForm());
    })
    .catch((err) => {
      if (err.response) {
        const { detail } = err.response.data;
        dispatch(authenticateError(Error[detail] || err.message));
        return;
      }
      dispatch(authenticateError("Произошла ошибка соединения."));
    });
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
