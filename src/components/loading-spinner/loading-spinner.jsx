import classes from "./styles.module.css";

const LoadingSpinner = ({ size = 30, strokeWidth = 5 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <div
        className={classes.loadingSpinner}
        style={{ borderWidth: strokeWidth }}
      />
    </div>
  );
};

export default LoadingSpinner;
