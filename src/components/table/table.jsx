import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import { useRecordsSelector } from "../../hooks/cc-errors/selectors/useRecordsSelector";
import FavoriteButton from "../favorite-button/favorite-button";
import { Alert } from "@material-ui/lab";
import { green } from "@material-ui/core/colors";
import { Comparator } from "../../utils/const";
import TableControls from "./components/controls/controls";
import THead, { headCells } from "./components/head/head";

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
    <Box className={classes.container} p={1}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <THead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {records.sort(getComparator(order, orderBy)).map((record) => (
              <TableRow
                key={record.id}
                hover
                bgcolor={record.isResolved ? green[50] : "white"}
              >
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
                <TableCell>
                  {moment(record.date).format("DD.MM.YYYY kk:mm")}
                </TableCell>
                <TableCell align="right">
                  <TableControls record={record} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecordsTable;
