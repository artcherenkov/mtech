import { Button, ButtonGroup } from "@material-ui/core";
import LogoYc from "../../../logo-yc";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {
  setActiveRecordId,
  setEditMode,
  setRecordToDelete,
} from "../../../../store/reducers/cc-errors/actions";
import { useDispatch } from "react-redux";

const TableControls = (props) => {
  const { record } = props;
  const dispatch = useDispatch();

  const handleShowClick = (id) => () => {
    dispatch(setActiveRecordId(id));
  };
  const handleEditClick = (id) => () => {
    dispatch(setActiveRecordId(id));
    dispatch(setEditMode());
  };
  const handleDeleteClick = (id) => () => {
    dispatch(setRecordToDelete(id));
  };

  return (
    <ButtonGroup
      size="small"
      color="primary"
      aria-label="outlined primary button group"
    >
      <Button href={record.resourceUrl} target="_blank">
        <LogoYc />
      </Button>
      <Button onClick={handleShowClick(record.id)}>
        <VisibilityIcon />
      </Button>
      <Button onClick={handleEditClick(record.id)}>
        <EditIcon />
      </Button>
      <Button color="secondary" onClick={handleDeleteClick(record.id)}>
        <DeleteIcon />
      </Button>
    </ButtonGroup>
  );
};

export default TableControls;
