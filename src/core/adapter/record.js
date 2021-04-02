import { renameKeysSnakeToCamel } from "../../utils/common";

export const adaptRecordToClient = (record) => {
  return renameKeysSnakeToCamel(record);
};
