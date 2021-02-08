import React from 'react';

import './assets/css/lock.css';

const Lock = () => (
  <div className="lock">
    <div className="lock__content">
      <img className="lock__image" src="img/icon-lock.svg" alt="Замок. Вы не авторизованы"/>
      <div className="lock__message">
        <h2 className="lock__text">Эта страница доступна только авторизованным пользователям</h2>
        <p className="lock__text">Пожалуйста, войдите в вашу учетную запись.</p>
      </div>
    </div>
  </div>
);

export default Lock;
