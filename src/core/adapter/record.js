import {
  renameKeysCamelToSnake,
  renameKeysSnakeToCamel,
} from "../../utils/common";

export const adaptRecordToClient = (record) => {
  return renameKeysSnakeToCamel(record);
};

export const adaptRecordToServer = (record) => {
  return renameKeysCamelToSnake(record);
};
