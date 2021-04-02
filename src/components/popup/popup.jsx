import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteRecord,
  setRecordToDelete,
  togglePopup,
  toggleRecordPopup,
} from "../../store/action";
import "./popup.css";
import { getIsRecordShown } from "../../store/reducers/app-state/selectors";

const Popup = ({ handleRecordDelete, handleCancelBtnClick, isRecordShown }) => (
  <div className="popup">
    <div className="popup__content">
      <h2 className="popup__header">Вы уверены, что хотите удалить запись?</h2>
      <div className="popup__controls">
        <button
          className="popup__button popup__button_danger"
          onClick={handleRecordDelete.bind(this, isRecordShown)}
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
  isRecordShown: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isRecordShown: getIsRecordShown(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleRecordDelete(isRecordShown) {
    dispatch(deleteRecord());
    if (isRecordShown) {
      dispatch(toggleRecordPopup());
    }
    dispatch(togglePopup());
  },
  handleCancelBtnClick() {
    dispatch(setRecordToDelete(-1));
    dispatch(togglePopup());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
