import { useDispatch } from "react-redux";
import { useRecordByIdSelector } from "../../hooks/cc-errors/selectors/useRecordByIdSelector";
import { loadRecord } from "../../store/reducers/cc-errors/actions";
import classes from "./styles.module.css";

const FavoriteButton = ({ recordId }) => {
  const dispatch = useDispatch();
  const record = useRecordByIdSelector(recordId);

  const onChange = () => {
    dispatch(loadRecord({ ...record, isFavorite: !record.isFavorite }));
  };

  return (
    <label className={classes.favoriteBtn} htmlFor={`isFavorite-${recordId}`}>
      <input
        className="popup__checkbox-input"
        type="checkbox"
        id={`isFavorite-${recordId}`}
        name="isFavorite"
        checked={record.isFavorite}
        onChange={onChange}
      />
      <span className="popup__checkbox-replacement" />
    </label>
  );
};

export default FavoriteButton;
