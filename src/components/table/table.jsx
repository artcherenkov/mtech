import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import { Comparator } from "../../utils/const";
import TableHead, { headCells } from "./components/head/head";
import Row from "./components/row/row";
import { IconButton, TableCell, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import TableRow from "@material-ui/core/TableRow";
import { debounce } from "../../utils/debounce";
import { useFilteredRecordsSelector } from "../../hooks/cc-errors/selectors/useFilteredRecordsSelector";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  table: {
    width: "100%",
  },
});

const getComparator = (order, orderBy) => {
  const comparatorType = getComparatorType(orderBy);
  const comparator = Comparator[comparatorType];
  return order === "desc"
    ? (a, b) => comparator(a[orderBy], b[orderBy])
    : (a, b) => -comparator(a[orderBy], b[orderBy]);
};
const getComparatorType = (orderBy) => {
  const headCell = headCells.find((h) => h.id === orderBy);
  return headCell?.comparatorType;
};

const RecordsTable = () => {
  const classes = useStyles();
  const records = useFilteredRecordsSelector();
  const countPerPage = 10;

  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("date");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  if (!records) {
    return <Alert severity="warning">There is no data!</Alert>;
  }

  const end =
    page * countPerPage + countPerPage > records.length
      ? records.length
      : page * countPerPage + countPerPage;

  const emptyRows =
    countPerPage - Math.min(countPerPage, records.length - page * countPerPage);

  return (
    <>
      <Box className={classes.container} p={1}>
        <Paper>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="simple table"
              size="medium"
            >
              <TableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {records
                  .sort(getComparator(order, orderBy))
                  .slice(page * countPerPage, end)
                  .map((record) => (
                    <Row key={record.id} record={record} />
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 66 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Box
              p={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography variant="overline">
                {page * countPerPage + 1}-{end} из {records.length}
              </Typography>
              <IconButton
                disabled={page === 0}
                onClick={debounce(() => setPage((prevState) => prevState - 1))}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                disabled={end === records.length}
                onClick={debounce(() => setPage((prevState) => prevState + 1))}
              >
                <NavigateNextIcon />
              </IconButton>
            </Box>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};

export default RecordsTable;
