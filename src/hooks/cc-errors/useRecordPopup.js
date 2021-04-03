import React from "react";
import NewPopup from "../../components/new-popup/new-popup";

export const useRecordPopup = () => {
  return (
    <NewPopup>
      <div className="popup__controls">
        <button className="popup__button_close" />
      </div>
      <h1>Hello from popup</h1>
    </NewPopup>
  );
};
