export const ActionType = {
  // store
  DELETE_RECORD: `DELETE_RECORD`,
  OPEN_RECORD: `OPEN_RECORD`,
  CLOSE_RECORD: `CLOSE_RECORD`,
  EDIT_RECORD: `EDIT_RECORD`,
  // state
  TOGGLE_POPUP: `TOGGLE_POPUP`,
  TOGGLE_RECORD_POPUP: `TOGGLE_RECORD_POPUP`,
  TOGGLE_AUTH_FORM: `TOGGLE_AUTH_FORM`,
  TOGGLE_RECORD_EDIT_MODE: `TOGGLE_RECORD_EDIT_MODE`,
  SET_RECORD_TO_DELETE: `SET_RECORD_TO_DELETE`,
  SET_SEARCH_VALUE: `SET_SEARCH_VALUE`,
};

export const deleteRecord = (recordId) => ({
  type: ActionType.DELETE_RECORD,
  payload: recordId,
});

export const togglePopup = () => ({
  type: ActionType.TOGGLE_POPUP,
});

export const toggleRecordPopup = () => ({
  type: ActionType.TOGGLE_RECORD_POPUP,
});

export const toggleAuthForm = () => ({
  type: ActionType.TOGGLE_AUTH_FORM,
});

export const setRecordToDelete = (recordId) => ({
  type: ActionType.SET_RECORD_TO_DELETE,
  payload: recordId,
});

export const toggleRecordEditMode = () => ({
  type: ActionType.TOGGLE_RECORD_EDIT_MODE,
});

export const openRecord = (recordId) => ({
  type: ActionType.OPEN_RECORD,
  payload: recordId,
});

export const closeRecord = () => ({
  type: ActionType.CLOSE_RECORD,
});

export const setSearchValue = (searchValue) => ({
  type: ActionType.SET_SEARCH_VALUE,
  payload: searchValue,
});

export const editRecord = (updatedRecord) => ({
  type: ActionType.EDIT_RECORD,
  payload: updatedRecord,
});
