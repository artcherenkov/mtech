import { shallowEqual, useSelector } from "react-redux";

const useRecordsByIdSelector = (id) => {
  return useSelector((state) => state.melsytech.records, shallowEqual)?.filter(
    (r) => r.id === id
  )[0];
};

export default useRecordsByIdSelector;
