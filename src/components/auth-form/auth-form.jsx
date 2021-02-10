import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";

import { authenticate, toggleAuthForm } from "../../store/action";

import './auth-form.css';

const AuthForm = ({ handleCloseBtnClick, handleAuthBtnClick }) => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  const getInputStyles = (isValid) => {
    const styles = [`auth-form__input`];
    if (isValid) {
      styles.push(`auth-form__input_invalid`);
    }

    return styles.join(` `);
  };

  const passwordValidationConfig = { required: `Заполните обязательное поле` };
  const loginValidationConfig = {
    required: `Заполните обязательное поле`,
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: `Введите валидный email`,
    },
  };

  // const mockCredentials = {
  //   token: `sometoken`,
  //   username: `Василий`,
  // };
  return (
    <div className="popup">
      <div className="popup__content auth-form">
        <button className="popup__control-btn" onClick={handleCloseBtnClick}/>
        <h2 className="auth-form__title">Вход в учетную запись</h2>
        <form className="auth-form__form" onSubmit={handleSubmit(handleAuthBtnClick.bind(this, setError))}>
          <div className="auth-form__input-wrapper">
            <label htmlFor="login">Логин</label>
            <input
              className={getInputStyles(errors.login)}
              type="text"
              id="login"
              name="login"
              ref={register(loginValidationConfig)}
            />
            {errors.login && <p className="auth-form__error">{errors.login.message}</p>}
          </div>
          <div className="auth-form__input-wrapper">
            <label htmlFor="password">Пароль</label>
            <input
              className={getInputStyles(errors.password)}
              type="password"
              id="password"
              name="password"
              ref={register(passwordValidationConfig)}
            />
            {errors.password && <p className="auth-form__error">{errors.password.message}</p>}
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
              onClick={() => clearErrors()}
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
  handleAuthBtnClick(credentials, data, setError) {
    dispatch(authenticate(data));
    dispatch(toggleAuthForm());
  },
});

export default connect(null, mapDispatchToProps)(AuthForm);
