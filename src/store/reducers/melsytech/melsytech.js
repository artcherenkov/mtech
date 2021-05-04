import { ActionType } from "./actions";
import { adaptRecordToClient } from "../../../core/adapter/record";

const initialState = {
  records: null,
  isLoading: false,
  error: null,

  activeRecordId: -1,
};

const melsytech = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_RECORDS_START: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.FETCH_RECORDS_SUCCESS: {
      const records = [...action.payload].map((record) =>
        adaptRecordToClient(record)
      );
      return { ...state, isLoading: false, error: null, records };
    }
    case ActionType.FETCH_RECORDS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case ActionType.SET_ACTIVE_RECORD_ID: {
      return { ...state, activeRecordId: action.payload };
    }

    default:
      return state;
  }
};
export { melsytech };
