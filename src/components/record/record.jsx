import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecordFields from "./components/record-fields/record-fields";
import { getActiveRecordId, getRecords } from "../../store/reducers/app-store/selectors";
import { closeRecord, setRecordToDelete, togglePopup, toggleRecordPopup } from "../../store/action";

import './record.css';

export const RecordField = {
  CLIENT_NAME: `Имя заказчика`,
  DATE: `Дата`,
  STAFF_NAME: `Имя сотрудника`,
  STATUS: `Статус`,
  MTECH_SERVICES: `Список услуг`,
  PERCENT_DIFF: `Процент`,
};

const Record = ({ records, activeRecordId, handleCloseBtnClick, handleDeleteBtnClick }) => {
  const record = records.find((record) => record.id === activeRecordId);
  return (
    <div className="popup record">
      {record && <div className="popup__content record__content-wrapper">
        <div className="record__controls">
          <button className="record__button record__button_type_delete" onClick={handleDeleteBtnClick.bind(this, record.id)}>Удалить</button>
          <button className="record__button record__button_type_edit" onClick={handleCloseBtnClick}>Редактировать</button>
          <button className="record__button record__button_type_close" onClick={handleCloseBtnClick}/>
        </div>
        <div className="record__content">
          <h2 className="record__title">Просмотр заявки №{record.id}</h2>
          <RecordFields record={record}/>
        </div>
      </div>}
    </div>
  );
};

Record.propTypes = {
  records: PropTypes.array.isRequired,
  activeRecordId: PropTypes.number.isRequired,
  handleCloseBtnClick: PropTypes.func.isRequired,
  handleDeleteBtnClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  records: getRecords(state),
  activeRecordId: getActiveRecordId(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCloseBtnClick() {
    dispatch(closeRecord());
    dispatch(toggleRecordPopup());
  },
  handleDeleteBtnClick(id) {
    dispatch(setRecordToDelete(id));
    dispatch(togglePopup());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
