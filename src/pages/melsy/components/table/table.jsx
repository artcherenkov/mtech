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
import { Filter } from "../filter-controls/filter-controls";
import { IconButton, Typography } from "@material-ui/core";
import { debounce } from "../../../../utils/debounce";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

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

  const countPerPage = 10;
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  const filterCallback = (row) =>
    filters.every((filter) => {
      return Filter[filter].func(row);
    });

  const rows = useSelector((state) => state.melsytech.records, shallowEqual);
  const filters = useSelector((state) => state.melsytech.filters, shallowEqual);

  useEffect(() => setPage(0), [filters]);

  if (!rows) {
    return <h2>Loading...</h2>;
  }

  const filteredRows = rows.filter(filterCallback);

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

  const end =
    page * countPerPage + countPerPage > filteredRows.length
      ? filteredRows.length
      : page * countPerPage + countPerPage;

  const emptyRows =
    countPerPage -
    Math.min(countPerPage, filteredRows.length - page * countPerPage);

  return (
    <Box style={{ marginBottom: 50 }}>
      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {COLUMNS.map((column, idx) => (
                  <TableCell
                    key={`column-${idx}`}
                    size={column.id === "id" ? "small" : "medium"}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * countPerPage, end).map((row) => (
                <TableRow
                  key={`row-${row.id}`}
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
                    {row.impulsesStandart === -1 ? "–" : row.impulsesDiff + "%"}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup>
                      {row.yclLink ? (
                        <Tooltip title="Перейти к записи">
                          <Button
                            color="primary"
                            target="_blank"
                            href={row.yclLink}
                            disabled={!row.yclLink}
                          >
                            <LogoYc />
                          </Button>
                        </Tooltip>
                      ) : (
                        <Button color="primary" target="_blank" disabled>
                          <LogoYc />
                        </Button>
                      )}

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
              {emptyRows > 0 && (
                <TableRow style={{ height: 72.8 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {filteredRows.length && (
            <Box
              p={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography variant="overline">
                {page * countPerPage + 1}-{end} из {filteredRows.length}
              </Typography>
              <IconButton
                disabled={page === 0}
                onClick={debounce(() => setPage((prevState) => prevState - 1))}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                disabled={end === filteredRows.length}
                onClick={debounce(() => setPage((prevState) => prevState + 1))}
              >
                <NavigateNextIcon />
              </IconButton>
            </Box>
          )}
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default MelsyTable;
