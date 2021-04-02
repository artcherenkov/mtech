import React from "react";
import NewTable from "../../components/new-table/new-table";

const TABLE_HEADERS = ["ID", "ID записи", "Дата", ""];

export const useTable = (records) => {
  const renderTableHead = () => {
    return (
      <thead className="table__head">
        <tr className="table__row">
          {TABLE_HEADERS.map((header, idx) => (
            <th
              className="table__cell table__cell_header"
              key={`head-row-${idx}`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };
  const renderTableBody = (data) => {
    return <tbody className="table__body">{data.map(renderTableRow)}</tbody>;
  };
  const renderTableRow = (item, idx) => {
    return (
      <tr className="table__row" key={`content-row-${idx}`}>
        <td className="table__cell">{item.id}</td>
        <td className="table__cell">{item.recordId}</td>
        <td className="table__cell">{item.date}</td>
        <td className="table__cell table__cell_controls">
          <div className="table__controls">
            <button className="table__button table__button_type_edit" />
            <button className="table__button table__button_type_delete" />
          </div>
        </td>
      </tr>
    );
  };

  if (!records || !records.length) {
    return <h1>No data</h1>;
  }

  return (
    <NewTable
      tableHead={renderTableHead()}
      tableBody={renderTableBody(records)}
    />
  );
};
