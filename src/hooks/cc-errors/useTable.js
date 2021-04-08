import React from "react";
import NewTable from "../../components/new-table/new-table";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setActiveRecordId,
  setEditMode,
} from "../../store/reducers/cc-errors/actions";
import { setRecordToDelete } from "../../store/reducers/cc-errors/actions";
import moment from "moment";
import classnames from "classnames";
import FavoriteButton from "../../components/favorite-button/favorite-button";
import {
  getIsAnyPopupShown,
  getIsLoading,
} from "../../store/reducers/cc-errors/selectors";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";

const TABLE_HEADERS = ["", "ID", "ID записи", "Дата", ""];

export const useTable = (records) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading, shallowEqual);
  const isAnyPopupShown = useSelector(getIsAnyPopupShown, shallowEqual);

  const onEditButtonClick = (id) => {
    return () => {
      dispatch(setActiveRecordId(id));
      dispatch(setEditMode());
    };
  };
  const onRowClick = (id) => {
    return (evt) => {
      if (
        evt.target.tagName.toLowerCase() !== "button" &&
        !evt.target.classList.contains("popup__checkbox-replacement") &&
        !evt.target.classList.contains("popup__checkbox-input")
      ) {
        dispatch(setActiveRecordId(id));
      }
    };
  };

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
      <tr
        className={classnames("table__row", {
          table__row_done: item.isResolved,
        })}
        key={`content-row-${idx}`}
        onClick={onRowClick(item.id)}
      >
        <td className="table__cell table__cell_name_favorite">
          <FavoriteButton recordId={item.id} />
        </td>
        <td className="table__cell">{item.id}</td>
        <td className="table__cell">{item.resourceId}</td>
        <td className="table__cell">
          {moment(item.date).format("DD.MM.YYYY kk:mm")}
        </td>
        <td className="table__cell table__cell_controls">
          <div className="table__controls">
            <button
              className="table__button table__button_type_edit"
              onClick={onEditButtonClick(item.id)}
            />
            <button
              className="table__button table__button_type_delete"
              onClick={() => dispatch(setRecordToDelete(item.id))}
            />
          </div>
        </td>
      </tr>
    );
  };

  if (isLoading && !isAnyPopupShown) {
    return (
      <div style={{ marginTop: 50 }}>
        <LoadingSpinner size={50} strokeWidth={5} />
      </div>
    );
  }

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
