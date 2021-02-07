import { ActionType } from "../../action";

const initialState = {
  isPopupShown: false,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_POPUP: {
      return { ...state, isPopupShown: !state.isPopupShown };
    }
    default:
      return state;
  }
};

export { appState };
