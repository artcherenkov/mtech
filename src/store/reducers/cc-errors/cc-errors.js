import { ActionType } from "./actions";

const initialState = {
  records: null,
};

const CCErrors = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_RECORDS: {
      const records = action.payload;
      return { ...state, records };
    }
    default:
      return state;
  }
};

export { CCErrors };
