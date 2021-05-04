import React, { useEffect } from "react";
import moment from "moment";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import LogoYc from "../../components/logo-yc";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CheckIcon from "@material-ui/icons/Check";
import VisibilityIcon from "@material-ui/icons/Visibility";

import useStyles from "./styles";
import classnames from "classnames";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  fetchRecords,
  setActiveRecordId,
} from "../../store/reducers/melsytech/actions";

const useTable = (columns) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  const rows = useSelector((state) => state.melsytech.records, shallowEqual);

  if (!rows) {
    return <h2>Loading...</h2>;
  }

  return (
    <Box>
      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell size={column.id === "id" ? "small" : "medium"}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  className={classnames(
                    {
                      [classes.row__isResolved]: row.isResolved,
                    },
                    {
                      [classes.row__isProblem]: row.isProblem,
                    }
                  )}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{moment(row.date).format("DD.MM.YYYY")}</TableCell>
                  <TableCell>{row.staffName}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup>
                      <Tooltip title="Перейти к записи">
                        <Button
                          color="primary"
                          target="_blank"
                          href="https://google.com"
                        >
                          <LogoYc />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Отметить задачу как решенную">
                        <Button
                          color="primary"
                          variant={row.isResolved ? "contained" : "outlined"}
                        >
                          <CheckIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Показать подробную информацию">
                        <Button
                          color="primary"
                          onClick={() => dispatch(setActiveRecordId(row.id))}
                        >
                          <VisibilityIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Сообщить о проблеме">
                        <Button
                          color="secondary"
                          variant={row.isProblem ? "contained" : "outlined"}
                        >
                          <NotInterestedIcon />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default useTable;
