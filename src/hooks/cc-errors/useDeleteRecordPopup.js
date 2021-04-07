import React from "react";
import NewPopup from "../../components/new-popup/new-popup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getIsLoading,
  getRecordToDeleteId,
} from "../../store/reducers/cc-errors/selectors";
import {
  deleteRecord,
  setRecordToDelete,
} from "../../store/reducers/cc-errors/actions";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";

export const useDeleteRecordPopup = () => {
  const dispatch = useDispatch();
  const recordToDeleteId = useSelector(getRecordToDeleteId, shallowEqual);
  const isLoading = useSelector(getIsLoading, shallowEqual);

  const handleRecordDelete = () => dispatch(deleteRecord(recordToDeleteId));
  const onClosePopup = () => dispatch(setRecordToDelete(-1));

  return (
    <NewPopup type="delete" onOutsideClick={onClosePopup}>
      <div className="popup__controls">
        <button
          className="popup__button popup__button_action_close"
          onClick={onClosePopup}
        />
      </div>
      <h2 className="popup__header">Вы уверены, что хотите удалить запись?</h2>
      <div className="popup__controls popup__controls_pos_bottom">
        <button
          className="popup__button popup__button_danger"
          onClick={handleRecordDelete}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size={20} strokeWidth={4} /> : "Удалить"}
        </button>
        <button
          className="popup__button"
          onClick={onClosePopup}
          disabled={isLoading}
        >
          Отмена
        </button>
      </div>
    </NewPopup>
  );
};
