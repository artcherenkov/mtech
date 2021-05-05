import { APIRoute } from "../../../utils/const";
import {
  adaptRecordToClient,
  adaptRecordToServer,
} from "../../../core/adapter/record";

export const ActionType = {
  FETCH_RECORDS_START: "melsy/fetch_records_start",
  FETCH_RECORDS_SUCCESS: "melsy/fetch_records_success",
  FETCH_RECORDS_ERROR: "melsy/fetch_records_error",

  EDIT_RECORD_START: "melsy/edit_record_start",
  EDIT_RECORD_SUCCESS: "melsy/edit_record_success",
  EDIT_RECORD_ERROR: "melsy/edit_record_error",

  SET_ACTIVE_RECORD_ID: "melsy/set_active_record_id",
  SET_RECORD_TO_DELETE_ID: "melsy/set_record_to_delete_id",
  LOAD_RECORD: "melsy/load_record",
  REMOVE_RECORD: "melsy/remove_record",

  ADD_FILTER: "melsy/add_filter",
  REMOVE_FILTER: "melsy/remove_filter",
};

export const fetchRecords = () => (dispatch, getState, api) => {
  dispatch(fetchRecordsStart());
  return api
    .get(`${APIRoute.MELSY_RECORDS}/`, {
      headers: { Authorization: `${getState().USER.token}` },
    })
    .then(({ data }) => dispatch(fetchRecordsSuccess(data)))
    .catch((err) => {
      dispatch(fetchRecordsError(err.message));
    });
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

export const editRecord = (id, updatedRecord) => (dispatch, getState, api) => {
  dispatch(editRecordStart());
  return api
    .put(`${APIRoute.MELSY_RECORDS}/`, adaptRecordToServer(updatedRecord), {
      headers: { Authorization: `${getState().USER.token}` },
    })
    .then(({ data }) => {
      dispatch(editRecordSuccess());
      dispatch(loadRecord(adaptRecordToClient(data)));
    })
    .catch((err) => {
      dispatch(editRecordError(err.message));
    });
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

export const deleteRecord = (id) => (dispatch, getState, api) => {
  dispatch(deleteRecordStart());
  return api
    .delete(`${APIRoute.MELSY_RECORDS}/${id}`, {
      headers: { Authorization: `${getState().USER.token}` },
    })
    .then(({ data }) => {
      dispatch(deleteRecordSuccess());
      dispatch(removeRecord(data.id));
    })
    .catch((err) => {
      dispatch(deleteRecordError(err.message));
    });
};
export const deleteRecordStart = () => ({
  type: ActionType.EDIT_RECORD_START,
});
export const deleteRecordSuccess = () => ({
  type: ActionType.EDIT_RECORD_SUCCESS,
});
export const deleteRecordError = (payload) => ({
  type: ActionType.EDIT_RECORD_ERROR,
  payload,
});

export const setActiveRecordId = (payload) => ({
  type: ActionType.SET_ACTIVE_RECORD_ID,
  payload,
});
export const setRecordToDeleteId = (payload) => ({
  type: ActionType.SET_RECORD_TO_DELETE_ID,
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

export const addFilter = (payload) => ({
  type: ActionType.ADD_FILTER,
  payload,
});

export const removeFilter = (payload) => ({
  type: ActionType.REMOVE_FILTER,
  payload,
});
