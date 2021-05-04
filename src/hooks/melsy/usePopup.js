import { useState, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {
  loadRecord,
  setActiveRecordId,
} from "../../store/reducers/melsytech/actions";
import useRecordsByIdSelector from "./selectors/useRecordsByIdSelector";
import useStyles from "./styles";

const usePopup = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const activeRecordId = useSelector(
    (state) => state.melsytech.activeRecordId,
    shallowEqual
  );
  const activeRecord = useRecordsByIdSelector(activeRecordId);

  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    setOpen(activeRecordId !== -1);
  }, [activeRecordId]);

  const onCloseBtnClick = () => {
    setOpen(false);
    setTimeout(() => dispatch(setActiveRecordId(-1)), 300);
  };
  const onCommentEditClick = () => setIsEditMode(true);
  const onCommentSaveClick = () => {
    if (activeRecord.comment !== commentRef.current.value) {
      dispatch(
        loadRecord({ ...activeRecord, comment: commentRef.current.value })
      );
    }
    setIsEditMode(false);
  };

  return (
    <Backdrop className={classes.popup} open={open}>
      <Paper className={classes.popup__content}>
        <Box align="right">
          <IconButton size="small" onClick={onCloseBtnClick}>
            <CloseIcon />
          </IconButton>
        </Box>
        <h2 className={classes.popup__header}>
          Просмотр записи №{activeRecordId}
        </h2>
        {activeRecord && (
          <Box
            className={classnames(classes.popup__recordData, classes.record)}
          >
            <Box p={1}>
              <Typography variant="subtitle2">Имя сотрудника:</Typography>
              <Box p={1}>
                <Typography variant="body1">
                  {activeRecord.staffName}
                </Typography>
              </Box>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle2">Дата:</Typography>
              <Box p={1}>
                <Typography variant="body1">{activeRecord.date}</Typography>
              </Box>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle2">Услуги Melsytech:</Typography>
              <Box p={1}>
                <ol className={classes.record__fieldList}>
                  {activeRecord.mtechServices.map((item) => (
                    <li>
                      <Typography variant="body1">{item}</Typography>
                    </li>
                  ))}
                </ol>
              </Box>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle2">Услуги YClients: </Typography>
              <Box p={1}>
                <ol className={classes.record__fieldList}>
                  {activeRecord.yclServices.map((item) => (
                    <li>
                      <Typography variant="body1">{item}</Typography>
                    </li>
                  ))}
                </ol>
              </Box>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle2">
                Вспышек по регламенту:
              </Typography>
              <Box p={1}>
                <Typography>{activeRecord.impulsesStandart}</Typography>
              </Box>
              <Typography variant="subtitle2">Вспышек произведено:</Typography>
              <Box p={1}>
                <Typography>{activeRecord.impulsesCount}</Typography>
              </Box>
              <Typography variant="subtitle2">Разница: </Typography>
              <Box p={1}>
                <Typography>{activeRecord.impulsesDiff}</Typography>
              </Box>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle2" style={{ display: "flex" }}>
                Комментарий:
                <Button
                  size="small"
                  color="primary"
                  onClick={isEditMode ? onCommentSaveClick : onCommentEditClick}
                  align="right"
                  style={{ marginLeft: "auto" }}
                >
                  {isEditMode ? "Сохранить" : "Редактировать"}
                </Button>
              </Typography>

              {isEditMode ? (
                <textarea
                  className={classnames(
                    classes.record__textarea,
                    "MuiTypography-body1"
                  )}
                  name="comment"
                  id="comment"
                  ref={commentRef}
                  rows={8}
                  defaultValue={activeRecord.comment}
                />
              ) : (
                <Box p={1}>
                  <Typography variant="body1">
                    {activeRecord.comment}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </Backdrop>
  );
};

export default usePopup;
