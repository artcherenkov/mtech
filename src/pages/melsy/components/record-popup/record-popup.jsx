import { useState, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import moment from "moment";

import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {
  editRecord,
  setActiveRecordId,
} from "../../../../store/reducers/melsytech/actions";
import useRecordsByIdSelector from "../../../../hooks/melsy/selectors/useRecordsByIdSelector";
import RecordField from "./components/record-field/record-field";
import useStyles from "./styles";

const RecordPopup = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const activeRecordId = useSelector(
    (state) => state.melsytech.activeRecordId,
    shallowEqual
  );
  const activeRecord = useRecordsByIdSelector(activeRecordId);

  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);

  useEffect(() => {
    setOpen(activeRecordId !== -1);
    if (activeRecord) {
      setComment(activeRecord.comment);
    }
  }, [activeRecordId, activeRecord]);

  const onCloseBtnClick = () => {
    setOpen(false);
    setTimeout(() => dispatch(setActiveRecordId(-1)), 300);
  };
  const onCommentEditClick = () => setIsEditMode(true);
  const onCommentSaveClick = () => {
    if (activeRecord.comment !== commentRef.current.value) {
      dispatch(
        editRecord(activeRecordId, {
          ...activeRecord,
          comment: commentRef.current.value,
        })
      ).then(() => setIsEditMode(false));
    } else {
      setIsEditMode(false);
    }
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
            <RecordField title="Название филиала">
              <Typography variant="body1">
                {activeRecord.companyTitle}
              </Typography>
            </RecordField>
            <RecordField title="Имя сотрудника">
              <Typography variant="body1">{activeRecord.staffName}</Typography>
            </RecordField>
            <RecordField title="Дата">
              <Typography variant="body1">
                {moment(activeRecord.date).format("DD.MM.YYYY")}{" "}
                {activeRecord.sessionTime.slice(0, 5)}
              </Typography>
            </RecordField>
            <RecordField title="Время работы лазера">
              <Typography variant="body1">
                {activeRecord.sessionTime}
              </Typography>
            </RecordField>
            <RecordField title="Услуги Melsytech">
              {activeRecord.mtechServices ? (
                <ol className={classes.record__fieldList}>
                  {activeRecord.mtechServices.map((item) => (
                    <li>
                      <Typography variant="body1">{item}</Typography>
                    </li>
                  ))}
                </ol>
              ) : (
                "–"
              )}
            </RecordField>
            <RecordField title="Услуги YClients">
              {activeRecord.yclServices ? (
                <ol className={classes.record__fieldList}>
                  {activeRecord.yclServices.map((item) => (
                    <li>
                      <Typography variant="body1">{item}</Typography>
                    </li>
                  ))}
                </ol>
              ) : (
                "–"
              )}
            </RecordField>
            <Box p={1}>
              <Typography variant="subtitle2">Норма вспышек:</Typography>
              <Box p={1}>
                <Typography>
                  {activeRecord.impulsesStandart === -1
                    ? "–"
                    : activeRecord.impulsesStandart}
                </Typography>
              </Box>
              <Typography variant="subtitle2">Вспышек сделано:</Typography>
              <Box p={1}>
                <Typography>{activeRecord.impulsesCount}</Typography>
              </Box>
              <Typography variant="subtitle2">Разница:</Typography>
              <Box p={1}>
                <Typography>
                  {activeRecord.impulsesStandart === -1
                    ? "–"
                    : activeRecord.impulsesDiff +
                      "% – " +
                      activeRecord.impulsesAbsDiff}
                </Typography>
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
                  value={comment}
                  onChange={(evt) => setComment(evt.target.value)}
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

export default RecordPopup;
