export const getRecords = (state) => {
  return state.CCErrors.records;
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
