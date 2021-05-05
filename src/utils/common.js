import moment from "moment";

export const getRandomDate = (start = moment(`2018-01-01`), end = moment()) =>
  moment(start + Math.random() * end.diff(start));

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItem = (arr) => arr[getRandomInt(0, arr.length - 1)];

export const getRandomObjectItem = (obj) =>
  getRandomArrayItem(Object.values(obj));

export const reverseObj = (obj) =>
  Object.entries(obj).reduce((acc, entry) => {
    const [key, value] = entry;
    acc = { ...acc, [value]: key };
    return acc;
  }, {});

export const getKeyByValue = (obj, value) =>
  reverseObj(obj)[value].toLowerCase();

export const formatDates = (pattern, ...dates) =>
  dates.map((date) => date.format(pattern));

export const getFormData = (form) => {
  const formData = new FormData(form);
  let res = {};
  for (const [key, value] of formData) {
    res = { ...res, [key]: value };
  }
  return res;
};

export const range = (number) => {
  const res = [];
  for (let i = 0; i < number; i++) {
    res.push(i);
  }

  return res;
};

export const convertSnakeToCamel = (str) => {
  return str.replace(/_(.)/g, (g) => g[1].toUpperCase());
};
export const convertCamelToSnake = (str) => {
  return str
    .replace(/([A-Z])/g, ` $1`)
    .split(` `)
    .join(`_`)
    .toLowerCase();
};

export const renameKeysSnakeToCamel = (obj) => {
  const processVal = (val) => {
    if (typeof val !== `object` || !val) {
      return val;
    }

    if (Array.isArray(val)) {
      if (val.every((item) => typeof item === `string`)) {
        return val;
      }
      return val.map(renameKeysSnakeToCamel);
    }

    return renameKeysSnakeToCamel(val);
  };

  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => {
      return [convertSnakeToCamel(key), processVal(val)];
    })
  );
};
export const renameKeysCamelToSnake = (obj) => {
  const processVal = (val) => {
    if (typeof val !== `object`) {
      return val;
    }

    if (Array.isArray(val)) {
      if (val.every((item) => typeof item === `string`)) {
        return val;
      }
      return val.map(renameKeysCamelToSnake);
    }

    return renameKeysCamelToSnake(val);
  };

  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => {
      return [convertCamelToSnake(key), processVal(val)];
    })
  );
};
