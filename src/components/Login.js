import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(password, email);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="form">
      <h2 className="form__title">Вход</h2>
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
        <button type="submit" className="form__submit-btn">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
