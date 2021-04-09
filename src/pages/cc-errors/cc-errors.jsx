import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "../../components/header/header";
import Lock from "../../components/lock/lock";
import { getIsAuth } from "../../store/reducers/app-user/selectors";

import Table from "../../components/table/table";

const CCErrorsPage = (props) => {
  return (
    <>
      <Header />
      {props.isAuth ? (
        <section style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
          <Table />
        </section>
      ) : (
        <Lock />
      )}
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
