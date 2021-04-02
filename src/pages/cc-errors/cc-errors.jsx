import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
import { useRecordsSelector } from "../../hooks/cc-errors/useRecordsSelector";
import { useTable } from "../../hooks/cc-errors/useTable";

const CCErrorsPage = (props) => {
  const records = useRecordsSelector();
  const table = useTable(records);

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
