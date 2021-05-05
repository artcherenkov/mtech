import { ActionType } from "./actions";

const { username, token } = JSON.parse(localStorage.getItem("auth")) || {};

const initialState = {
  name: username || null,
  token: token || null,
  isAuth: !!username || !!token,
  isLoading: false,
  error: null,
};

const appUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE_START: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.AUTHENTICATE_SUCCESS: {
      localStorage.setItem("auth", JSON.stringify(action.payload));
      const { username, token } = action.payload;
      return { ...state, username, token, isAuth: true, isLoading: false };
    }
    case ActionType.AUTHENTICATE_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case ActionType.LOGOUT: {
      localStorage.removeItem("auth");
      return { ...state, name: null, token: null, isAuth: false };
    }
    case ActionType.CLEAR_ERRORS: {
      return { ...state, error: null };
    }
    default:
      return state;
  }
};

export { appUser };
