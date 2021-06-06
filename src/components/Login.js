import React from "react";

function Login(props) {
  return (
    <div className="form">
      <h2 className="form__title">Вход</h2>
      <form className="form__content">
        <input type="email" className="form__input" placeholder="Email" />
        <input type="password" className="form__input" placeholder="Пароль" />
        <button className="form__submit-btn">Войти</button>
      </form>
    </div>
  );
}

export default Login;
