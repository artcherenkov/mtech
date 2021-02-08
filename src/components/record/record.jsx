import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecordFields from "./components/record-fields/record-fields";
import { getActiveRecordId, getRecords } from "../../store/reducers/app-store/selectors";
import { closeRecord, toggleRecordPopup } from "../../store/action";

export const RecordField = {
  CLIENT_NAME: `Имя заказчика`,
  DATE: `Дата`,
  STAFF_NAME: `Имя сотрудника`,
  STATUS: `Статус`,
  MTECH_SERVICES: `Список услуг`,
  PERCENT_DIFF: `Процент`,
};

const Record = ({ records, activeRecordId, handleCloseBtnClick }) => {
  const record = records.find((record) => record.id === activeRecordId);
  return (
    <div className="popup record">
      <div className="popup__content record__content">
        <button className="popup__close-btn" onClick={handleCloseBtnClick} />
        <h2 className="record__title">Просмотр заявки №{record.id}</h2>
        <RecordFields record={record} />
      </div>
    </div>
  );
};

Record.propTypes = {
  records: PropTypes.array.isRequired,
  activeRecordId: PropTypes.number.isRequired,
  handleCloseBtnClick: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
