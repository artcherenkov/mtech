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
export const getIsDeletePopupShown = (state) => {
  return state.CCErrors.isDeletePopupShown;
};
export const getActiveRecordId = (state) => {
  return state.CCErrors.activeRecordId;
};
export const getIsRecordPopupShown = (state) => {
  return state.CCErrors.isRecordPopupShown;
};
export const getIsEditMode = (state) => {
  return state.CCErrors.isEditMode;
};
export const getIsLoading = (state) => {
  return state.CCErrors.isLoading;
};
export const getIsAnyPopupShown = (state) => {
  return state.CCErrors.isDeletePopupShown || state.CCErrors.isRecordPopupShown;
};
export const getFilters = (state) => {
  return state.CCErrors.filters;
};
