import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLogin, getIsAuth } from "../../store/reducers/app-user/selectors";
import { toggleAuthForm } from "../../store/action";
import { logout } from "../../store/reducers/app-user/actions";

import "./header.css";
import AuthForm from "../auth-form/auth-form";
import { getIsAuthFormShown } from "../../store/reducers/app-state/selectors";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router";
import Typography from "@material-ui/core/Typography";

const Header = (props) => {
  const {
    name,
    isAuth,
    isAuthFormShown,
    handleAuthBtnClick,
    handleLogoutBtnClick,
  } = props;

  const history = useHistory();

  const [isMenuShown, setIsMenuShown] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userMenuRef = useRef();
  useOutsideClick(userMenuRef, () => setIsMenuShown(false));

  const handleMenuToggle = () => setIsMenuShown((prevState) => !prevState);

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <Button
            className="header__title"
            onClick={handleClick}
            variant="outlined"
            color="primary"
          >
            <Typography variant="h4">
              {history.location.pathname.slice(1) || "CC"}
            </Typography>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("/");
              }}
            >
              СС
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("/melsy");
              }}
            >
              Melsy
            </MenuItem>
          </Menu>
          {isAuth ? (
            <div className="header__user-wrapper" ref={userMenuRef}>
              <p className="header__user-name">{name}</p>
              <button
                className="header__rollup-btn"
                onClick={handleMenuToggle}
              />
              {isMenuShown && (
                <div className="header__user-menu">
                  <button
                    className="header__logout"
                    onClick={handleLogoutBtnClick}
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="header__auth-button"
              onClick={handleAuthBtnClick}
            >
              Войти
            </button>
          )}
        </div>
      </header>
      {isAuthFormShown && <AuthForm />}
    </>
  );
};

Header.propTypes = {
  name: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  isAuthFormShown: PropTypes.bool.isRequired,
  handleAuthBtnClick: PropTypes.func.isRequired,
  handleLogoutBtnClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: getLogin(state),
  isAuth: getIsAuth(state),
  isAuthFormShown: getIsAuthFormShown(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleAuthBtnClick() {
    dispatch(toggleAuthForm());
  },
  handleLogoutBtnClick() {
    dispatch(logout());
  },
});

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
