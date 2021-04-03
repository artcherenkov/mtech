import React from "react";
import PropTypes from "prop-types";
import "../new-popup/popup.css";

const Popup = ({ handleRecordDelete, handleCancelBtnClick }) => (
  <div className="popup">
    <div className="popup__content">
      <h2 className="popup__header">Вы уверены, что хотите удалить запись?</h2>
      <div className="popup__controls">
        <button
          className="popup__button popup__button_danger"
          onClick={handleRecordDelete}
        >
          Удалить
        </button>
        <button className="popup__button" onClick={handleCancelBtnClick}>
          Отмена
        </button>
      </div>
    </div>
  </div>
);

Popup.propTypes = {
  handleRecordDelete: PropTypes.func.isRequired,
  handleCancelBtnClick: PropTypes.func.isRequired,
};

export default Popup;
