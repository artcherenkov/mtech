import { ActionType } from "../../action";

const initialState = {
  isPopupShown: false,
  isAuthFormShown: false,
  isRecordShown: false,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_POPUP: {
      return { ...state, isPopupShown: !state.isPopupShown };
    }
    case ActionType.TOGGLE_RECORD_POPUP: {
      return { ...state, isRecordShown: !state.isRecordShown };
    }
    case ActionType.TOGGLE_AUTH_FORM: {
      return { ...state, isAuthFormShown: !state.isAuthFormShown };
    }
    default:
      return state;
  }
};

export { appState };
