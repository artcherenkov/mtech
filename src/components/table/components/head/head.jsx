import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";

export const headCells = [
  { id: "collapse" },
  {
    id: "id",
    shouldSort: true,
    comparatorType: "numeric",
    label: "ID",
  },
  {
    id: "recordId",
    shouldSort: false,
    label: "ID записи",
  },
  {
    id: "date",
    shouldSort: true,
    comparatorType: "date",
    label: "Дата",
  },
  {
    id: "controls",
    shouldSort: false,
    label: "",
  },
];

const THead = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            size={headCell.id === "id" ? "small" : "medium"}
            align={headCell.id === "id" ? "right" : "left"}
          >
            {headCell.shouldSort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <span>{headCell.label}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default THead;
