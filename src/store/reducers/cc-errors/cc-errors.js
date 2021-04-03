import { ActionType } from "./actions";
import { adaptRecordToClient } from "../../../core/adapter/record";

const initialState = {
  records: null,
  isLoading: false,
  error: null,

  recordToDeleteId: -1,
  activeRecordId: -1,
  isDeletePopupShown: false,
  isRecordPopupShown: false,
  isEditMode: false,
};

const CCErrors = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_RECORDS_START: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.FETCH_RECORDS_SUCCESS: {
      const records = action.payload.map((record) =>
        adaptRecordToClient(record)
      );
      return { ...state, isLoading: false, error: null, records };
    }
    case ActionType.FETCH_RECORDS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case ActionType.EDIT_RECORD_START: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.EDIT_RECORD_SUCCESS: {
      return { ...state, isLoading: false, error: null };
    }
    case ActionType.EDIT_RECORD_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case ActionType.DELETE_RECORD_START: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.DELETE_RECORD_SUCCESS: {
      return { ...state, isLoading: false, error: null };
    }
    case ActionType.DELETE_RECORD_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case ActionType.LOAD_RECORD: {
      const recordToLoad = adaptRecordToClient(action.payload);
      const records = state.records.slice();
      const foundRecordIndex = records.findIndex(
        (r) => r.id === recordToLoad.id
      );

      if (foundRecordIndex === -1) {
        return { ...state, records: [...records, recordToLoad] };
      }

      records[foundRecordIndex] = recordToLoad;
      return { ...state, records };
    }
    case ActionType.REMOVE_RECORD: {
      const deletedRecordId = action.payload;
      const records = state.records
        .slice()
        .filter((r) => r.id !== deletedRecordId);
      return { ...state, records };
    }
    case ActionType.SET_RECORD_TO_DELETE: {
      const recordToDeleteId = action.payload;

      if (recordToDeleteId === -1) {
        return {
          ...state,
          recordToDeleteId,
          isDeletePopupShown: false,
          isEditMode: false,
        };
      }

      return {
        ...state,
        recordToDeleteId,
        isDeletePopupShown: true,
      };
    }
    case ActionType.SET_ACTIVE_RECORD_ID: {
      const activeRecordId = action.payload;

      if (activeRecordId === -1) {
        return {
          ...state,
          activeRecordId,
          isRecordPopupShown: false,
          isEditMode: false,
        };
      }

      return {
        ...state,
        activeRecordId,
        isRecordPopupShown: true,
      };
    }
    case ActionType.SET_EDIT_MODE: {
      return { ...state, isEditMode: true };
    }

    default:
      return state;
  }
};

export { CCErrors };
