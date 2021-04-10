import { useSelector, shallowEqual } from "react-redux";
import {
  getFilters,
  getRecords,
} from "../../../store/reducers/cc-errors/selectors";

export const useFilteredRecordsSelector = () => {
  const filters = useSelector(getFilters, shallowEqual);

  return useSelector(
    (state) =>
      getRecords(state)?.filter((record) =>
        filters.every((filter) => record[filter])
      ),
    shallowEqual
  );
};
