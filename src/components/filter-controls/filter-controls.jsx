import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { getFilters } from "../../store/reducers/cc-errors/selectors";
import {
  addFilter,
  removeFilter,
} from "../../store/reducers/cc-errors/actions";

const FilterControls = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getFilters, shallowEqual);

  const onFilterChange = (evt) => {
    if (evt.target.checked) {
      dispatch(addFilter(evt.target.name));
    } else {
      dispatch(removeFilter(evt.target.name));
    }
  };

  return (
    <Box p={1}>
      <Paper>
        <Box p={2}>
          <FormControlLabel
            control={
              <Checkbox
                name="isFavorite"
                color="primary"
                checked={filters?.includes("isFavorite")}
                onChange={onFilterChange}
              />
            }
            label="Избранные"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isActivated"
                color="primary"
                checked={filters?.includes("isActivated")}
                onChange={onFilterChange}
              />
            }
            label="Активированные карты"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="notNeedActivated"
                color="primary"
                checked={filters?.includes("notNeedActivated")}
                onChange={onFilterChange}
              />
            }
            label="Активация не требуется"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default FilterControls;
