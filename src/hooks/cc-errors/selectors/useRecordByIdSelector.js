import { useSelector, shallowEqual } from "react-redux";
import { getRecordById } from "../../../store/reducers/cc-errors/selectors";

export const useRecordByIdSelector = (id) =>
  useSelector((state) => getRecordById(id, state), shallowEqual);
