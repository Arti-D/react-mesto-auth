import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip.js";

function Register(props) {
  return (
    <>
      <div className="form">
        <h2 className="form__title">Регистрация</h2>
        <form className="form__content">

            <input type="email" className="form__input" placeholder="Email" />
            <input type="password" className="form__input" placeholder="Пароль" />

          <button className="form__submit-btn">Зарегестрироваться</button>

          <span className="form__question">
            Уже зарегестрированы? 
            <Link className="form__link" to="/sign-in">
              Войти
            </Link>
          </span>
        </form>
      </div>
      <InfoTooltip />
    </>
  );
}

export default Register;
