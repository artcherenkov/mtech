import { APIRoute } from "../../../utils/const";

export const ActionType = {
  FETCH_RECORDS_START: "cc-errors/fetch_records_start",
  FETCH_RECORDS_SUCCESS: "cc-errors/fetch_records_success",
  FETCH_RECORDS_ERROR: "cc-errors/fetch_records_error",

  EDIT_RECORD_START: "cc-errors/edit_record_start",
  EDIT_RECORD_SUCCESS: "cc-errors/edit_record_success",
  EDIT_RECORD_ERROR: "cc-errors/edit_record_error",

  DELETE_RECORD_START: "cc-errors/delete_record_start",
  DELETE_RECORD_SUCCESS: "cc-errors/delete_record_success",
  DELETE_RECORD_ERROR: "cc-errors/delete_record_error",

  LOAD_RECORD: "cc-errors/load_record",
  REMOVE_RECORD: "cc-errors/remove_record",
  SET_RECORD_TO_DELETE: "cc-errors/set_record_to_delete",
  SET_ACTIVE_RECORD_ID: "cc-errors/set_active_record_id",
  SET_EDIT_MODE: "cc-errors/set_edit_mode",
};

export const fetchRecords = () => (dispatch, getState, api) => {
  dispatch(fetchRecordsStart());
  return api
    .get(APIRoute.RECORDS, {
      headers: { Authorization: `Bearer ${getState().USER.token}` },
    })
    .then(({ data }) => dispatch(fetchRecordsSuccess(data)))
    .catch((err) => dispatch(fetchRecordsError(err.message)));
};
export const fetchRecordsStart = () => ({
  type: ActionType.FETCH_RECORDS_START,
});
export const fetchRecordsSuccess = (payload) => ({
  type: ActionType.FETCH_RECORDS_SUCCESS,
  payload,
});
export const fetchRecordsError = (payload) => ({
  type: ActionType.FETCH_RECORDS_ERROR,
  payload,
});

export const editRecord = (updatedRecord) => (dispatch, getState, api) => {
  dispatch(editRecordStart());
  return api
    .put(`${APIRoute.RECORDS}/${updatedRecord.id}`, {
      headers: { Authorization: `Bearer ${getState().USER.token}` },
    })
    .then(({ data }) => {
      dispatch(editRecordSuccess());
      dispatch(loadRecord(data));
    })
    .catch((err) => dispatch(editRecordError(err.message)));
};
export const editRecordStart = () => ({
  type: ActionType.EDIT_RECORD_START,
});
export const editRecordSuccess = () => ({
  type: ActionType.EDIT_RECORD_SUCCESS,
});
export const editRecordError = (payload) => ({
  type: ActionType.EDIT_RECORD_ERROR,
  payload,
});

export const deleteRecord = (deletedRecordId) => (dispatch, getState, api) => {
  dispatch(deleteRecordStart());
  return api
    .delete(`${APIRoute.RECORDS}/${deletedRecordId}`, {
      headers: { Authorization: `Bearer ${getState().USER.token}` },
    })
    .then(({ data }) => {
      dispatch(deleteRecordSuccess());
      dispatch(setRecordToDelete(-1));
      dispatch(removeRecord(data));
    })
    .catch((err) => dispatch(deleteRecordError(err.message)));
};
export const deleteRecordStart = () => ({
  type: ActionType.DELETE_RECORD_START,
});
export const deleteRecordSuccess = () => ({
  type: ActionType.DELETE_RECORD_SUCCESS,
});
export const deleteRecordError = (payload) => ({
  type: ActionType.DELETE_RECORD_ERROR,
  payload,
});

export const loadRecord = (payload) => ({
  type: ActionType.LOAD_RECORD,
  payload,
});
export const removeRecord = (payload) => ({
  type: ActionType.REMOVE_RECORD,
  payload,
});
export const setRecordToDelete = (payload) => ({
  type: ActionType.SET_RECORD_TO_DELETE,
  payload,
});
export const setActiveRecordId = (payload) => ({
  type: ActionType.SET_ACTIVE_RECORD_ID,
  payload,
});
export const setEditMode = () => ({
  type: ActionType.SET_EDIT_MODE,
});
