import React, { useRef } from "react";

import useOutsideClick from "../../hooks/useOutsideClick";
import "./popup.css";

const NewPopup = (props) => {
  const popupRef = useRef();
  useOutsideClick(popupRef, props.onOutsideClick);

  return (
    <div className="popup">
      <div className="popup__content" ref={popupRef}>
        {props.children}
      </div>
    </div>
  );
};

export default NewPopup;
