import { red, green } from "@material-ui/core/colors";

const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles({
  row__isResolved: {
    backgroundColor: green[50],
  },
  row__isProblem: {
    backgroundColor: red[50],
  },
});

export default useStyles;
