import React from "react";
import PropTypes from "prop-types";
import { connect, shallowEqual, useSelector } from "react-redux";

import Header from "../../components/header/header";
import Lock from "../../components/lock/lock";
import { getIsAuth } from "../../store/reducers/app-user/selectors";
import {
  getIsDeletePopupShown,
  getIsRecordPopupShown,
} from "../../store/reducers/cc-errors/selectors";
import { useRecordPopup } from "../../hooks/cc-errors/useRecordPopup";
import { useDeleteRecordPopup } from "../../hooks/cc-errors/useDeleteRecordPopup";
import Table from "../../components/table/table";

const CCErrorsPage = (props) => {
  const isDeletePopupShown = useSelector(getIsDeletePopupShown, shallowEqual);
  const isRecordPopupShown = useSelector(getIsRecordPopupShown, shallowEqual);

  const recordPopup = useRecordPopup();
  const deleteRecordPopup = useDeleteRecordPopup();

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
