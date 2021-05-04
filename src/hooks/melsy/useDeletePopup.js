import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {
  removeRecord,
  setRecordToDeleteId,
} from "../../store/reducers/melsytech/actions";
import useStyles from "./styles";

const useDeletePopup = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const recordToDeleteId = useSelector(
    (state) => state.melsytech.recordToDeleteId,
    shallowEqual
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(recordToDeleteId !== -1);
  }, [recordToDeleteId]);

  const onDeleteClick = () => dispatch(removeRecord(recordToDeleteId));
  const onCancelClick = () => {
    setOpen(false);
    setTimeout(() => dispatch(setRecordToDeleteId(-1)), 300);
  };

  return (
    <Backdrop className={classes.popup} open={open}>
      <Paper className={classes.popup__content}>
        <Typography variant="h6" align="center">
          Вы уверены, что хотите удалить запись №{recordToDeleteId}?
        </Typography>
        <Box className={classes.deletePopup__controls} align="center">
          <Button variant="contained" color="secondary" onClick={onDeleteClick}>
            Удалить
          </Button>
          <Button variant="outlined" color="primary" onClick={onCancelClick}>
            Отмена
          </Button>
        </Box>
      </Paper>
    </Backdrop>
  );
};

export default useDeletePopup;
