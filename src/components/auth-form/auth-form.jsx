import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { authenticate } from "../../store/reducers/app-user/actions";
import { toggleAuthForm } from "../../store/action";

import "./auth-form.css";
import Box from "@material-ui/core/Box";
import { Button, Paper, TextField, Typography } from "@material-ui/core";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 20px;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const AuthForm = ({ handleCloseBtnClick, handleAuthBtnClick }) => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  const passwordValidationConfig = { required: `Заполните обязательное поле` };
  const loginValidationConfig = {
    required: `Заполните обязательное поле`,
  };

  return (
    <Box p={5} maxWidth={700} width="100%" margin="0 auto">
      <Paper>
        <Box p={5}>
          <Typography variant="h4" align="center">
            Войдите в аккаунт
          </Typography>
          <Form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleAuthBtnClick.bind(this, setError))}
          >
            <TextField
              id="name"
              label="Логин"
              name="name"
              variant="outlined"
              inputProps={{ ref: register(loginValidationConfig) }}
              error={errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              id="password"
              label="Пароль"
              name="password"
              variant="outlined"
              inputProps={{ ref: register(passwordValidationConfig) }}
              error={errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary">
              Войти
            </Button>
          </Form>
        </Box>
      </Paper>
    </Box>
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
    dispatch(authenticate(data)).then(() => dispatch(toggleAuthForm()));
  },
});

export default connect(null, mapDispatchToProps)(AuthForm);
