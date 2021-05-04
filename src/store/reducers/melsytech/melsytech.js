import { ActionType } from "./actions";
import { adaptRecordToClient } from "../../../core/adapter/record";

const initialState = {
  records: null,
  isLoading: false,
  error: null,

  activeRecordId: -1,
  recordToDeleteId: -1,
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
    case ActionType.SET_RECORD_TO_DELETE_ID: {
      return { ...state, recordToDeleteId: action.payload };
    }
    case ActionType.LOAD_RECORD: {
      const records = state.records.slice();
      const recordToUpdateIndex = records.findIndex(
        (r) => r.id === action.payload.id
      );

      if (recordToUpdateIndex === -1) {
        return { ...state, records: [...records, action.payload] };
      }

      records[recordToUpdateIndex] = action.payload;
      return { ...state, records };
    }
    case ActionType.REMOVE_RECORD: {
      const records = state.records.slice();
      return {
        ...state,
        records: records.filter((r) => r.id !== action.payload),
        recordToDeleteId: -1,
      };
    }
    default:
      return state;
  }
};

export { melsytech };
