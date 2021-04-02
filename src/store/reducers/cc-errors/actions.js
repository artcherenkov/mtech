import { APIRoute } from "../../../utils/const";

export const ActionType = {
  FETCH_RECORDS_START: "cc-errors/fetch_records_start",
  FETCH_RECORDS_SUCCESS: "cc-errors/fetch_records_success",
  FETCH_RECORDS_ERROR: "cc-errors/fetch_records_error",

  LOAD_RECORD: "cc-errors/load_record",

  EDIT_RECORD_START: "cc-errors/edit_record_start",
  EDIT_RECORD_SUCCESS: "cc-errors/edit_record_success",
  EDIT_RECORD_ERROR: "cc-errors/edit_record_error",
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

export const loadRecord = (payload) => ({
  type: ActionType.LOAD_RECORD,
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
