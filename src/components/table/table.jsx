import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from './row/row';
import { getRecords } from "../../store/reducers/app-store/selectors";

const Table = ({ records }) => {
  const isRecordsEmpty = !records || !records.length;
  return (
    <section className="table-section">
      {!isRecordsEmpty
        ? <div className="table__wrapper">
          <table className="table">
            <thead className="table__head">
            <tr className="table__row">
              <th className="table__cell table__cell_header">№</th>
              <th className="table__cell table__cell_header">Имя клиента</th>
              <th className="table__cell table__cell_header">Процент</th>
              <th className="table__cell table__cell_header">Имя сотрудника</th>
              <th className="table__cell table__cell_header">Дата</th>
              <th className="table__cell table__cell_header">Статус</th>
              <th className="table__cell table__cell_header"/>
            </tr>
            </thead>
            <tbody className="table__body">
            {records.map((record) => (
              <Row key={`record-${record.id}`} record={record}/>
            ))}
            </tbody>
          </table>
        </div>
        : <h2>Список записей пуст</h2>}
    </section>
  );
};

Table.propTypes = {
  records: PropTypes.array,
};

const mapStateToProps = (state) => ({
  records: getRecords(state),
});

export { Table };
export default connect(mapStateToProps, null)(Table);
