import { ActionType } from "../../action";

const initialState = {
  username: ``,
  token: ``,
  isAuth: false,
};

const appUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      const { username, token } = action.payload;
      return { ...state, username, token, isAuth: true };
    }
    case ActionType.LOGOUT: {
      return { ...state, username: ``, token: ``, isAuth: false };
    }
    default:
      return state;
  }
};

export { appUser };
