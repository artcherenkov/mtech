import { ActionType } from "../../action";

const { login } = JSON.parse(localStorage.getItem(`auth`)) || {};

const initialState = {
  isPopupShown: false,
  isAuthFormShown: !login,
  isRecordShown: false,
  isRecordEditing: false,
  searchValue: ``,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_POPUP: {
      return { ...state, isPopupShown: !state.isPopupShown };
    }
    case ActionType.TOGGLE_RECORD_POPUP: {
      let isRecordEditing = state.isRecordEditing;
      const isRecordShown = !state.isRecordShown;
      if (!isRecordShown) {
        isRecordEditing = false;
      }
      return { ...state, isRecordShown, isRecordEditing };
    }
    case ActionType.TOGGLE_RECORD_EDIT_MODE: {
      return { ...state, isRecordEditing: !state.isRecordEditing };
    }
    case ActionType.TOGGLE_AUTH_FORM: {
      return { ...state, isAuthFormShown: !state.isAuthFormShown };
    }
    case ActionType.SET_SEARCH_VALUE: {
      return { ...state, searchValue: action.payload };
    }
    default:
      return state;
  }
};

export { appState };
