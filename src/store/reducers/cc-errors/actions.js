export const ActionType = {
  LOAD_RECORDS: "cc-errors/load_records",
};

export const loadRecords = (payload) => ({
  type: ActionType.LOAD_RECORDS,
  payload,
});
