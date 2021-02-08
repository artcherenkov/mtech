import { generateRecords } from "../../../mocks/record";
import { ActionType } from "../../action";

const initialState = {
  records: generateRecords(50),
  filteredRecords: [],
  recordToDelete: -1,
  activeRecordId: -1,
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_RECORD_TO_DELETE: {
      return { ...state, recordToDelete: action.payload };
    }
    case ActionType.OPEN_RECORD: {
      return { ...state, activeRecordId: action.payload };
    }
    case ActionType.CLOSE_RECORD: {
      return { ...state, activeRecordId: -1 };
    }
    case ActionType.DELETE_RECORD: {
      if (state.recordToDelete !== -1) {
        const updatedRecords = state.records
          .slice()
          .filter((item) => item.id !== state.recordToDelete);
        return { ...state, records: updatedRecords, recordToDelete: -1 };
      }
      console.error(`Ошибка при удалении записи. Возможно, в хранилище отсутствует ID для удаления`);
      return state;
    }
    default:
      return state;
  }
};

export { appStore };
