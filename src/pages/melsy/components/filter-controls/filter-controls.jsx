import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  addFilter,
  removeFilter,
} from "../../../../store/reducers/melsytech/actions";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const Filter = {
  IS_BIG_PERCENT: {
    id: "IS_BIG_PERCENT",
    func: (record) => record.impulsesDiff >= 15,
  },
  ALL: { id: "ALL", func: (record) => record },
  RESOLVED: { id: "RESOLVED", func: (record) => record.isResolved },
  PROBLEM: { id: "PROBLEM", func: (record) => record.isProblem },
  NOT_RESOLVED: { id: "NOT_RESOLVED", func: (record) => !record.isResolved },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  label: {
    display: "block",
  },
}));

const FilterControls = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.melsytech.filters, shallowEqual);

  const [show, setShow] = useState(Filter.NOT_RESOLVED.id);

  const onSelectChange = (evt) => {
    setShow((prevState) => {
      dispatch(removeFilter(prevState));
      dispatch(addFilter(evt.target.value));
      return evt.target.value;
    });
  };

  const onFilterChange = (evt) => {
    if (evt.target.checked) {
      dispatch(addFilter(evt.target.name));
    } else {
      dispatch(removeFilter(evt.target.name));
    }
  };

  return (
    <Box>
      <Paper>
        <Box p={2} className={classes.root}>
          <FormControl className={classes.formControl}>
            <InputLabel id="show-label">Показать</InputLabel>
            <Select
              labelId="show-label"
              id="show"
              value={show}
              onChange={onSelectChange}
            >
              <MenuItem value={Filter.ALL.id}>Все</MenuItem>
              <MenuItem value={Filter.RESOLVED.id}>Решенные</MenuItem>
              <MenuItem value={Filter.NOT_RESOLVED.id}>Нерешенные</MenuItem>
              <MenuItem value={Filter.PROBLEM.id}>Проблемные</MenuItem>
            </Select>
          </FormControl>
          {/*<FormControlLabel*/}
          {/*  control={*/}
          {/*    <Checkbox*/}
          {/*      name={Filter.IS_BIG_PERCENT.id}*/}
          {/*      color="primary"*/}
          {/*      checked={filters?.includes(Filter.IS_BIG_PERCENT.id)}*/}
          {/*      onChange={onFilterChange}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  label="Расхождение от 15 процентов"*/}
          {/*/>*/}
        </Box>
      </Paper>
    </Box>
  );
};

export default FilterControls;
