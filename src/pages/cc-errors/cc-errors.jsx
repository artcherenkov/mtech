import React from "react";
import PropTypes from "prop-types";
import { connect, shallowEqual, useSelector } from "react-redux";

import Header from "../../components/header/header";
import Lock from "../../components/lock/lock";
import { getIsAuth } from "../../store/reducers/app-user/selectors";
import { useRecordsSelector } from "../../hooks/cc-errors/useRecordsSelector";
import { useTable } from "../../hooks/cc-errors/useTable";
import {
  getIsDeletePopupShown,
  getIsRecordPopupShown,
} from "../../store/reducers/cc-errors/selectors";
import { useRecordPopup } from "../../hooks/cc-errors/useRecordPopup";
import { useDeleteRecordPopup } from "../../hooks/cc-errors/useDeleteRecordPopup";

const CCErrorsPage = (props) => {
  const records = useRecordsSelector();

  const isDeletePopupShown = useSelector(getIsDeletePopupShown, shallowEqual);
  const isRecordPopupShown = useSelector(getIsRecordPopupShown, shallowEqual);

  const table = useTable(records);
  const recordPopup = useRecordPopup();
  const deleteRecordPopup = useDeleteRecordPopup();

  return (
    <>
      <Header />
      {props.isAuth ? (
        <section className="table-section">{table}</section>
      ) : (
        <Lock />
      )}
      {isDeletePopupShown && deleteRecordPopup}
      {isRecordPopupShown && recordPopup}
    </>
  );
};

CCErrorsPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
});

export { CCErrorsPage };
export default connect(mapStateToProps, null)(CCErrorsPage);
