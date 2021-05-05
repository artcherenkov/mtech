import React, { useEffect } from "react";
import classnames from "classnames";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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

import LogoYc from "../../../../components/logo-yc";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CheckIcon from "@material-ui/icons/Check";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";

import useStyles from "./styles";
import {
  editRecord,
  fetchRecords,
  setActiveRecordId,
  setRecordToDeleteId,
} from "../../../../store/reducers/melsytech/actions";

const COLUMNS = [
  {
    id: "date",
    shouldSort: false,
    label: "Дата",
  },
  {
    id: "company",
    shouldSort: false,
    label: "Название филиала",
  },
  {
    id: "staffName",
    shouldSort: false,
    label: "Имя сотрудника",
  },
  {
    id: "impulses",
    shouldSort: false,
    label: "Вспышек сделано",
  },
  {
    id: "impulsesNorm",
    shouldSort: false,
    label: "Норма вспышек",
  },
  {
    id: "diff",
    shouldSort: false,
    label: "Процент расхождения",
  },
  {
    id: "controls",
    shouldSort: false,
    label: "",
  },
];

const MelsyTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  const rows = useSelector((state) => state.melsytech.records, shallowEqual);

  if (!rows) {
    return <h2>Loading...</h2>;
  }

  const onResolveClick = (row) => {
    const isResolved = !row.isResolved;
    const isProblem = row.isProblem ? !row.isProblem : row.isProblem;

    dispatch(
      editRecord(row.id, {
        ...row,
        isResolved,
        isProblem,
      })
    );
  };
  const onProblemClick = (row) => {
    const isProblem = !row.isProblem;
    const isResolved = row.isResolved ? !row.isResolved : row.isResolved;

    dispatch(
      editRecord(row.id, {
        ...row,
        isResolved,
        isProblem,
      })
    );
  };
  const onDeleteClick = (row) => {
    dispatch(setRecordToDeleteId(row.id));
  };

  return (
    <Box>
      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {COLUMNS.map((column) => (
                  <TableCell size={column.id === "id" ? "small" : "medium"}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  className={classnames({
                    [classes.row__isResolved]: row.isResolved,
                    [classes.row__isProblem]: row.isProblem,
                  })}
                >
                  <TableCell>
                    {moment(row.date).format("DD.MM.YYYY")}{" "}
                    {row.sessionTime.slice(0, 5)}
                  </TableCell>
                  <TableCell>
                    <Box style={{ width: 250 }}>{row.companyTitle}</Box>
                  </TableCell>
                  <TableCell>
                    <Box style={{ width: 150 }}>{row.staffName}</Box>
                  </TableCell>
                  <TableCell>{row.impulsesCount}</TableCell>
                  <TableCell>
                    {" "}
                    {row.impulsesStandart === -1 ? "–" : row.impulsesStandart}
                  </TableCell>
                  <TableCell>
                    {row.impulsesStandart === -1
                      ? "–"
                      : row.impulsesPercentDiff + "%"}
                  </TableCell>
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
                          onClick={onResolveClick.bind(null, row)}
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
                          onClick={onProblemClick.bind(null, row)}
                        >
                          <NotInterestedIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Удалить задачу">
                        <Button
                          color="secondary"
                          onClick={onDeleteClick.bind(null, row)}
                        >
                          <DeleteIcon />
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

export default MelsyTable;
