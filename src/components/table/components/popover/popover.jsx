import { Popover, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const AlertPopover = (props) => {
  const { anchorEl, onPopoverClose, recordId } = props;

  const classes = useStyles();
  return (
    <Popover
      id={recordId}
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onPopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Typography className={classes.typography}>
        Сохраните или сбросьте изменения.
      </Typography>
    </Popover>
  );
};

export default AlertPopover;
