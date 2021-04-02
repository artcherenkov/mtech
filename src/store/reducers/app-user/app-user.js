import { ActionType } from "./actions";

const { name, token } = JSON.parse(localStorage.getItem("auth")) || {};

const initialState = {
  name: name || null,
  token: token || null,
  isAuth: !!name,
};

const appUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      localStorage.setItem("auth", JSON.stringify(action.payload));
      const { name, token } = action.payload;
      return { ...state, name, token, isAuth: true };
    }
    case ActionType.LOGOUT: {
      localStorage.removeItem("auth");
      return { ...state, name: null, token: null, isAuth: false };
    }
    default:
      return state;
  }
};

export { appUser };
