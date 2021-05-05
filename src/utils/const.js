import moment from "moment";

export const APIRoute = {
  RECORDS: "/api/v1/cc_errors",
  LOGIN: "/api/auth/signin",
  ACTIVATE: "/api/v1/cc_errors/activate_card",
  MELSY_RECORDS: "/api/melsy",
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
