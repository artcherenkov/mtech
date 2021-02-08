import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from '../table/table';
import Header from '../header/header';
import Popup from "../popup/popup";
import { getIsAuthFormShown, getIsPopupShown, getIsRecordShownShown } from "../../store/reducers/app-state/selectors";
import { getIsAuth } from "../../store/reducers/app-user/selectors";
import Lock from "../lock/lock";
import AuthForm from "../auth-form/auth-form";
import Record from "../record/record";

const App = ({ isPopupShown, isRecordPopupShown, isAuthFormShown, isAuth }) => {
  return (
    <>
      <Header />
      {isAuth
        ? <Table/>
        : <Lock />}
      {isRecordPopupShown && <Record/>}
      {isPopupShown && <Popup />}
      {isAuthFormShown && <AuthForm />}
    </>
  );
};

App.propTypes = {
  isPopupShown: PropTypes.bool.isRequired,
  isRecordPopupShown: PropTypes.bool.isRequired,
  isAuthFormShown: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isPopupShown: getIsPopupShown(state),
  isRecordPopupShown: getIsRecordShownShown(state),
  isAuthFormShown: getIsAuthFormShown(state),
  isAuth: getIsAuth(state),
});

export { App };
export default connect(mapStateToProps, null)(App);
