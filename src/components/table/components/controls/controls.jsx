import { Button, ButtonGroup } from "@material-ui/core";
import LogoYc from "../../../logo-yc";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EditIcon from "@material-ui/icons/Edit";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {
  activateCard,
  disableEditMode,
  editRecord,
  setActiveRecordId,
  setEditMode,
  setRecordToDelete,
} from "../../../../store/reducers/cc-errors/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getActiveRecordId } from "../../../../store/reducers/cc-errors/selectors";
import { adaptRecordToServer } from "../../../../core/adapter/record";

const TableControls = (props) => {
  const { record } = props;
  const dispatch = useDispatch();
  const activeRecordId = useSelector(getActiveRecordId, shallowEqual);

  const handleActivateClick = (id) => () => {
    const updatedRecord = { ...record, isActivated: !record.isActivated };
    dispatch(activateCard(updatedRecord));
  };
  const handleEditClick = (id) => () => {
    if (activeRecordId === -1) {
      dispatch(setActiveRecordId(id));
      dispatch(setEditMode());
    } else {
      dispatch(setActiveRecordId(-1));
      setTimeout(() => dispatch(disableEditMode()), 300);
    }
  };
  const handleNotNeedActivateClick = () => {
    dispatch(
      editRecord(
        adaptRecordToServer({
          ...record,
          notNeedActivated: !record.notNeedActivated,
        })
      )
    );
  };
  const handleDeleteClick = (id) => () => {
    dispatch(setRecordToDelete(id));
  };

  return (
    <>
      <ButtonGroup
        size="small"
        color="primary"
        aria-label="outlined primary button group"
      >
        <Button href={record.resourceUrl} target="_blank">
          <LogoYc />
        </Button>
        <Button
          onClick={handleActivateClick(record.id)}
          variant={record.isActivated ? "contained" : "outlined"}
          disabled={!record.abonementId && !record.abonementNumber}
        >
          <CreditCardIcon />
        </Button>
        <Button
          onClick={handleEditClick(record.id)}
          variant={
            activeRecordId !== record.id && !record.comment
              ? "outlined"
              : "contained"
          }
        >
          <EditIcon />
        </Button>
        <Button
          color="secondary"
          onClick={handleNotNeedActivateClick}
          variant={record.notNeedActivated ? "contained" : "outlined"}
        >
          <NotInterestedIcon />
        </Button>
        <Button color="secondary" onClick={handleDeleteClick(record.id)}>
          <DeleteIcon />
        </Button>
      </ButtonGroup>
    </>
  );
};

export default TableControls;
