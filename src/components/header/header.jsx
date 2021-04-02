import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLogin, getIsAuth } from "../../store/reducers/app-user/selectors";
import { toggleAuthForm } from "../../store/action";
import { logout } from "../../store/reducers/app-user/actions";

import "./header.css";
import AuthForm from "../auth-form/auth-form";
import { getIsAuthFormShown } from "../../store/reducers/app-state/selectors";

const Header = ({
  name,
  isAuth,
  isAuthFormShown,
  handleAuthBtnClick,
  handleLogoutBtnClick,
}) => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const handleMenuToggle = () => setIsMenuShown((prevState) => !prevState);
  useEffect(() => {
    setIsMenuShown(false);
  }, [isAuth]);
  return (
    <>
      <header className="header">
        <div className="header__inner">
          <h1 className="header__title">MTECH</h1>
          {isAuth ? (
            <div className="header__user-wrapper">
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
