import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(password, email);
  }

  return (
      <div className="form">
        <h2 className="form__title">Регистрация</h2>
        <form className="form__content" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form__input"
            placeholder="Email"
            onChange={handleChangeEmail}
          />
          <input
            type="password"
            className="form__input"
            placeholder="Пароль"
            onChange={handleChangePassword}
          />

          <button className="form__submit-btn">Зарегистрироваться</button>

          <span className="form__question">
            Уже зарегестрированы?
            <Link className="form__link" to="/sign-in">
              Войти
            </Link>
          </span>
        </form>
      </div>
  );
}

export default Register;
