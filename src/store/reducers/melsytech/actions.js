import { APIRoute } from "../../../utils/const";

export const ActionType = {
  FETCH_RECORDS_START: "melsy/fetch_records_start",
  FETCH_RECORDS_SUCCESS: "melsy/fetch_records_success",
  FETCH_RECORDS_ERROR: "melsy/fetch_records_error",

  SET_ACTIVE_RECORD_ID: "melsy/set_active_record_id",
  LOAD_RECORD: "melsy/load_record",
};

export const fetchRecords = () => (dispatch, getState, api) => {
  dispatch(fetchRecordsStart());
  return api
    .get(`${APIRoute.MELSY_RECORDS}/`, {
      headers: { Authorization: `Bearer ${getState().USER.token}` },
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

export const setActiveRecordId = (payload) => ({
  type: ActionType.SET_ACTIVE_RECORD_ID,
  payload,
});
export const loadRecord = (payload) => ({
  type: ActionType.LOAD_RECORD,
  payload,
});
