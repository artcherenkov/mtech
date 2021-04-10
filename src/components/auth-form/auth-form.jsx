import React from "react";
import PropTypes from "prop-types";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import {
  authenticate,
  clearErrors as clearErrorsAction,
} from "../../store/reducers/app-user/actions";
import { toggleAuthForm } from "../../store/action";

import "./auth-form.css";
import Box from "@material-ui/core/Box";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  getError,
  getIsLoading,
} from "../../store/reducers/app-user/selectors";

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
  const error = useSelector(getError, shallowEqual);
  const isLoading = useSelector(getIsLoading, shallowEqual);
  const dispatch = useDispatch();

  const passwordValidationConfig = { required: `Заполните обязательное поле` };
  const loginValidationConfig = {
    required: `Заполните обязательное поле`,
  };

  const onDialogClose = () => dispatch(clearErrorsAction());

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
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              id="password"
              label="Пароль"
              name="password"
              variant="outlined"
              inputProps={{
                ref: register(passwordValidationConfig),
                type: "password",
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary">
              Войти
            </Button>
          </Form>
        </Box>
      </Paper>
      <Backdrop open={isLoading} style={{ zIndex: 10, color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={!!error}
        onClose={onDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ошибка при авторизации
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
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
    dispatch(authenticate(data));
  },
});

export default connect(null, mapDispatchToProps)(AuthForm);
