export const ActionType = {
  // store
  DELETE_RECORD: `DELETE_RECORD`,
  // state
  TOGGLE_POPUP: `TOGGLE_POPUP`,
  SET_RECORD_TO_DELETE: `SET_RECORD_TO_DELETE`,
  // user
  AUTHENTICATE: `AUTHENTICATE`,
};

export const deleteRecord = (recordId) => ({
  type: ActionType.DELETE_RECORD,
  payload: recordId,
});

export const togglePopup = () => ({
  type: ActionType.TOGGLE_POPUP,
});

export const setRecordToDelete = (recordId) => ({
  type: ActionType.SET_RECORD_TO_DELETE,
  payload: recordId,
});

export const authenticate = (credentials) => ({
  type: ActionType.AUTHENTICATE,
  payload: credentials,
});
