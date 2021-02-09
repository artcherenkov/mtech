import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticate, toggleAuthForm } from "../../store/action";

import './auth-form.css';

const AuthForm = ({ handleCloseBtnClick, handleAuthBtnClick }) => {
  const mockCredentials = {
    token: `sometoken`,
    username: `Василий`,
  };
  return (
    <div className="popup">
      <div className="popup__content auth-form">
        <button className="popup__control-btn" onClick={handleCloseBtnClick} />
        <h2 className="auth-form__title">Вход в учетную запись</h2>
        <form className="auth-form__form" onSubmit={handleAuthBtnClick(mockCredentials)}>
          <div className="auth-form__input-wrapper">
            <label htmlFor="login">Логин</label>
            <input type="email" id="login"/>
          </div>
          <div className="auth-form__input-wrapper">
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password"/>
          </div>
          <div className="auth-form__controls">
            <button
              className="auth-form__button auth-form__button_type_submit"
              type="submit"
            >
              Войти
            </button>
            <button
              className="auth-form__button auth-form__button_type_reset"
              type="reset"
            >
              Сбросить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  handleCloseBtnClick: PropTypes.func.isRequired,
  handleAuthBtnClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleCloseBtnClick() {
    dispatch(toggleAuthForm());
  },
  handleAuthBtnClick(credentials) {
    return (evt) => {
      evt.preventDefault();
      dispatch(authenticate(credentials));
      dispatch(toggleAuthForm());
    };
  },
});

export default connect(null, mapDispatchToProps)(AuthForm);
