import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NewTable from "../../components/new-table/new-table";
import Header from "../../components/header/header";
import ControlsStrip from "../../components/controls-strip/controls-strip";
import Lock from "../../components/lock/lock";
import {
  getIsAuthFormShown,
  getIsPopupShown,
  getIsRecordShown,
} from "../../store/reducers/app-state/selectors";
import { getIsAuth } from "../../store/reducers/app-user/selectors";
import { DensityPage } from "../density/density";

const TABLE_HEADERS = ["ID", "ID записи", "Дата", ""];
const DATA = [
  {
    id: 1,
    recordId: 13434,
    date: "2021-04-02T07:53:00.518Z",
  },
];

const CCErrorsPage = (props) => {
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

  return (
    <>
      <Header />
      {props.isAuth ? (
        <>
          <ControlsStrip />
          <NewTable
            tableHead={renderTableHead()}
            tableBody={renderTableBody(DATA)}
          />
        </>
      ) : (
        <Lock />
      )}
    </>
  );
};

DensityPage.propTypes = {
  isPopupShown: PropTypes.bool.isRequired,
  isRecordPopupShown: PropTypes.bool.isRequired,
  isAuthFormShown: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isPopupShown: getIsPopupShown(state),
  isRecordPopupShown: getIsRecordShown(state),
  isAuthFormShown: getIsAuthFormShown(state),
  isAuth: getIsAuth(state),
});

export { CCErrorsPage };
export default connect(mapStateToProps, null)(CCErrorsPage);
