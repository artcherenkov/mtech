import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecordFields from "./components/record-fields/record-fields";
import { getActiveRecordId, getRecords } from "../../store/reducers/app-store/selectors";
import {
  closeRecord, editRecord,
  setRecordToDelete,
  togglePopup,
  toggleRecordEditMode,
  toggleRecordPopup,
} from "../../store/action";

import './record.css';
import { getIsRecordEditing } from "../../store/reducers/app-state/selectors";

export const RecordField = {
  CLIENT_NAME: `Имя заказчика`,
  DATE: `Дата`,
  STAFF_NAME: `Имя сотрудника`,
  STATUS: `Статус`,
  MTECH_SERVICES: `Список услуг`,
  PERCENT_DIFF: `Процент`,
};

const Record = ({ records, isRecordEditing, activeRecordId, handleCloseBtnClick, handleDeleteBtnClick, handleEditBtnClick, handleSaveBtnClick }) => {
  const record = records.find((record) => record.id === activeRecordId);
  const [updatingRecord, setUpdatingRecord] = useState(record);
  return (
    <div className="popup record">
      {updatingRecord && <div className="popup__content record__content-wrapper">
        <div className="record__controls">
          <button className="record__button record__button_type_delete" onClick={handleDeleteBtnClick.bind(this, updatingRecord.id)}>Удалить</button>
          {!isRecordEditing && <button className="record__button record__button_type_edit" onClick={handleEditBtnClick}>Редактировать</button>}
          {isRecordEditing && <button className="record__button record__button_type_edit" onClick={handleSaveBtnClick.bind(this, updatingRecord)}>Сохранить</button>}
          <button className="record__button record__button_type_close" onClick={handleCloseBtnClick}/>
        </div>
        <div className="record__content">
          <h2 className="record__title">{isRecordEditing ? `Редактирование` : `Просмотр`} заявки №{updatingRecord.id}</h2>
          <RecordFields record={updatingRecord} isRecordEditing={isRecordEditing} setUpdatingRecord={setUpdatingRecord}/>
        </div>
      </div>}
    </div>
  );
};

Record.propTypes = {
  records: PropTypes.array.isRequired,
  isRecordEditing: PropTypes.bool.isRequired,
  activeRecordId: PropTypes.number.isRequired,
  handleCloseBtnClick: PropTypes.func.isRequired,
  handleDeleteBtnClick: PropTypes.func.isRequired,
  handleEditBtnClick: PropTypes.func.isRequired,
  handleSaveBtnClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  records: getRecords(state),
  activeRecordId: getActiveRecordId(state),
  isRecordEditing: getIsRecordEditing(state),
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
  handleEditBtnClick() {
    dispatch(toggleRecordEditMode());
  },
  handleSaveBtnClick(updatedRecord) {
    dispatch(editRecord(updatedRecord));
    dispatch(toggleRecordEditMode());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
