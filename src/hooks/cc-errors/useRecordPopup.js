import React, { useEffect, useState, useRef } from "react";
import NewPopup from "../../components/new-popup/new-popup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getActiveRecordId,
  getIsEditMode,
} from "../../store/reducers/cc-errors/selectors";
import {
  loadRecord,
  setActiveRecordId,
  setRecordToDelete,
} from "../../store/reducers/cc-errors/actions";
import { useRecordByIdSelector } from "./selectors/useRecordByIdSelector";

const areObjectsEqual = (obj1, obj2) => {
  return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
};

export const useRecordPopup = () => {
  const dispatch = useDispatch();
  const activeRecordId = useSelector(getActiveRecordId, shallowEqual);
  const isEditMode = useSelector(getIsEditMode, shallowEqual);
  const record = useRecordByIdSelector(activeRecordId);

  const formInitialState = {
    comment: "",
  };

  let formInitialData = useRef({});

  const [formState, setFormState] = useState(formInitialState);
  const [shouldDisableButtons, setShouldDisableButtons] = useState(true);

  useEffect(() => {
    setShouldDisableButtons(
      areObjectsEqual(formState, formInitialData.current)
    );
  }, [formState]);

  useEffect(() => {
    if (record) {
      formInitialData.current = {
        comment: record.comment,
      };
      setFormState(formInitialData.current);
    }
    return () => {
      setFormState(formInitialState);
    };
  }, [record]);

  const onChange = (evt) => {
    setFormState({ ...formState, [evt.target.name]: evt.target.value });
  };
  const onCheckboxChange = () => {
    dispatch(loadRecord({ ...record, isFavorite: !record.isFavorite }));
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loadRecord({ ...record, ...formState }));
  };
  const onResetForm = () => {
    setFormState(formInitialData.current);
  };
  const onDelete = () => {
    dispatch(setRecordToDelete(record.id));
  };

  const onClosePopup = () => {
    dispatch(setActiveRecordId(-1));
  };

  if (!record) {
    return <p>No data</p>;
  }

  return (
    <NewPopup onOutsideClick={onClosePopup}>
      <div className="popup__controls">
        <div className="popup__favorite-button">
          <label className="popup__checkbox-label" htmlFor="isFavorite">
            <input
              className="popup__checkbox-input"
              type="checkbox"
              id="isFavorite"
              name="isFavorite"
              checked={record.isFavorite}
              onChange={onCheckboxChange}
            />
            <span className="popup__checkbox-replacement" />
          </label>
        </div>
        <button className="popup__button_close" onClick={onClosePopup} />
      </div>
      <h2 className="popup__header">
        {isEditMode ? "Редактирование" : "Просмотр"} записи №{record.id}
      </h2>
      <a
        className="popup__resource-link"
        href={record.resourceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Перейти к записи в YClients
      </a>
      <form onSubmit={onSubmit}>
        <textarea
          className="popup__textarea"
          name="comment"
          rows={5}
          value={formState.comment}
          onChange={onChange}
          readOnly={!isEditMode}
        >
          {record.comment}
        </textarea>
        {isEditMode && (
          <div className="popup__form-controls">
            <button
              className="popup__button popup__button_action_save"
              type="submit"
              disabled={shouldDisableButtons}
            >
              Сохранить
            </button>
            <button
              className="popup__button"
              disabled={shouldDisableButtons}
              type="button"
              onClick={onResetForm}
            >
              Сброс
            </button>
            <button
              className="popup__button popup__button_danger"
              type="button"
              onClick={onDelete}
            >
              Удалить
            </button>
          </div>
        )}
      </form>
    </NewPopup>
  );
};
