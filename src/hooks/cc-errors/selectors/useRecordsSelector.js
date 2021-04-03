import { useSelector, shallowEqual } from "react-redux";
import { getRecords } from "../../../store/reducers/cc-errors/selectors";

export const useRecordsSelector = () => useSelector(getRecords, shallowEqual);
