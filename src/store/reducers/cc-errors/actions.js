import { APIRoute } from "../../../utils/const";

export const ActionType = {
  LOAD_RECORDS: "cc-errors/load_records",
  LOAD_RECORDS_SUCCESS: "cc-errors/load_records_success",
  LOAD_RECORDS_ERROR: "cc-errors/load_records_error",
};

export const fetchRecords = () => (dispatch, getState, api) => {
  dispatch(loadRecords());
  return api
    .get(APIRoute.RECORDS, {
      headers: { Authorization: `Bearer ${getState().USER.token}` },
    })
    .then(({ data }) => dispatch(loadRecordsSuccess(data)))
    .catch((err) => dispatch(loadRecordsError(err.message)));
};

export const loadRecords = () => ({
  type: ActionType.LOAD_RECORDS,
});

export const loadRecordsSuccess = (payload) => ({
  type: ActionType.LOAD_RECORDS_SUCCESS,
  payload,
});

export const loadRecordsError = (payload) => ({
  type: ActionType.LOAD_RECORDS_ERROR,
  payload,
});
