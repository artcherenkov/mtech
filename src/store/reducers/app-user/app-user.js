import { ActionType } from "./actions";

const { name, token } = JSON.parse(localStorage.getItem("auth")) || {};

const initialState = {
  name: name || null,
  token: token || null,
  isAuth: !!name || !!token,
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
      const { name, token } = action.payload;
      return { ...state, name, token, isAuth: true, isLoading: false };
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
