import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import Header from "../../components/header/header";
import Lock from "../../components/lock/lock";
import DeletePopup from "./components/delete-popup/delete-popup";
import RecordPopup from "./components/record-popup/record-popup";
import MelsyTable from "./components/table/table";
import FilterControls from "./components/filter-controls/filter-controls";
import { resetErrors } from "../../store/reducers/melsytech/actions";

const MelsyPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.USER.isAuth);
  const isLoading = useSelector((state) => state.melsytech.isLoading);
  const error = useSelector((state) => state.melsytech.error);

  const onErrorClose = () => {
    dispatch(resetErrors());
  };

  return (
    <>
      <Header />
      {isAuth ? (
        <section style={{ width: "100%", padding: "0 20px", margin: "0 auto" }}>
          <h1>Melsy</h1>
          <FilterControls />
          <MelsyTable />
        </section>
      ) : (
        <Lock />
      )}
      <RecordPopup />
      <DeletePopup />
      <Backdrop open={isLoading} style={{ zIndex: 10, color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={!!error}
        onClose={onErrorClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Возникла ошибка</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onErrorClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MelsyPage;
