import moment from "moment";

export const APIRoute = {
  RECORDS: "/api/v1/cc_errors",
  LOGIN: "/api/v1/users/login",
};

export const Comparator = {
  date: (a, b) => {
    if (moment(b).isBefore(moment(a))) {
      return -1;
    }
    if (moment(a).isBefore(moment(b))) {
      return 1;
    }
    return 0;
  },
  numeric: (a, b) => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  },
};
