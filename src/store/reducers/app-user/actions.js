import { APIRoute } from "../../../utils/const";
import { fetchRecords } from "../cc-errors/actions";

export const ActionType = {
  AUTHENTICATE: `user/authenticate`,
  LOGOUT: `user/logout`,
};

export const authenticate = (authData) => (dispatch, _getState, api) =>
  api.post(APIRoute.LOGIN, authData).then(({ data }) => {
    dispatch(loadAuthData({ ...data, name: authData.name }));
    dispatch(fetchRecords());
  });

export const loadAuthData = (credentials) => ({
  type: ActionType.AUTHENTICATE,
  payload: credentials,
});

export const logout = () => ({
  type: ActionType.LOGOUT,
});
