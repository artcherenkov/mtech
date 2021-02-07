import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from './row/row';
import { generateRecords } from "../../mocks/record";

const Table = ({ records = generateRecords(30) }) => {
  return (
    <section className="table-section">
      <div className="table__wrapper">
        <table className="table">
          <thead className="table__head">
          <tr className="table__row">
            <th className="table__cell table__cell_header">№</th>
            <th className="table__cell table__cell_header">Имя клиента</th>
            <th className="table__cell table__cell_header">Процент</th>
            <th className="table__cell table__cell_header">Имя сотрудника</th>
            <th className="table__cell table__cell_header">Дата</th>
            <th className="table__cell table__cell_header">Статус</th>
            <th className="table__cell table__cell_header" />
          </tr>
          </thead>
          <tbody className="table__body">
          {records.map((record) => (
            <Row key={`record-${record.id}`} record={record}/>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

Table.propTypes = {
  records: PropTypes.array,
};

export { Table };
export default connect(null, null)(Table);
