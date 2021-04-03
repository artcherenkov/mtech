import React from "react";
import PropTypes from "prop-types";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";

import Header from "../../components/header/header";
import Lock from "../../components/lock/lock";
import { getIsAuth } from "../../store/reducers/app-user/selectors";
import { useRecordsSelector } from "../../hooks/cc-errors/useRecordsSelector";
import { useTable } from "../../hooks/cc-errors/useTable";
import Popup from "../../components/popup/popup";
import {
  getIsDeletePopupShown,
  getIsRecordPopupShown,
  getRecordToDeleteId,
} from "../../store/reducers/cc-errors/selectors";
import {
  deleteRecord,
  setRecordToDelete,
} from "../../store/reducers/cc-errors/actions";
import { useRecordPopup } from "../../hooks/cc-errors/useRecordPopup";

const CCErrorsPage = (props) => {
  const dispatch = useDispatch();

  const records = useRecordsSelector();

  const recordToDeleteId = useSelector(getRecordToDeleteId, shallowEqual);
  const isDeletePopupShown = useSelector(getIsDeletePopupShown, shallowEqual);
  const isRecordPopupShown = useSelector(getIsRecordPopupShown, shallowEqual);

  const table = useTable(records);
  const recordPopup = useRecordPopup();

  const handleRecordDelete = () => dispatch(deleteRecord(recordToDeleteId));
  const handleCancelBtnClick = () => dispatch(setRecordToDelete(-1));

  return (
    <>
      <Header />
      {props.isAuth ? (
        <section className="table-section">{table}</section>
      ) : (
        <Lock />
      )}
      {isDeletePopupShown && (
        <Popup
          handleRecordDelete={handleRecordDelete}
          handleCancelBtnClick={handleCancelBtnClick}
        />
      )}
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
