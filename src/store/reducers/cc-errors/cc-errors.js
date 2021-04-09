import { ActionType } from "./actions";
import { adaptRecordToClient } from "../../../core/adapter/record";
import { generateErrors } from "../../../mocks/сс-error";

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
      const records = [...action.payload].map((record) =>
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
      return {
        ...state,
        records,
        isEditMode: false,
        activeRecordId: -1,
        isRecordPopupShown: false,
      };
    }
    case ActionType.SET_RECORD_TO_DELETE: {
      const recordToDeleteId = action.payload;

      if (recordToDeleteId === -1) {
        return {
          ...state,
          recordToDeleteId,
          isDeletePopupShown: false,
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
        };
      }

      return {
        ...state,
        activeRecordId,
      };
    }
    case ActionType.SET_EDIT_MODE: {
      return { ...state, isEditMode: true };
    }
    case ActionType.DISABLE_EDIT_MODE: {
      return { ...state, isEditMode: false };
    }

    default:
      return state;
  }
};

export { CCErrors };
