import { useDispatch } from "react-redux";
import { useRecordByIdSelector } from "../../hooks/cc-errors/selectors/useRecordByIdSelector";
import { editRecord } from "../../store/reducers/cc-errors/actions";
import "./styles.css";
import { adaptRecordToServer } from "../../core/adapter/record";

const FavoriteButton = ({ recordId }) => {
  const dispatch = useDispatch();
  const record = useRecordByIdSelector(recordId);

  const onChange = () => {
    const updatedRecord = { ...record, isFavorite: !record.isFavorite };
    dispatch(editRecord(adaptRecordToServer(updatedRecord)));
  };

  return (
    <label className={"favoriteBtn"} htmlFor={`isFavorite-${recordId}`}>
      <input
        className={"popup__checkboxInput"}
        type="checkbox"
        id={`isFavorite-${recordId}`}
        name="isFavorite"
        checked={record.isFavorite}
        onChange={onChange}
      />
      <span className={"popup__checkboxReplacement"} />
    </label>
  );
};

export default FavoriteButton;
