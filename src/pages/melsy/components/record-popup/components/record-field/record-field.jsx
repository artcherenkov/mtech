import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const RecordField = (props) => {
  const { title, children } = props;
  return (
    <Box p={1}>
      <Typography variant="subtitle2">{title}</Typography>
      <Box p={1}>{children}</Box>
    </Box>
  );
};

export default RecordField;
