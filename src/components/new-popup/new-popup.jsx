import React from "react";
import "./popup.css";

const NewPopup = (props) => (
  <div className="popup">
    <div className="popup__content">{props.children}</div>
  </div>
);

export default NewPopup;
