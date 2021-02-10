import { ActionType } from "../../action";

const { login } = JSON.parse(localStorage.getItem(`auth`)) || {};

const initialState = {
  login: login || ``,
  token: ``,
  isAuth: !!login,
};

const appUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      localStorage.setItem(`auth`, JSON.stringify(action.payload));
      const { login, token = `sometoken` } = action.payload;
      return { ...state, login, token, isAuth: true };
    }
    case ActionType.LOGOUT: {
      localStorage.removeItem(`auth`);
      return { ...state, login: ``, token: ``, isAuth: false };
    }
    default:
      return state;
  }
};

export { appUser };
