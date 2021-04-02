import { ActionType } from "./actions";

const initialState = {
  records: null,
  isLoading: false,
  error: null,
};

const CCErrors = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_RECORDS: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.LOAD_RECORDS_SUCCESS: {
      const records = action.payload;
      return { ...state, isLoading: false, error: null, records };
    }
    case ActionType.LOAD_RECORDS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export { CCErrors };
