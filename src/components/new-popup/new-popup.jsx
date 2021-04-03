import React, { useRef } from "react";
import classnames from "classnames";
import { shallowEqual, useSelector } from "react-redux";

import useOutsideClick from "../../hooks/useOutsideClick";
import { getRecordToDeleteId } from "../../store/reducers/cc-errors/selectors";
import "./popup.css";

const NewPopup = (props) => {
  const popupRef = useRef();
  const recordToDeleteId = useSelector(getRecordToDeleteId, shallowEqual);

  let isOutsideClickBlocked = false;
  if (props.type !== "delete" && recordToDeleteId !== -1) {
    isOutsideClickBlocked = true;
  }

  useOutsideClick(popupRef, props.onOutsideClick, isOutsideClickBlocked);

  return (
    <div
      className={classnames("popup", {
        popup_type_delete: props.type === "delete",
      })}
    >
      <div className="popup__content" ref={popupRef}>
        {props.children}
      </div>
    </div>
  );
};

export default NewPopup;
