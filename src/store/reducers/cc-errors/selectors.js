export const getRecords = (state) => {
  return state.CCErrors.records;
};
export const getRecordById = (id, state) => {
  const records = getRecords(state);
  if (records) {
    return records.find((r) => r.id === id);
  }
  return null;
};
export const getRecordToDeleteId = (state) => {
  return state.CCErrors.recordToDeleteId;
};
export const getActiveRecordId = (state) => {
  return state.CCErrors.activeRecordId;
};
export const getIsEditMode = (state) => {
  return state.CCErrors.isEditMode;
};
export const getIsLoading = (state) => {
  return state.CCErrors.isLoading;
};
export const getFilters = (state) => {
  return state.CCErrors.filters;
};
