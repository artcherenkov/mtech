import React from "react";
import NewPopup from "../../components/new-popup/new-popup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getActiveRecordId,
  getIsEditMode,
} from "../../store/reducers/cc-errors/selectors";
import { setActiveRecordId } from "../../store/reducers/cc-errors/actions";

export const useRecordPopup = () => {
  const dispatch = useDispatch();
  const activeRecordId = useSelector(getActiveRecordId, shallowEqual);
  const isEditMode = useSelector(getIsEditMode, shallowEqual);

  const onClosePopup = () => dispatch(setActiveRecordId(-1));

  return (
    <NewPopup onOutsideClick={onClosePopup}>
      <div className="popup__controls">
        <button className="popup__button_close" onClick={onClosePopup} />
      </div>
      <h1>
        Active record is {activeRecordId} in {isEditMode ? "edit" : "view"} mode
      </h1>
    </NewPopup>
  );
};
