import React from 'react';

const Lock = () => (
  <div className="lock">
    <div className="lock__content">
      <img className="lock__image" src="img/icon-lock.svg" alt="Замок. Вы не авторизованы"/>
      <h2 className="lock__text">Эта страница доступна только зарегистрированным пользователям. Пожалуйста, войдите в вашу учетную запись.</h2>
    </div>
  </div>
);

export default Lock;
