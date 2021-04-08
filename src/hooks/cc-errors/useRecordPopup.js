import React, { useEffect, useState, useRef } from "react";
import NewPopup from "../../components/new-popup/new-popup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getActiveRecordId,
  getIsEditMode,
} from "../../store/reducers/cc-errors/selectors";
import {
  disableEditMode,
  loadRecord,
  setActiveRecordId,
  setEditMode,
  setRecordToDelete,
} from "../../store/reducers/cc-errors/actions";
import { useRecordByIdSelector } from "./selectors/useRecordByIdSelector";
import IconCheck from "../../components/icon-check/icon-check";

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
  const onIsFavoriteChange = () => {
    dispatch(loadRecord({ ...record, isFavorite: !record.isFavorite }));
  };
  const onIsActivatedChange = () => {
    dispatch(loadRecord({ ...record, isActivated: !record.isActivated }));
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loadRecord({ ...record, ...formState }));
    dispatch(disableEditMode());
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
  const onSetEditMode = () => {
    dispatch(setEditMode());
  };

  if (!record) {
    return <p>No data</p>;
  }

  return (
    <NewPopup onOutsideClick={onClosePopup}>
      <div className="popup__controls">
        <button className="popup__button" onClick={onIsActivatedChange}>
          {record.isActivated ? (
            <>
              <IconCheck size={20} /> Клубная карта активирована
            </>
          ) : (
            "Активировать клубную карту"
          )}
        </button>
        <button
          className="popup__button popup__button_action_edit"
          onClick={onSetEditMode}
          disabled={isEditMode}
        />
        <button
          className="popup__button popup__button_action_delete"
          onClick={onDelete}
        />
        <label
          className="popup__button popup__button_action_favorite"
          htmlFor="isFavorite"
        >
          <input
            className="popup__checkbox-input"
            type="checkbox"
            id="isFavorite"
            name="isFavorite"
            checked={record.isFavorite}
            onChange={onIsFavoriteChange}
          />
          <span className="popup__checkbox-replacement" />
        </label>
        <button
          className="popup__button popup__button_action_close"
          onClick={onClosePopup}
        />
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
          <div className="popup__controls popup__controls_pos_bottom">
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
          </div>
        )}
      </form>
    </NewPopup>
  );
};
