import React from "react";
import NewPopup from "../../components/new-popup/new-popup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getRecordToDeleteId } from "../../store/reducers/cc-errors/selectors";
import {
  deleteRecord,
  setRecordToDelete,
} from "../../store/reducers/cc-errors/actions";

export const useDeleteRecordPopup = () => {
  const dispatch = useDispatch();
  const recordToDeleteId = useSelector(getRecordToDeleteId, shallowEqual);

  const handleRecordDelete = () => dispatch(deleteRecord(recordToDeleteId));
  const onClosePopup = () => dispatch(setRecordToDelete(-1));

  return (
    <NewPopup type="delete" onOutsideClick={onClosePopup}>
      <div className="popup__controls">
        <button className="popup__button_close" onClick={onClosePopup} />
      </div>
      <h2 className="popup__header">Вы уверены, что хотите удалить запись?</h2>
      <div className="popup__controls">
        <button
          className="popup__button popup__button_danger"
          onClick={handleRecordDelete}
        >
          Удалить
        </button>
        <button className="popup__button" onClick={onClosePopup}>
          Отмена
        </button>
      </div>
    </NewPopup>
  );
};
