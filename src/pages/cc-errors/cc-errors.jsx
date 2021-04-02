import React from "react";
import PropTypes from "prop-types";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";

import Header from "../../components/header/header";
import ControlsStrip from "../../components/controls-strip/controls-strip";
import Lock from "../../components/lock/lock";
import {
  getIsAuthFormShown,
  getIsRecordShown,
} from "../../store/reducers/app-state/selectors";
import { getIsAuth } from "../../store/reducers/app-user/selectors";
import { DensityPage } from "../density/density";
import { useRecordsSelector } from "../../hooks/cc-errors/useRecordsSelector";
import { useTable } from "../../hooks/cc-errors/useTable";
import Popup from "../../components/popup/popup";
import {
  getIsDeletePopupShown,
  getRecordToDeleteId,
} from "../../store/reducers/cc-errors/selectors";
import {
  deleteRecord,
  setRecordToDelete,
} from "../../store/reducers/cc-errors/actions";

const CCErrorsPage = (props) => {
  const dispatch = useDispatch();

  const records = useRecordsSelector();
  const recordToDeleteId = useSelector(getRecordToDeleteId, shallowEqual);
  const isDeletePopupShown = useSelector(getIsDeletePopupShown, shallowEqual);

  const table = useTable(records);

  const handleRecordDelete = () => dispatch(deleteRecord(recordToDeleteId));
  const handleCancelBtnClick = () => dispatch(setRecordToDelete(-1));

  return (
    <>
      <Header />
      {props.isAuth ? (
        <section className="table-section">
          <ControlsStrip />
          {table}
        </section>
      ) : (
        <Lock />
      )}
      {isDeletePopupShown && (
        <Popup
          handleRecordDelete={handleRecordDelete}
          handleCancelBtnClick={handleCancelBtnClick}
        />
      )}
    </>
  );
};

DensityPage.propTypes = {
  isRecordPopupShown: PropTypes.bool.isRequired,
  isAuthFormShown: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isRecordPopupShown: getIsRecordShown(state),
  isAuthFormShown: getIsAuthFormShown(state),
  isAuth: getIsAuth(state),
});

export { CCErrorsPage };
export default connect(mapStateToProps, null)(CCErrorsPage);
