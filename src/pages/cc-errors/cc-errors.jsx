import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";

import Header from "../../components/header/header";
import Lock from "../../components/lock/lock";
import { getIsAuth } from "../../store/reducers/app-user/selectors";

import Table from "../../components/table/table";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { getRecordToDeleteId } from "../../store/reducers/cc-errors/selectors";
import {
  deleteRecord,
  setRecordToDelete,
} from "../../store/reducers/cc-errors/actions";
import FilterControls from "../../components/filter-controls/filter-controls";

const CCErrorsPage = (props) => {
  const dispatch = useDispatch();
  const recordToDeleteId = useSelector(getRecordToDeleteId, shallowEqual);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setIsDeleteDialogOpen(recordToDeleteId !== -1);
  }, [recordToDeleteId]);

  const onCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    dispatch(setRecordToDelete(-1));
  };

  const onDeleteBtnClick = () => {
    dispatch(deleteRecord(recordToDeleteId));
  };

  return (
    <>
      <Header />
      {props.isAuth ? (
        <section style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
          <FilterControls />
          <Table />
        </section>
      ) : (
        <Lock />
      )}
      <Dialog
        open={isDeleteDialogOpen}
        disableBackdropClick
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Удалить запись № {recordToDeleteId}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Подтвердите удаление записи.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteDialog} color="primary">
            Не удалять
          </Button>
          <Button onClick={onDeleteBtnClick} color="secondary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
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
