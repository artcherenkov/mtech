import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from '../table/table';
import Header from '../header/header';
import Popup from "../popup/popup";
import { getIsPopupShown } from "../../store/reducers/app-state/selectors";

const App = ({ isPopupShown }) => {
  return (
    <>
      <Header />
      <Table />
      {isPopupShown && <Popup />}
    </>
  );
};

App.propTypes = {
  isPopupShown: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isPopupShown: getIsPopupShown(state),
});

export { App };
export default connect(mapStateToProps, null)(App);
