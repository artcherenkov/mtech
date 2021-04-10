import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";

import TableRow from "@material-ui/core/TableRow";
import { green } from "@material-ui/core/colors";
import TableCell from "@material-ui/core/TableCell";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import FavoriteButton from "../../../favorite-button/favorite-button";
import TableControls from "../controls/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getActiveRecordId,
  getIsEditMode,
} from "../../../../store/reducers/cc-errors/selectors";
import {
  disableEditMode,
  editRecord,
  loadRecord,
  setActiveRecordId,
} from "../../../../store/reducers/cc-errors/actions";
import AlertPopover from "../popover/popover";
import { adaptRecordToServer } from "../../../../core/adapter/record";

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: 5px;
  resize: none;
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);

  &:read-only {
    padding: 0;
    border-color: white;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const Row = (props) => {
  const { record } = props;
  const dispatch = useDispatch();
  const activeRecordId = useSelector(getActiveRecordId, shallowEqual);
  const isEditMode = useSelector(getIsEditMode, shallowEqual);

  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [comment, setComment] = useState(record.comment);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setIsCollapseOpen(activeRecordId === record.id);
  }, [activeRecordId]);

  const onCollapseBtnClick = (evt) => {
    if (comment === record.comment) {
      setIsCollapseOpen(!isCollapseOpen);
      setTimeout(() => {
        dispatch(setActiveRecordId(-1));
        if (isEditMode) {
          dispatch(disableEditMode());
        }
      }, 300);
    } else {
      setAnchorEl(evt.currentTarget);
    }
  };
  const onTextareaChange = (evt) => {
    setComment(evt.target.value);
  };
  const onResetBtnClick = () => {
    setComment(record.comment);
  };
  const onSaveBtnClick = () => {
    const updatedRecord = { ...record, comment };
    dispatch(editRecord(adaptRecordToServer(updatedRecord)));
    dispatch(disableEditMode());
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableRow
        key={record.id}
        hover
        bgcolor={record.isResolved ? green[50] : "white"}
      >
        <TableCell width={20} style={{ padding: 10, paddingRight: 0 }}>
          {record.comment && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={onCollapseBtnClick}
            >
              {isCollapseOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          )}
        </TableCell>
        <TableCell size="small" width={100}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FavoriteButton recordId={record.id} />
            {record.id}
          </Box>
        </TableCell>
        <TableCell>{record.resourceId}</TableCell>
        <TableCell>{moment(record.date).format("DD.MM.YYYY kk:mm")}</TableCell>
        <TableCell align="right">
          <TableControls record={record} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isCollapseOpen} timeout={300} unmountOnExit>
            <Box margin={3}>
              <Typography variant="h6" gutterBottom component="div">
                Комментарий к записи № {record.id}:
              </Typography>
              <Textarea
                value={comment}
                onChange={onTextareaChange}
                readOnly={!isEditMode}
              />
              {isEditMode && (
                <ButtonsContainer>
                  <Button
                    padding={1}
                    align={"right"}
                    variant="outlined"
                    color="secondary"
                    disabled={record.comment === comment}
                    onClick={onResetBtnClick}
                  >
                    Сброс
                  </Button>
                  <Button
                    padding={1}
                    align={"right"}
                    variant="outlined"
                    color="primary"
                    disabled={record.comment === comment}
                    onClick={onSaveBtnClick}
                  >
                    Сохранить
                  </Button>
                </ButtonsContainer>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <AlertPopover
        anchorEl={anchorEl}
        onPopoverClose={handlePopoverClose}
        recordId={record.id}
      />
    </>
  );
};

export default Row;
