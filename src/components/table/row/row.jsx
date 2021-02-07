import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ record }) => {
  return (
    <tr className="table__row">
      <td className="table__cell">{record.id}</td>
      <td className="table__cell">{record.clientName}</td>
      <td className="table__cell">{record.percentDiff}</td>
      <td className="table__cell">{record.staffName}</td>
      <td className="table__cell">{record.date}</td>
      <td className="table__cell">{record.status}</td>
      <td className="table__cell table__cell_controls">
        <div className="table__controls">
          <button className="table__button table__button_type_edit" />
          <button className="table__button table__button_type_delete" />
        </div>
      </td>
    </tr>
  );
};

Row.propTypes = {
  record: PropTypes.object.isRequired,
};

export default Row;
