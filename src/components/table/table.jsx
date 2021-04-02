import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Row from "./row/row";
import { getRecords } from "../../store/reducers/app-store/selectors";
import { openRecord, toggleRecordPopup } from "../../store/action";

import "./table.css";
import { getSearchValue } from "../../store/reducers/app-state/selectors";

const Table = ({ records, searchValue, handleRecordClick }) => {
  const isRecordsEmpty = !records || !records.length;

  const filteredRecords = records.filter((record) =>
    record.clientName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <section className="table-section">
      {!isRecordsEmpty ? (
        <div className="table__wrapper">
          <table className="table">
            <thead className="table__head">
              <tr className="table__row">
                <th className="table__cell table__cell_header">№</th>
                <th className="table__cell table__cell_header">Имя клиента</th>
                <th className="table__cell table__cell_header">Отклонение</th>
                <th className="table__cell table__cell_header">
                  Имя сотрудника
                </th>
                <th className="table__cell table__cell_header">Дата</th>
                <th className="table__cell table__cell_header">Статус</th>
                <th className="table__cell table__cell_header" />
              </tr>
            </thead>
            <tbody className="table__body">
              {filteredRecords.map((record) => (
                <Row
                  key={`record-${record.id}`}
                  record={record}
                  onClick={handleRecordClick.bind(this, record.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>Список записей пуст</h2>
      )}
    </section>
  );
};

Table.propTypes = {
  records: PropTypes.array.isRequired,
  searchValue: PropTypes.string,
  handleRecordClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  records: getRecords(state),
  searchValue: getSearchValue(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleRecordClick(id, evt) {
    if (evt.target.tagName.toLowerCase() !== `button`) {
      dispatch(openRecord(id));
      dispatch(toggleRecordPopup());
    }
  },
});

export { Table };
export default connect(mapStateToProps, mapDispatchToProps)(Table);
