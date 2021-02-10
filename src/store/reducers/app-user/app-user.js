import { ActionType } from "../../action";

const initialState = {
  login: ``,
  token: ``,
  isAuth: false,
};

const appUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      const { login, token = `sometoken` } = action.payload;
      return { ...state, login, token, isAuth: true };
    }
    case ActionType.LOGOUT: {
      return { ...state, login: ``, token: ``, isAuth: false };
    }
    default:
      return state;
  }
};

export { appUser };
