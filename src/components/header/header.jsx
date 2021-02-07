import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="header__title">MTECH</h1>
        <button className="header__auth-button">Войти</button>
      </div>
    </header>
  );
};

export default Header;
