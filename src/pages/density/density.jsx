import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "../../components/header/header";
import ControlsStrip from "../../components/controls-strip/controls-strip";
import Table from "../../components/table/table";
import Lock from "../../components/lock/lock";
import Record from "../../components/record/record";
import Popup from "../../components/popup/popup";
import AuthForm from "../../components/auth-form/auth-form";
import {
  getIsAuthFormShown,
  getIsPopupShown,
  getIsRecordShown,
} from "../../store/reducers/app-state/selectors";
import { getIsAuth } from "../../store/reducers/app-user/selectors";

const DensityPage = (props) => {
  const { isPopupShown, isRecordPopupShown, isAuthFormShown, isAuth } = props;
  return (
    <>
      <Header />
      {isAuth ? (
        <>
          <ControlsStrip />
          <Table />
        </>
      ) : (
        <Lock />
      )}
      {isRecordPopupShown && <Record />}
      {isPopupShown && <Popup />}
      {isAuthFormShown && <AuthForm />}
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

export { DensityPage };
export default connect(mapStateToProps, null)(DensityPage);
