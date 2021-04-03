import React from "react";
import NewPopup from "../../components/new-popup/new-popup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getActiveRecordId } from "../../store/reducers/cc-errors/selectors";
import { setActiveRecordId } from "../../store/reducers/cc-errors/actions";

export const useRecordPopup = () => {
  const dispatch = useDispatch();
  const activeRecordId = useSelector(getActiveRecordId, shallowEqual);

  const handleCloseButtonClick = () => dispatch(setActiveRecordId(-1));

  return (
    <NewPopup>
      <div className="popup__controls">
        <button
          className="popup__button_close"
          onClick={handleCloseButtonClick}
        />
      </div>
      <h1>Hello from popup, active record is {activeRecordId}</h1>
    </NewPopup>
  );
};
