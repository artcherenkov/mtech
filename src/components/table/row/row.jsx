import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  openRecord,
  setRecordToDelete,
  togglePopup,
  toggleRecordEditMode, toggleRecordPopup,
} from "../../../store/action";
import { Status } from "../../../mocks/record";

const getRowStyles = (status) => {
  const styles = [`table__row`];
  if (status === Status.DONE) {
    styles.push(`table__row_done`);
  }
  return styles.join(` `);
};

const Row = ({ record, handleDeleteBtnClick, handleEditBtnClick, onClick }) => {
  return (
    <tr className={getRowStyles(record.status)} onClick={onClick}>
      <td className="table__cell">{record.id}</td>
      <td className="table__cell">{record.clientName}</td>
      <td className="table__cell">{record.percentDiff}</td>
      <td className="table__cell">{record.staffName}</td>
      <td className="table__cell">{record.date}</td>
      <td className="table__cell">{record.status}</td>
      <td className="table__cell table__cell_controls">
        <div className="table__controls">
          <button className="table__button table__button_type_edit" onClick={handleEditBtnClick.bind(this, record.id)} />
          <button className="table__button table__button_type_delete" onClick={handleDeleteBtnClick.bind(this, record.id)} />
        </div>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleDeleteBtnClick(id) {
    dispatch(setRecordToDelete(id));
    dispatch(togglePopup());
  },
  handleEditBtnClick(id) {
    dispatch(toggleRecordEditMode());
    dispatch(openRecord(id));
    dispatch(toggleRecordPopup());
  },
});

Row.propTypes = {
  record: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  handleDeleteBtnClick: PropTypes.func.isRequired,
  handleEditBtnClick: PropTypes.func.isRequired,
};

export { Row };
export default connect(null, mapDispatchToProps)(Row);
