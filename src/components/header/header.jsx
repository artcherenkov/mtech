import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsername, getIsAuth } from "../../store/reducers/app-user/selectors";
import { toggleAuthForm } from "../../store/action";

const Header = ({
  username,
  isAuth,
  handleAuthBtnClick,
}) => {
  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="header__title">MTECH</h1>
        {isAuth
          ? <div className="header__user-wrapper">
            <p className="header__user-name">{username}</p>
            <button className="header__rollup-btn"/>
          </div>
          : <button className="header__auth-button" onClick={handleAuthBtnClick}>
            Войти
          </button>
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  handleAuthBtnClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: getUsername(state),
  isAuth: getIsAuth(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleAuthBtnClick() {
    dispatch(toggleAuthForm());
  },
});

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
