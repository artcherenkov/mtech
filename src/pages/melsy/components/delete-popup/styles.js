import { red, green } from "@material-ui/core/colors";

const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles({
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
  deletePopup__controls: {
    margin: 40,
    marginBottom: 0,
    "& > *:not(:last-child)": {
      marginRight: 20,
    },
  },
});

export default useStyles;
