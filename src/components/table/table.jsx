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
import { useRecordsSelector } from "../../hooks/cc-errors/selectors/useRecordsSelector";

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
  const records = useRecordsSelector();

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

  return (
    <>
      <Box className={classes.container} p={1}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {records.sort(getComparator(order, orderBy)).map((record) => (
                <Row key={record.id} record={record} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default RecordsTable;
