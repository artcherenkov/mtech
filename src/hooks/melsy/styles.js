import { red, green } from "@material-ui/core/colors";

const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles({
  row__isResolved: {
    backgroundColor: green[50],
  },
  row__isProblem: {
    backgroundColor: red[50],
  },
  popup: {
    zIndex: 10,
  },
  popup__content: {
    width: "90%",
    boxSizing: "border-box",
    maxWidth: 500,
    maxHeight: 500,
    padding: 20,
    overflow: "auto",
  },
  popup__header: {
    margin: 0,
    textAlign: "center",
  },
  popup__recordData: {},
  record: {},
  record__field: {},
  record__fieldHeader: {
    fontSize: 14,
  },
  record__fieldList: {
    margin: 0,
    paddingLeft: 20,
  },
  record__textarea: {
    width: "100%",
    resize: "none",
    padding: 7,
  },
  deletePopup__controls: {
    margin: 40,
    marginBottom: 0,
    "& > *:not(:last-child)": {
      marginRight: 20,
    },
  },
});

export default useStyles;
